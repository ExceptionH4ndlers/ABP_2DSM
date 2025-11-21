-- =====================================================
-- BDR.04 - TRIGGERS
-- Requisito: Desenvolver triggers para automatizar ações no banco de dados
-- Tema: Aplicação Web para visualização e disseminação de dados limnológicos
-- =====================================================

-- =====================================================
-- TRIGGER 1: trg_log_insercao_dados
-- =====================================================
-- Objetivo: Registrar em uma tabela de log todas as inserções realizadas em
--           tabelas de dados principais, permitindo rastreabilidade das operações.
-- Evento que dispara: AFTER INSERT
-- Tabelas alvo: tbparametrosbiologicosfisicosagua, tbfluxoinpe, tbsima
-- Banco: Furnas (bdfurnas-campanha), BALCAR (bdbalcar-campanha), SIMA (bdsima)
-- =====================================================

-- Criar tabela de log se não existir
CREATE TABLE IF NOT EXISTS log_insercao_dados (
    id_log SERIAL PRIMARY KEY,
    tabela VARCHAR(100) NOT NULL,
    operacao VARCHAR(20) NOT NULL,
    id_registro INTEGER,
    data_hora TIMESTAMP DEFAULT NOW(),
    usuario VARCHAR(50) DEFAULT CURRENT_USER
);

-- Função para registrar inserções
CREATE OR REPLACE FUNCTION registrar_insercao()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO log_insercao_dados (tabela, operacao, id_registro)
    VALUES (TG_TABLE_NAME, TG_OP, NEW.id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para tbparametrosbiologicosfisicosagua (Furnas)
DROP TRIGGER IF EXISTS trg_log_insercao_parametros ON tbparametrosbiologicosfisicosagua;
CREATE TRIGGER trg_log_insercao_parametros
AFTER INSERT ON tbparametrosbiologicosfisicosagua
FOR EACH ROW
EXECUTE FUNCTION registrar_insercao();

-- Trigger para tbfluxoinpe (BALCAR)
-- Nota: Executar no banco bdbalcar-campanha
-- DROP TRIGGER IF EXISTS trg_log_insercao_fluxoinpe ON tbfluxoinpe;
-- CREATE TRIGGER trg_log_insercao_fluxoinpe
-- AFTER INSERT ON tbfluxoinpe
-- FOR EACH ROW
-- EXECUTE FUNCTION registrar_insercao();

-- Trigger para tbsima (SIMA)
-- Nota: Executar no banco bdsima
-- DROP TRIGGER IF EXISTS trg_log_insercao_sima ON tbsima;
-- CREATE TRIGGER trg_log_insercao_sima
-- AFTER INSERT ON tbsima
-- FOR EACH ROW
-- EXECUTE FUNCTION registrar_insercao();

-- =====================================================
-- TRIGGER 2: trg_validar_ph
-- =====================================================
-- Objetivo: Validar que valores de pH estejam dentro da faixa aceitável (0 a 14),
--           impedindo a inserção ou atualização de dados inválidos.
-- Evento que dispara: BEFORE INSERT OR UPDATE
-- Tabelas alvo: tbparametrosbiologicosfisicosagua, tbsima (sonda_ph)
-- Banco: Furnas (bdfurnas-campanha), SIMA (bdsima)
-- =====================================================

-- Função para validar pH
CREATE OR REPLACE FUNCTION validar_ph()
RETURNS TRIGGER AS $$
BEGIN
    -- Validar pH na tabela tbparametrosbiologicosfisicosagua
    IF TG_TABLE_NAME = 'tbparametrosbiologicosfisicosagua' THEN
        IF NEW.ph IS NOT NULL AND (NEW.ph < 0 OR NEW.ph > 14) THEN
            RAISE EXCEPTION 'Valor de pH inválido: %. O pH deve estar entre 0 e 14.', NEW.ph;
        END IF;
    END IF;
    
    -- Validar pH na tabela tbsima (sonda_ph)
    IF TG_TABLE_NAME = 'tbsima' THEN
        IF NEW.sonda_ph IS NOT NULL AND (NEW.sonda_ph < 0 OR NEW.sonda_ph > 14) THEN
            RAISE EXCEPTION 'Valor de pH da sonda inválido: %. O pH deve estar entre 0 e 14.', NEW.sonda_ph;
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para tbparametrosbiologicosfisicosagua (Furnas)
DROP TRIGGER IF EXISTS trg_validar_ph_parametros ON tbparametrosbiologicosfisicosagua;
CREATE TRIGGER trg_validar_ph_parametros
BEFORE INSERT OR UPDATE ON tbparametrosbiologicosfisicosagua
FOR EACH ROW
WHEN (NEW.ph IS NOT NULL)
EXECUTE FUNCTION validar_ph();

-- Trigger para tbsima (SIMA)
-- Nota: Executar no banco bdsima
-- DROP TRIGGER IF EXISTS trg_validar_ph_sima ON tbsima;
-- CREATE TRIGGER trg_validar_ph_sima
-- BEFORE INSERT OR UPDATE ON tbsima
-- FOR EACH ROW
-- WHEN (NEW.sonda_ph IS NOT NULL)
-- EXECUTE FUNCTION validar_ph();

-- =====================================================
-- TRIGGER 3: trg_atualizar_reservatorio
-- =====================================================
-- Objetivo: Atualizar automaticamente o timestamp de última atualização do
--           reservatório sempre que novos dados forem inseridos em tabelas
--           relacionadas a campanhas.
-- Evento que dispara: AFTER INSERT
-- Tabelas alvo: tbcampanha, tbparametrosbiologicosfisicosagua
-- Banco: Furnas (bdfurnas-campanha)
-- =====================================================

-- Adicionar coluna de última atualização se não existir
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'tbreservatorio' 
        AND column_name = 'ultima_atualizacao'
    ) THEN
        ALTER TABLE tbreservatorio ADD COLUMN ultima_atualizacao TIMESTAMP;
    END IF;
END $$;

-- Função para atualizar timestamp do reservatório
CREATE OR REPLACE FUNCTION atualizar_reservatorio()
RETURNS TRIGGER AS $$
DECLARE
    reservatorio_id INTEGER;
BEGIN
    -- Se a inserção for em tbcampanha, pegar o idreservatorio diretamente
    IF TG_TABLE_NAME = 'tbcampanha' THEN
        reservatorio_id := NEW.idreservatorio;
    -- Se a inserção for em tbparametrosbiologicosfisicosagua, buscar via sítio
    ELSIF TG_TABLE_NAME = 'tbparametrosbiologicosfisicosagua' THEN
        SELECT s.idreservatorio INTO reservatorio_id
        FROM tbsitio s
        WHERE s.idsitio = NEW.idSitio;
    END IF;
    
    -- Atualizar timestamp do reservatório
    IF reservatorio_id IS NOT NULL THEN
        UPDATE tbreservatorio
        SET ultima_atualizacao = NOW()
        WHERE idreservatorio = reservatorio_id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para tbcampanha
DROP TRIGGER IF EXISTS trg_atualizar_reservatorio_campanha ON tbcampanha;
CREATE TRIGGER trg_atualizar_reservatorio_campanha
AFTER INSERT ON tbcampanha
FOR EACH ROW
EXECUTE FUNCTION atualizar_reservatorio();

-- Trigger para tbparametrosbiologicosfisicosagua
DROP TRIGGER IF EXISTS trg_atualizar_reservatorio_parametros ON tbparametrosbiologicosfisicosagua;
CREATE TRIGGER trg_atualizar_reservatorio_parametros
AFTER INSERT ON tbparametrosbiologicosfisicosagua
FOR EACH ROW
EXECUTE FUNCTION atualizar_reservatorio();

-- =====================================================
-- CONSULTAS ÚTEIS PARA VERIFICAR OS TRIGGERS
-- =====================================================

-- Verificar logs de inserção
-- SELECT * FROM log_insercao_dados ORDER BY data_hora DESC LIMIT 10;

-- Verificar reservatórios com última atualização
-- SELECT nome, ultima_atualizacao FROM tbreservatorio WHERE ultima_atualizacao IS NOT NULL ORDER BY ultima_atualizacao DESC;

-- Testar validação de pH (deve gerar erro)
-- INSERT INTO tbparametrosbiologicosfisicosagua (idParametrosBiologicosFisicosAgua, idCampanha, idSitio, ph) VALUES (999999, 1, 1, 15);

