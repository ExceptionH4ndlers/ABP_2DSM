-- =====================================================
-- VIEW: vw_series_temporais_sima
-- BANCO: SIMA
-- DESCRIÇÃO: Consolida dados de tbsima e tbsimaoffline em formato de série temporal (EAV)
-- para facilitar consultas de gráficos por estação e parâmetro.
-- =====================================================
CREATE OR REPLACE VIEW vw_series_temporais_sima AS
WITH dados_sima_consolidado AS (
    -- 1. Dados Online (tbsima)
    SELECT
        s.idsima AS id_registro,
        s.datahora,
        e.idestacao,
        e.rotulo AS nome_estacao,
        e.lat,
        e.lng,
        s.tempar,
        s.ur,
        s.pressatm,
        s.radincid,
        s.tempag1,
        s.tempag2,
        s.tempag3,
        s.tempag4,
        s.sonda_temp,
        s.sonda_cond,
        s.sonda_DOsat,
        s.sonda_DO,
        s.sonda_pH,
        s.sonda_NH4,
        s.sonda_NO3,
        s.sonda_turb,
        s.sonda_chl,
        'online' AS origem
    FROM tbsima s
    INNER JOIN tbestacao e ON s.idestacao = e.idestacao

    UNION ALL

    -- 2. Dados Offline (tbsimaoffline)
    SELECT
        so.idsimaoffline AS id_registro,
        so.datahora,
        e.idestacao,
        e.rotulo AS nome_estacao,
        e.lat,
        e.lng,
        so.tempar,
        so.ur,
        so.pressatm,
        so.radincid,
        so.tempag1,
        so.tempag2,
        NULL AS tempag3, -- Coluna inexistente em tbsimaoffline, adicionada para UNION
        NULL AS tempag4, -- Coluna inexistente em tbsimaoffline, adicionada para UNION
        so.sonda_temp,
        so.sonda_cond,
        so.sonda_DOsat,
        so.sonda_DO,
        so.sonda_pH,
        so.sonda_NH4,
        so.sonda_NO3,
        so.sonda_turb,
        so.sonda_chl,
        'offline' AS origem
    FROM tbsimaoffline so
    INNER JOIN tbestacao e ON so.idestacao = e.idestacao
)
-- 3. Pivotamento dos dados (Unpivot / EAV - Entity-Attribute-Value)
SELECT
    dsc.id_registro,
    dsc.datahora,
    dsc.idestacao,
    dsc.nome_estacao,
    dsc.lat,
    dsc.lng,
    dsc.origem,
    -- Coluna de Parâmetro (o que estava na coluna)
    p.nome_parametro,
    -- Coluna de Valor (o valor daquela coluna/parâmetro)
    CASE p.nome_parametro
        WHEN 'tempar' THEN dsc.tempar
        WHEN 'ur' THEN dsc.ur
        WHEN 'pressatm' THEN dsc.pressatm
        WHEN 'radincid' THEN dsc.radincid
        WHEN 'tempag1' THEN dsc.tempag1
        WHEN 'tempag2' THEN dsc.tempag2
        WHEN 'tempag3' THEN dsc.tempag3
        WHEN 'tempag4' THEN dsc.tempag4
        WHEN 'sonda_temp' THEN dsc.sonda_temp
        WHEN 'sonda_cond' THEN dsc.sonda_cond
        WHEN 'sonda_DOsat' THEN dsc.sonda_DOsat
        WHEN 'sonda_DO' THEN dsc.sonda_DO
        WHEN 'sonda_pH' THEN dsc.sonda_pH
        WHEN 'sonda_NH4' THEN dsc.sonda_NH4
        WHEN 'sonda_NO3' THEN dsc.sonda_NO3
        WHEN 'sonda_turb' THEN dsc.sonda_turb
        WHEN 'sonda_chl' THEN dsc.sonda_chl
    END AS valor_medido
FROM dados_sima_consolidado dsc
CROSS JOIN (
    -- Tabela virtual com a lista de todos os parâmetros
    SELECT 'tempar' AS nome_parametro UNION ALL
    SELECT 'ur' UNION ALL
    SELECT 'pressatm' UNION ALL
    SELECT 'radincid' UNION ALL
    SELECT 'tempag1' UNION ALL
    SELECT 'tempag2' UNION ALL
    SELECT 'tempag3' UNION ALL
    SELECT 'tempag4' UNION ALL
    SELECT 'sonda_temp' UNION ALL
    SELECT 'sonda_cond' UNION ALL
    SELECT 'sonda_DOsat' UNION ALL
    SELECT 'sonda_DO' UNION ALL
    SELECT 'sonda_pH' UNION ALL
    SELECT 'sonda_NH4' UNION ALL
    SELECT 'sonda_NO3' UNION ALL
    SELECT 'sonda_turb' UNION ALL
    SELECT 'sonda_chl'
) p
WHERE (
    -- Filtra apenas registros onde o valor do parâmetro não é nulo
    CASE p.nome_parametro
        WHEN 'tempar' THEN dsc.tempar
        WHEN 'ur' THEN dsc.ur
        WHEN 'pressatm' THEN dsc.pressatm
        WHEN 'radincid' THEN dsc.radincid
        WHEN 'tempag1' THEN dsc.tempag1
        WHEN 'tempag2' THEN dsc.tempag2
        WHEN 'tempag3' THEN dsc.tempag3
        WHEN 'tempag4' THEN dsc.tempag4
        WHEN 'sonda_temp' THEN dsc.sonda_temp
        WHEN 'sonda_cond' THEN dsc.sonda_cond
        WHEN 'sonda_DOsat' THEN dsc.sonda_DOsat
        WHEN 'sonda_DO' THEN dsc.sonda_DO
        WHEN 'sonda_pH' THEN dsc.sonda_pH
        WHEN 'sonda_NH4' THEN dsc.sonda_NH4
        WHEN 'sonda_NO3' THEN dsc.sonda_NO3
        WHEN 'sonda_turb' THEN dsc.sonda_turb
        WHEN 'sonda_chl' THEN dsc.sonda_chl
    END
) IS NOT NULL
ORDER BY dsc.nome_estacao, dsc.datahora, p.nome_parametro;