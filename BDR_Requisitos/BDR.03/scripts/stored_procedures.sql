-- =====================================================
-- BDR.03 - STORED PROCEDURES
-- Requisito: Desenvolver stored procedures para automatizar consultas e operações
-- Tema: Aplicação Web para visualização e disseminação de dados limnológicos
-- =====================================================

-- =====================================================
-- PROCEDURE 1: listar_coletas_reservatorio
-- =====================================================
-- Objetivo: Listar todas as coletas realizadas em um reservatório específico
--           dentro de um intervalo de datas.
-- Parâmetros de entrada:
--   - reservatorio_nome: Nome do reservatório (VARCHAR)
--   - data_inicio: Data inicial do intervalo (DATE)
--   - data_fim: Data final do intervalo (DATE)
-- Saída esperada: Dados de parâmetros biológicos com informações de sítio,
--                 campanha e instituição, ordenados por data.
-- Banco: Furnas (bdfurnas-campanha)
-- =====================================================
CREATE OR REPLACE PROCEDURE listar_coletas_reservatorio(
    reservatorio_nome VARCHAR,
    data_inicio DATE,
    data_fim DATE
)
LANGUAGE plpgsql
AS $$
BEGIN
    SELECT 
        pb.idParametrosBiologicosFisicosAgua,
        pb.dataMedida,
        pb.profundidade,
        pb.tempagua AS temperatura_agua,
        pb.ph,
        pb.clorofilaa,
        pb.biomassabacteria,
        pb.densidadebacteria,
        s.nome AS nome_sitio,
        s.lat AS latitude_sitio,
        s.lng AS longitude_sitio,
        r.nome AS nome_reservatorio,
        c.nroCampanha,
        c.datainicio AS data_inicio_campanha,
        c.datafim AS data_fim_campanha,
        i.nome AS nome_instituicao
    FROM tbparametrosbiologicosfisicosagua pb
    INNER JOIN tbsitio s ON pb.idSitio = s.idsitio
    INNER JOIN tbreservatorio r ON s.idreservatorio = r.idreservatorio
    INNER JOIN tbcampanha c ON pb.idCampanha = c.idcampanha
    INNER JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    WHERE r.nome = reservatorio_nome
        AND pb.dataMedida BETWEEN data_inicio AND data_fim
    ORDER BY pb.dataMedida, s.nome;
END;
$$;

-- Exemplo de uso:
-- CALL listar_coletas_reservatorio('Furnas', '2006-01-01', '2010-12-31');

-- =====================================================
-- PROCEDURE 2: calcular_media_parametro_campanha
-- =====================================================
-- Objetivo: Calcular a média de um parâmetro específico em uma campanha.
-- Parâmetros de entrada:
--   - campanha_id: ID da campanha (INTEGER)
--   - parametro_nome: Nome do parâmetro a calcular (VARCHAR)
--     Valores aceitos: 'tempagua', 'ph', 'clorofilaa', 'biomassabacteria', 
--                      'densidadebacteria', 'doc', 'toc', 'dic', 'nt', 'pt'
-- Saída esperada: Média do parâmetro especificado na campanha.
-- Banco: Furnas (bdfurnas-campanha)
-- =====================================================
CREATE OR REPLACE PROCEDURE calcular_media_parametro_campanha(
    campanha_id INTEGER,
    parametro_nome VARCHAR
)
LANGUAGE plpgsql
AS $$
DECLARE
    media_valor FLOAT;
BEGIN
    CASE parametro_nome
        WHEN 'tempagua' THEN
            SELECT AVG(pb.tempagua) INTO media_valor
            FROM tbparametrosbiologicosfisicosagua pb
            WHERE pb.idCampanha = campanha_id AND pb.tempagua IS NOT NULL;
        WHEN 'ph' THEN
            SELECT AVG(pb.ph) INTO media_valor
            FROM tbparametrosbiologicosfisicosagua pb
            WHERE pb.idCampanha = campanha_id AND pb.ph IS NOT NULL;
        WHEN 'clorofilaa' THEN
            SELECT AVG(pb.clorofilaa) INTO media_valor
            FROM tbparametrosbiologicosfisicosagua pb
            WHERE pb.idCampanha = campanha_id AND pb.clorofilaa IS NOT NULL;
        WHEN 'biomassabacteria' THEN
            SELECT AVG(pb.biomassabacteria) INTO media_valor
            FROM tbparametrosbiologicosfisicosagua pb
            WHERE pb.idCampanha = campanha_id AND pb.biomassabacteria IS NOT NULL;
        WHEN 'densidadebacteria' THEN
            SELECT AVG(pb.densidadebacteria) INTO media_valor
            FROM tbparametrosbiologicosfisicosagua pb
            WHERE pb.idCampanha = campanha_id AND pb.densidadebacteria IS NOT NULL;
        WHEN 'doc' THEN
            SELECT AVG(pb.doc) INTO media_valor
            FROM tbparametrosbiologicosfisicosagua pb
            WHERE pb.idCampanha = campanha_id AND pb.doc IS NOT NULL;
        WHEN 'toc' THEN
            SELECT AVG(pb.toc) INTO media_valor
            FROM tbparametrosbiologicosfisicosagua pb
            WHERE pb.idCampanha = campanha_id AND pb.toc IS NOT NULL;
        WHEN 'dic' THEN
            SELECT AVG(pb.dic) INTO media_valor
            FROM tbparametrosbiologicosfisicosagua pb
            WHERE pb.idCampanha = campanha_id AND pb.dic IS NOT NULL;
        WHEN 'nt' THEN
            SELECT AVG(pb.nt) INTO media_valor
            FROM tbparametrosbiologicosfisicosagua pb
            WHERE pb.idCampanha = campanha_id AND pb.nt IS NOT NULL;
        WHEN 'pt' THEN
            SELECT AVG(pb.pt) INTO media_valor
            FROM tbparametrosbiologicosfisicosagua pb
            WHERE pb.idCampanha = campanha_id AND pb.pt IS NOT NULL;
        ELSE
            RAISE EXCEPTION 'Parâmetro "%" não reconhecido. Parâmetros válidos: tempagua, ph, clorofilaa, biomassabacteria, densidadebacteria, doc, toc, dic, nt, pt', parametro_nome;
    END CASE;
    
    SELECT 
        c.nroCampanha,
        c.datainicio,
        c.datafim,
        parametro_nome AS parametro,
        media_valor AS media,
        COUNT(*) AS total_registros
    FROM tbcampanha c
    WHERE c.idcampanha = campanha_id;
END;
$$;

-- Exemplo de uso:
-- CALL calcular_media_parametro_campanha(1, 'tempagua');
-- CALL calcular_media_parametro_campanha(1, 'ph');

-- =====================================================
-- PROCEDURE 3: listar_parametros_por_instituicao
-- =====================================================
-- Objetivo: Listar todos os parâmetros únicos coletados por uma instituição específica.
-- Parâmetros de entrada:
--   - instituicao_nome: Nome da instituição (VARCHAR)
-- Saída esperada: Lista de parâmetros únicos coletados pela instituição,
--                 com informações sobre quantas campanhas utilizaram cada parâmetro.
-- Banco: Furnas (bdfurnas-campanha)
-- =====================================================
CREATE OR REPLACE PROCEDURE listar_parametros_por_instituicao(
    instituicao_nome VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN
    SELECT 
        'tempagua' AS parametro,
        'Temperatura da Água' AS descricao,
        COUNT(DISTINCT pb.idCampanha) AS total_campanhas,
        COUNT(pb.idParametrosBiologicosFisicosAgua) AS total_medicoes,
        AVG(pb.tempagua) AS media_valor
    FROM tbparametrosbiologicosfisicosagua pb
    INNER JOIN tbcampanha c ON pb.idCampanha = c.idcampanha
    INNER JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    WHERE i.nome = instituicao_nome AND pb.tempagua IS NOT NULL
    
    UNION ALL
    
    SELECT 
        'ph' AS parametro,
        'pH' AS descricao,
        COUNT(DISTINCT pb.idCampanha) AS total_campanhas,
        COUNT(pb.idParametrosBiologicosFisicosAgua) AS total_medicoes,
        AVG(pb.ph) AS media_valor
    FROM tbparametrosbiologicosfisicosagua pb
    INNER JOIN tbcampanha c ON pb.idCampanha = c.idcampanha
    INNER JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    WHERE i.nome = instituicao_nome AND pb.ph IS NOT NULL
    
    UNION ALL
    
    SELECT 
        'clorofilaa' AS parametro,
        'Clorofila A' AS descricao,
        COUNT(DISTINCT pb.idCampanha) AS total_campanhas,
        COUNT(pb.idParametrosBiologicosFisicosAgua) AS total_medicoes,
        AVG(pb.clorofilaa) AS media_valor
    FROM tbparametrosbiologicosfisicosagua pb
    INNER JOIN tbcampanha c ON pb.idCampanha = c.idcampanha
    INNER JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    WHERE i.nome = instituicao_nome AND pb.clorofilaa IS NOT NULL
    
    UNION ALL
    
    SELECT 
        'biomassabacteria' AS parametro,
        'Biomassa Bacteriana' AS descricao,
        COUNT(DISTINCT pb.idCampanha) AS total_campanhas,
        COUNT(pb.idParametrosBiologicosFisicosAgua) AS total_medicoes,
        AVG(pb.biomassabacteria) AS media_valor
    FROM tbparametrosbiologicosfisicosagua pb
    INNER JOIN tbcampanha c ON pb.idCampanha = c.idcampanha
    INNER JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    WHERE i.nome = instituicao_nome AND pb.biomassabacteria IS NOT NULL
    
    UNION ALL
    
    SELECT 
        'densidadebacteria' AS parametro,
        'Densidade Bacteriana' AS descricao,
        COUNT(DISTINCT pb.idCampanha) AS total_campanhas,
        COUNT(pb.idParametrosBiologicosFisicosAgua) AS total_medicoes,
        AVG(pb.densidadebacteria) AS media_valor
    FROM tbparametrosbiologicosfisicosagua pb
    INNER JOIN tbcampanha c ON pb.idCampanha = c.idcampanha
    INNER JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    WHERE i.nome = instituicao_nome AND pb.densidadebacteria IS NOT NULL
    
    UNION ALL
    
    SELECT 
        'doc' AS parametro,
        'Carbono Orgânico Dissolvido' AS descricao,
        COUNT(DISTINCT pb.idCampanha) AS total_campanhas,
        COUNT(pb.idParametrosBiologicosFisicosAgua) AS total_medicoes,
        AVG(pb.doc) AS media_valor
    FROM tbparametrosbiologicosfisicosagua pb
    INNER JOIN tbcampanha c ON pb.idCampanha = c.idcampanha
    INNER JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    WHERE i.nome = instituicao_nome AND pb.doc IS NOT NULL
    
    UNION ALL
    
    SELECT 
        'toc' AS parametro,
        'Carbono Orgânico Total' AS descricao,
        COUNT(DISTINCT pb.idCampanha) AS total_campanhas,
        COUNT(pb.idParametrosBiologicosFisicosAgua) AS total_medicoes,
        AVG(pb.toc) AS media_valor
    FROM tbparametrosbiologicosfisicosagua pb
    INNER JOIN tbcampanha c ON pb.idCampanha = c.idcampanha
    INNER JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    WHERE i.nome = instituicao_nome AND pb.toc IS NOT NULL
    
    UNION ALL
    
    SELECT 
        'dic' AS parametro,
        'Carbono Inorgânico Dissolvido' AS descricao,
        COUNT(DISTINCT pb.idCampanha) AS total_campanhas,
        COUNT(pb.idParametrosBiologicosFisicosAgua) AS total_medicoes,
        AVG(pb.dic) AS media_valor
    FROM tbparametrosbiologicosfisicosagua pb
    INNER JOIN tbcampanha c ON pb.idCampanha = c.idcampanha
    INNER JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    WHERE i.nome = instituicao_nome AND pb.dic IS NOT NULL
    
    UNION ALL
    
    SELECT 
        'nt' AS parametro,
        'Nitrogênio Total' AS descricao,
        COUNT(DISTINCT pb.idCampanha) AS total_campanhas,
        COUNT(pb.idParametrosBiologicosFisicosAgua) AS total_medicoes,
        AVG(pb.nt) AS media_valor
    FROM tbparametrosbiologicosfisicosagua pb
    INNER JOIN tbcampanha c ON pb.idCampanha = c.idcampanha
    INNER JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    WHERE i.nome = instituicao_nome AND pb.nt IS NOT NULL
    
    UNION ALL
    
    SELECT 
        'pt' AS parametro,
        'Fósforo Total' AS descricao,
        COUNT(DISTINCT pb.idCampanha) AS total_campanhas,
        COUNT(pb.idParametrosBiologicosFisicosAgua) AS total_medicoes,
        AVG(pb.pt) AS media_valor
    FROM tbparametrosbiologicosfisicosagua pb
    INNER JOIN tbcampanha c ON pb.idCampanha = c.idcampanha
    INNER JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
    WHERE i.nome = instituicao_nome AND pb.pt IS NOT NULL
    
    ORDER BY total_campanhas DESC, parametro;
END;
$$;

-- Exemplo de uso:
-- CALL listar_parametros_por_instituicao('INPE');
-- CALL listar_parametros_por_instituicao('UFRJ');

