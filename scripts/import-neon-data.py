#!/usr/bin/env python3
"""
Script para gerar comandos SQL INSERT a partir dos CSVs para importar no Neon
Execute: python import-neon-data.py
"""

import csv
import os
import re

def escape_sql_value(value, col_name):
    """Escapa valores para SQL"""
    if value is None or value == '' or value == '\\N' or value.strip() == '':
        return 'NULL'
    
    value = str(value).strip()
    
    # Remove aspas do início e fim se existirem
    if value.startswith('"') and value.endswith('"'):
        value = value[1:-1]
    
    # Trata \N (NULL do PostgreSQL) mesmo quando vem entre aspas
    if value == '\\N' or value == 'N':
        return 'NULL'
    
    # Tenta converter para número (INTEGER ou FLOAT)
    try:
        # Se parece com número, retorna sem aspas
        if '.' in value:
            float(value)
            return value
        else:
            int(value)
            return value
    except ValueError:
        pass
    
    # Tenta detectar data (formato YYYY-MM-DD)
    if re.match(r'^\d{4}-\d{2}-\d{2}', value):
        return f"'{value}'"
    
    # Tenta detectar hora (formato HH:MM:SS)
    if re.match(r'^\d{2}:\d{2}:\d{2}', value):
        return f"'{value}'"
    
    # String: escapa aspas simples e coloca aspas
    value = value.replace("'", "''")
    return f"'{value}'"

def parse_copy_statement(copy_file):
    """Extrai informações do arquivo copy-table.sql"""
    mappings = {}
    
    with open(copy_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Regex para encontrar COPY statements (suporta quebras de linha nas colunas e WITH())
    # Procura por: COPY tabela (col1, col2, ...) FROM '/csv/arquivo.csv'
    pattern = r"COPY\s+(\w+)\s*\(\s*([^)]+)\s*\)\s*FROM\s+['\"]/csv/([\w\-]+\.csv)['\"]"
    matches = re.findall(pattern, content, re.IGNORECASE | re.MULTILINE | re.DOTALL)
    
    for table, columns, csv_file in matches:
        # Remove quebras de linha e espaços extras, depois separa por vírgula
        columns_clean = re.sub(r'\s+', ' ', columns)  # Remove múltiplos espaços/quebras
        columns_list = [col.strip() for col in columns_clean.split(',')]
        mappings[csv_file] = {
            'table': table,
            'columns': columns_list
        }
    
    # Debug: mostra o que foi encontrado
    if not mappings:
        print("⚠️  Nenhum COPY statement encontrado! Verificando o arquivo...")
        # Tenta uma abordagem mais simples
        lines = content.split('\n')
        for i, line in enumerate(lines):
            if 'COPY' in line.upper() and 'FROM' in line.upper():
                print(f"Linha {i+1}: {line[:80]}")
    
    return mappings

def generate_inserts(csv_path, table, columns, batch_size=1000, individual_inserts=False, on_conflict=False):
    """
    Gera comandos INSERT SQL a partir de um CSV
    
    Args:
        csv_path: caminho do CSV
        table: nome da tabela
        columns: lista de colunas
        batch_size: tamanho do lote para multi-row (ignorado se individual_inserts=True)
        individual_inserts: Se True, gera INSERTs individuais. Se False, gera multi-row INSERTs.
        on_conflict: Se True, usa INSERT ... ON CONFLICT DO NOTHING para evitar duplicatas
    """
    inserts = []
    warnings_shown = set()  # Para não repetir avisos
    current_batch = []
    total_rows = 0
    
    with open(csv_path, 'r', encoding='utf-8') as f:
        # Detecta delimitador
        first_line = f.readline()
        delimiter = ';' if ';' in first_line else ','
        f.seek(0)
        
        reader = csv.DictReader(f, delimiter=delimiter, quotechar='"')
        
        # Normaliza nomes das colunas no CSV (case-insensitive)
        csv_columns = {col.lower().strip('"').strip("'"): col for col in reader.fieldnames}
        
        for row in reader:
            values = []
            for col in columns:
                # Normaliza nome da coluna (remove espaços, aspas, case-insensitive)
                col_clean = col.strip().strip('"').strip("'").lower()
                
                # Tenta encontrar a coluna no CSV (case-insensitive)
                csv_col = None
                for csv_col_name, original_col in csv_columns.items():
                    if csv_col_name == col_clean:
                        csv_col = original_col
                        break
                
                if csv_col is None:
                    # Se não encontrou, tenta direto (pode dar erro, mas tenta)
                    csv_col = col
                    if col not in warnings_shown:
                        print(f"⚠️  Aviso: Coluna '{col}' não encontrada no CSV. Tentando nome direto...")
                        warnings_shown.add(col)
                
                value = row.get(csv_col, row.get(col, ''))
                
                # Se ainda não encontrou, adiciona NULL e avisa
                if csv_col not in row and col not in row:
                    if col not in warnings_shown:
                        print(f"⚠️  Aviso: Coluna '{col}' não existe no CSV. Usando NULL.")
                        warnings_shown.add(col)
                    value = ''
                
                # Se o valor está vazio ou é None, trata como NULL
                if value is None or (isinstance(value, str) and value.strip() == ''):
                    values.append('NULL')
                else:
                    values.append(escape_sql_value(value, col))
            
            # Adiciona os valores como string formatada
            values_str = ', '.join(values)
            total_rows += 1
            
            if individual_inserts:
                # Gera INSERT individual (mais lento, mas pode ser útil para debug)
                if on_conflict:
                    # Descobre a primary key (assume que é a primeira coluna ou id*)
                    pk_col = None
                    for col in columns:
                        if col.lower().startswith('id') and 'id' in col.lower():
                            pk_col = col
                            break
                    if pk_col:
                        insert = f"INSERT INTO {table} ({', '.join(columns)}) VALUES ({values_str}) ON CONFLICT ({pk_col}) DO NOTHING;"
                    else:
                        # Se não encontrar PK, usa a primeira coluna
                        insert = f"INSERT INTO {table} ({', '.join(columns)}) VALUES ({values_str}) ON CONFLICT ({columns[0]}) DO NOTHING;"
                else:
                    insert = f"INSERT INTO {table} ({', '.join(columns)}) VALUES ({values_str});"
                inserts.append(insert)
            else:
                # Agrupa para multi-row INSERT (mais rápido)
                current_batch.append(f"({values_str})")
                
                # Quando o lote atinge o tamanho, cria um INSERT multi-row
                if len(current_batch) >= batch_size:
                    if on_conflict:
                        # Descobre a primary key (assume que é a primeira coluna ou id*)
                        pk_col = None
                        for col in columns:
                            if col.lower().startswith('id') and 'id' in col.lower():
                                pk_col = col
                                break
                        if not pk_col:
                            pk_col = columns[0]
                        insert = f"INSERT INTO {table} ({', '.join(columns)}) VALUES {', '.join(current_batch)} ON CONFLICT ({pk_col}) DO NOTHING;"
                    else:
                        insert = f"INSERT INTO {table} ({', '.join(columns)}) VALUES {', '.join(current_batch)};"
                    inserts.append(insert)
                    current_batch = []
        
        # Adiciona o último lote se houver dados restantes (só para multi-row)
        if not individual_inserts and current_batch:
            if on_conflict:
                # Descobre a primary key
                pk_col = None
                for col in columns:
                    if col.lower().startswith('id') and 'id' in col.lower():
                        pk_col = col
                        break
                if not pk_col:
                    pk_col = columns[0]
                insert = f"INSERT INTO {table} ({', '.join(columns)}) VALUES {', '.join(current_batch)} ON CONFLICT ({pk_col}) DO NOTHING;"
            else:
                insert = f"INSERT INTO {table} ({', '.join(columns)}) VALUES {', '.join(current_batch)};"
            inserts.append(insert)
    
    return inserts, total_rows

def main():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Escolha qual banco processar
    print("Qual banco você quer processar?")
    print("1. Furnas")
    print("2. SIMA")
    print("3. BALCAR")
    choice = input("Digite 1, 2 ou 3: ").strip()
    
    # Escolha do formato de INSERT
    print("\nFormato de INSERT:")
    print("1. Multi-row INSERT (RECOMENDADO - mais rápido, ~68 comandos para 68 mil registros)")
    print("2. INSERTs individuais (mais lento, ~68 mil comandos, útil apenas para debug)")
    insert_choice = input("Digite 1 ou 2 (padrão: 1): ").strip()
    individual_inserts = (insert_choice == "2")
    
    # Escolha de tratamento de duplicatas
    print("\nTratamento de dados duplicados:")
    print("1. Normal (vai dar erro se já existir - use para primeira importação)")
    print("2. ON CONFLICT DO NOTHING (ignora duplicatas - use se já executou antes)")
    print("3. Gerar TRUNCATE antes (limpa todas as tabelas antes de inserir)")
    conflict_choice = input("Digite 1, 2 ou 3 (padrão: 1): ").strip()
    on_conflict = (conflict_choice == "2")
    generate_truncate = (conflict_choice == "3")
    
    if choice == "1":
        banco_dir = "furnas-campanha"
        db_name = "FURNAS"
    elif choice == "2":
        banco_dir = "sima"
        db_name = "SIMA"
    elif choice == "3":
        banco_dir = "balcar-campanha"
        db_name = "BALCAR"
    else:
        print("Opção inválida!")
        return
    
    copy_file = os.path.join(base_dir, banco_dir, "copy-table.sql")
    csv_dir = os.path.join(base_dir, banco_dir, "csv")
    
    if not os.path.exists(copy_file):
        print(f"Arquivo {copy_file} não encontrado!")
        return
    
    if not os.path.exists(csv_dir):
        print(f"Diretório {csv_dir} não encontrado!")
        return
    
    print(f"\nProcessando {db_name}...")
    print(f"Lendo {copy_file}...")
    
    mappings = parse_copy_statement(copy_file)

    if not mappings:
        print("❌ ERRO: Nenhum COPY statement encontrado no arquivo!")
        print("Verifique se o arquivo copy-table.sql está correto.")
        return
    
    # Fallback: incluir CSVs que existam mas não estejam no copy-table.sql
    csv_files = {f for f in os.listdir(csv_dir) if f.lower().endswith('.csv')}
    mapped_csvs = set(mappings.keys())
    missing_csvs = sorted(csv_files - mapped_csvs)

    for csv_file in missing_csvs:
        table_name = os.path.splitext(csv_file)[0]
        # Descobrir colunas pelo header do CSV
        csv_path = os.path.join(csv_dir, csv_file)
        try:
            with open(csv_path, 'r', encoding='utf-8') as f:
                header_line = f.readline()
                delimiter = ';' if ';' in header_line else ','
                f.seek(0)
                reader = csv.reader(f, delimiter=delimiter)
                headers = next(reader)
                # Normaliza nomes removendo aspas
                headers = [h.strip().strip('"').strip("'") for h in headers]
                mappings[csv_file] = {
                    'table': table_name,
                    'columns': headers,
                }
                print(f"ℹ️  Adicionado por fallback: {csv_file} -> {table_name} ({len(headers)} colunas)")
        except Exception as e:
            print(f"⚠️  Não foi possível inferir colunas de {csv_file}: {e}")

    print(f"✅ Encontrados {len(mappings)} mapeamentos de tabelas/CSVs (inclui fallback)")
    
    output_file = os.path.join(base_dir, f"{banco_dir}-inserts.sql")
    
    with open(output_file, 'w', encoding='utf-8') as out:
        # Se escolheu TRUNCATE, gera comandos de limpeza
        if generate_truncate:
            out.write(f"-- Limpeza de tabelas antes da importação\n")
            out.write(f"-- ATENÇÃO: Isso vai APAGAR todos os dados existentes!\n\n")
            
            # Ordem reversa para respeitar foreign keys (tabelas filhas primeiro)
            tables = [info['table'] for info in mappings.values()]
            # Remove duplicatas mantendo ordem
            seen = set()
            unique_tables = []
            for table in tables:
                if table not in seen:
                    seen.add(table)
                    unique_tables.append(table)
            
            # Trunca todas as tabelas (ordem reversa para respeitar FKs)
            for table in reversed(unique_tables):
                out.write(f"TRUNCATE TABLE {table} CASCADE;\n")
            out.write("\n\n")
        out.write(f"-- Comandos INSERT para {db_name}\n")
        out.write(f"-- Gerado automaticamente\n\n")
        
        for csv_file, info in mappings.items():
            csv_path = os.path.join(csv_dir, csv_file)
            
            if not os.path.exists(csv_path):
                print(f"⚠️  CSV não encontrado: {csv_file}")
                continue
            
            print(f"Processando {csv_file} -> {info['table']}...")
            
            try:
                inserts, total_rows = generate_inserts(csv_path, info['table'], info['columns'], batch_size=1000, individual_inserts=individual_inserts, on_conflict=on_conflict)
            except Exception as e:
                print(f"❌ ERRO ao processar {csv_file}: {e}")
                continue
            
            insert_type = "INSERTs individuais" if individual_inserts else "INSERT multi-row"
            out.write(f"\n-- {info['table']} ({total_rows} registros, {len(inserts)} comandos {insert_type})\n")
            out.write(f"-- CSV: {csv_file}\n\n")
            
            # Escreve todos os INSERTs (já são multi-row, então são poucos comandos)
            out.write('\n'.join(inserts))
            out.write('\n\n')
            
            insert_type = "INSERTs individuais" if individual_inserts else "INSERTs multi-row"
            print(f"✅ {total_rows} registros em {len(inserts)} {insert_type} para {info['table']}")
    
    print(f"\n✅ Arquivo gerado: {output_file}")
    print(f"\n⚠️  IMPORTANTE - Limites do Neon Free Tier:")
    print(f"   - Armazenamento: 0,5 GB máximo")
    print(f"   - Computação: 100 horas/mês")
    print(f"   - Se seus dados excederem 0,5 GB, considere um plano pago")
    
    if generate_truncate:
        print(f"\n✅ Script gerado com comandos TRUNCATE no início.")
        print(f"   Isso vai limpar todas as tabelas antes de inserir os dados.")
    elif on_conflict:
        print(f"\n✅ Script gerado com ON CONFLICT DO NOTHING.")
        print(f"   Duplicatas serão ignoradas silenciosamente.")
    
    if individual_inserts:
        print(f"\n⚠️  ATENÇÃO: Você escolheu INSERTs individuais.")
        print(f"   Isso gerará MUITOS comandos SQL e será MUITO mais lento.")
        print(f"   Recomendamos usar multi-row INSERT para melhor performance.")
    else:
        print(f"\n💡 Os INSERTs foram otimizados para multi-row (1000 registros por comando)")
        print(f"   Isso reduz drasticamente o número de comandos e melhora a performance!")
        print(f"\n✅ EQUIVALÊNCIA GARANTIDA:")
        print(f"   Multi-row INSERT é SEMANTICAMENTE IDENTICO a INSERTs individuais.")
        print(f"   Os dados inseridos no banco serão EXATAMENTE OS MESMOS.")
        print(f"   A única diferença é PERFORMANCE (multi-row é muito mais rápido).")
    
    print(f"\nPróximo passo:")
    print(f"1. Abra o arquivo {output_file}")
    print(f"2. Copie todo o conteúdo")
    print(f"3. Cole no SQL Editor do Neon")
    print(f"4. Execute (Run ou F5)")

if __name__ == "__main__":
    main()

