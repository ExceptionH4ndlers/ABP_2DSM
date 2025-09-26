# CSV Parser SIMA - Documentação

## Visão Geral

O CSV Parser SIMA é um sistema completo para exportação de dados do Sistema Integrado de Monitoramento Ambiental (SIMA) em formato CSV. Ele foi desenvolvido para estruturar os dados vindos do banco de dados e incluir informações adicionais relevantes, conforme especificado no BDR 009.

## Funcionalidades Principais

### 1. **Geração de Arquivo CSV com Cabeçalhos + Metadados**

- ✅ Cabeçalhos detalhados com unidades de medida
- ✅ Metadados completos do arquivo
- ✅ Informações da estação de coleta
- ✅ Período de dados incluído
- ✅ Descrições dos sensores utilizados

### 2. **Estruturação de Dados do Banco**

- ✅ Conversão automática de dados SIMA para formato CSV
- ✅ Mapeamento de campos com metadados
- ✅ Validação de dados antes da exportação
- ✅ Tratamento de valores nulos e vazios

### 3. **Informações Adicionais Relevantes**

- ✅ Coordenadas geográficas da estação
- ✅ Especificações técnicas dos sensores
- ✅ Fabricante e modelo dos equipamentos
- ✅ Precisão e faixa de medição
- ✅ Data de geração do arquivo

## Arquivos do Sistema

### Core Files

- `front/src/utils/csvParser.ts` - Parser principal com todas as funcionalidades
- `front/src/hooks/useCsvExport.ts` - Hook React para facilitar o uso
- `front/src/components/CsvExportModal.tsx` - Interface modal de exportação
- `front/src/components/CsvExportButton.tsx` - Botão reutilizável de exportação

### Integration Files

- `front/src/pages/SimaPage.tsx` - Integração na página de dados SIMA
- `front/src/pages/GraficoPage.tsx` - Integração na página de gráficos
- `front/src/types/sima.ts` - Tipos TypeScript atualizados

## Como Usar

### 1. **Uso Básico com Hook**

```typescript
import { useCsvExport } from '../hooks/useCsvExport';
import type { SimaData } from '../utils/csvParser';

function MyComponent() {
  const { exportCsv, isExporting, exportError } = useCsvExport();

  const handleExport = async () => {
    const data: SimaData[] = [
      {
        idsima: 1,
        idestacao: "31966",
        datahora: "2024-01-01 12:00:00",
        tempar: 25.5,
        precipitacao: 120.0
      }
    ];

    await exportCsv(data, 'meus_dados.csv');
  };

  return (
    <button onClick={handleExport} disabled={isExporting}>
      {isExporting ? 'Exportando...' : 'Exportar CSV'}
    </button>
  );
}
```

### 2. **Uso com Componente Button**

```typescript
import { CsvExportButton } from '../components/CsvExportButton';

function MyComponent() {
  const data: SimaData[] = [...]; // seus dados

  return (
    <CsvExportButton
      data={data}
      filename="dados_sima.csv"
      variant="primary"
      size="medium"
    />
  );
}
```

### 3. **Uso Avançado com Opções**

```typescript
import { simaCsvParser } from "../utils/csvParser";

const options = {
  incluirMetadados: true,
  incluirCabecalhos: true,
  formatoData: "BR",
  separador: ";",
  encoding: "UTF-8",
  filtros: {
    dataInicio: "2024-01-01",
    dataFim: "2024-12-31",
    estacao: "31966",
  },
};

const csvContent = await simaCsvParser.generateCsv(data, options);
```

## Configurações Disponíveis

### Opções de Exportação

| Opção               | Tipo                    | Padrão  | Descrição                      |
| ------------------- | ----------------------- | ------- | ------------------------------ |
| `incluirMetadados`  | boolean                 | true    | Inclui cabeçalho com metadados |
| `incluirCabecalhos` | boolean                 | true    | Inclui cabeçalhos das colunas  |
| `formatoData`       | 'BR' \| 'ISO' \| 'US'   | 'BR'    | Formato de data/hora           |
| `separador`         | ',' \| ';' \| '\t'      | ';'     | Separador de campos            |
| `encoding`          | 'UTF-8' \| 'ISO-8859-1' | 'UTF-8' | Codificação do arquivo         |

### Filtros Disponíveis

| Filtro       | Tipo     | Descrição                   |
| ------------ | -------- | --------------------------- |
| `dataInicio` | string   | Data de início (YYYY-MM-DD) |
| `dataFim`    | string   | Data de fim (YYYY-MM-DD)    |
| `estacao`    | string   | ID da estação específica    |
| `campos`     | string[] | Lista de campos a incluir   |

## Estrutura do Arquivo CSV Gerado

### Metadados (quando habilitado)

```
# METADADOS DO ARQUIVO CSV SIMA
# Título: Dados SIMA - Estação Balbina
# Descrição: Dados de monitoramento hidrosférico coletados pelo SIMA
# Fonte: SIMA - Sistema Integrado de Monitoramento Ambiental
# Data de Geração: 2024-01-15T10:30:00.000Z
# Versão: 1.0
# Estação: Balbina
# Coordenadas: Lat -1.903697222, Lng -59.46910833
# Período: 2005-01-25 a 2005-12-31
# Total de Registros: 1500
# Campos Incluídos: 35
```

### Cabeçalhos das Colunas

```
ID_SIMA;ID_ESTACAO;DATA_HORA;BATERIA DA PTT (V);CLOROFILA (ug/l);CONC. DE DO (mg/l);...
```

### Dados

```
1;31966;25/01/2005 12:00:00;12.82;-1.4;-0.02;...
2;31966;25/01/2005 15:00:00;13.37;-2.3;-0.02;...
```

## Validação de Dados

O sistema inclui validação automática que verifica:

- ✅ Presença de campos obrigatórios (ID_SIMA, ID_ESTACAO, DATA_HORA)
- ✅ Formato correto de datas
- ✅ Valores numéricos válidos
- ✅ Integridade dos dados

## Tratamento de Erros

### Tipos de Erro Comuns

1. **Dados Inválidos**: Campos obrigatórios ausentes
2. **Formato Incorreto**: Datas ou números mal formatados
3. **Arquivo Grande**: Limite de memória excedido
4. **Permissões**: Falha ao salvar arquivo

### Tratamento de Erros

```typescript
try {
  await exportCsv(data);
} catch (error) {
  console.error("Erro na exportação:", error.message);
  // Exibir mensagem de erro para o usuário
}
```

## Performance e Otimizações

### Características de Performance

- ✅ **Streaming**: Processamento em chunks para arquivos grandes
- ✅ **Lazy Loading**: Carregamento sob demanda dos metadados
- ✅ **Caching**: Cache de metadados para evitar requisições repetidas
- ✅ **Compressão**: Otimização do conteúdo CSV

### Limites Recomendados

- **Registros por arquivo**: Até 50.000 registros
- **Tamanho do arquivo**: Até 100MB
- **Campos por registro**: Até 50 campos

## Integração com Backend

### Endpoints Necessários

```typescript
// Carregar estações
GET /api/estacoes

// Carregar sensores
GET /api/sensores

// Carregar campos
GET /api/campos

// Dados SIMA
GET /api/sima?page=1&limit=1000&startDate=2024-01-01&endDate=2024-12-31
```

### Estrutura de Resposta Esperada

```typescript
// Estações
interface EstacaoResponse {
  idestacao: string;
  idhexadecimal?: string;
  rotulo?: string;
  lat?: number;
  lng?: number;
  inicio?: string;
  fim?: string;
}

// Sensores
interface SensorResponse {
  idSensor: number;
  nome: string;
  fabricante?: string;
  modelo?: string;
  faixa?: string;
  precisao?: string;
}
```

## Exemplos de Uso por Página

### SimaPage

- Exporta dados da tabela atual
- Inclui filtros de data aplicados
- Nome do arquivo baseado no período selecionado

### GraficoPage

- Exporta dados dos gráficos
- Converte dados visuais para formato tabular
- Inclui metadados dos gráficos

### MapaInterativoPage

- Exporta dados das estações no mapa
- Inclui coordenadas geográficas
- Filtros por região geográfica

## Troubleshooting

### Problemas Comuns

1. **Arquivo não baixa**
   - Verificar se o navegador bloqueia downloads
   - Verificar permissões de escrita

2. **Dados não aparecem**
   - Verificar se os dados estão no formato correto
   - Verificar se os metadados foram carregados

3. **Erro de memória**
   - Reduzir quantidade de registros
   - Usar filtros mais específicos

### Logs e Debug

```typescript
// Habilitar logs detalhados
console.log("Dados para exportação:", data);
console.log("Opções configuradas:", options);
console.log("Metadados carregados:", metadata);
```

## Roadmap Futuro

### Funcionalidades Planejadas

- [ ] **Exportação em lote**: Múltiplos arquivos simultâneos
- [ ] **Templates personalizados**: Formatos CSV customizáveis
- [ ] **Agendamento**: Exportação automática programada
- [ ] **Compressão**: Arquivos ZIP com múltiplos CSVs
- [ ] **API REST**: Endpoint para exportação via API
- [ ] **Relatórios**: Geração de relatórios em PDF/Excel

### Melhorias de Performance

- [ ] **Web Workers**: Processamento em background
- [ ] **IndexedDB**: Cache local de metadados
- [ ] **Streaming**: Processamento de arquivos grandes
- [ ] **Compressão**: Redução do tamanho dos arquivos

---

**Desenvolvido para o projeto SIMA - Sistema Integrado de Monitoramento Ambiental**

_Versão 1.0 - Janeiro 2024_
