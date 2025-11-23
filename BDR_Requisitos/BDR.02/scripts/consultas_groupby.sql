-- =====================================================
-- BDR.02 - CONSULTAS COM FUNÇÕES AGRUPADORAS (GROUP BY/HAVING)
-- Requisito: Aplicar funções de agregação combinadas com GROUP BY e HAVING
-- Tema: Aplicação Web para visualização e disseminação de dados limnológicos
-- =====================================================

-- =====================================================
-- CONSULTA 1: Total de campanhas por reservatório
-- =====================================================
-- Objetivo: Contar quantas campanhas foram realizadas em cada reservatório.
-- Retorna: Nome do reservatório e total de campanhas realizadas.
-- Banco: Furnas (bdfurnas-campanha)
-- =====================================================
SELECT 
    r.nome AS reservatorio,
    COUNT(c.idcampanha) AS total_campanhas
FROM tbreservatorio r
INNER JOIN tbcampanha c ON r.idreservatorio = c.idreservatorio
GROUP BY r.idreservatorio, r.nome
ORDER BY total_campanhas DESC, r.nome;

-- =====================================================
-- CONSULTA 2: Média de valores de CH4 por reservatório
-- =====================================================
-- Objetivo: Calcular a média de concentração de metano (CH4) por reservatório.
-- Retorna: Nome do reservatório, média de CH4, valores mínimo e máximo.
-- Banco: BALCAR (bdbalcar-campanha)
-- =====================================================
SELECT 
    r.nome AS reservatorio,
    COUNT(f.idfluxoinpe) AS total_medicoes,
    AVG(f.ch4) AS media_ch4,
    MIN(f.ch4) AS minimo_ch4,
    MAX(f.ch4) AS maximo_ch4,
    STDDEV(f.ch4) AS desvio_padrao_ch4
FROM tbreservatorio r
INNER JOIN tbsitio s ON r.idreservatorio = s.idreservatorio
INNER JOIN tbfluxoinpe f ON s.idsitio = f.idsitio
WHERE f.ch4 IS NOT NULL
GROUP BY r.idreservatorio, r.nome
ORDER BY media_ch4 DESC;

-- =====================================================
-- CONSULTA 3: Estatísticas de temperatura da água por estação
-- =====================================================
-- Objetivo: Calcular estatísticas (média, mínimo, máximo) das temperaturas da água
--           medidas em diferentes profundidades por estação do SIMA.
-- Retorna: Nome da estação e estatísticas de temperatura em 4 profundidades.
-- Banco: SIMA (bdsima)
-- =====================================================
SELECT 
    e.rotulo AS nome_estacao,
    e.lat AS latitude,
    e.lng AS longitude,
    COUNT(s.idsima) AS total_registros,
    AVG(s.tempag1) AS media_temp_agua_1,
    MIN(s.tempag1) AS minimo_temp_agua_1,
    MAX(s.tempag1) AS maximo_temp_agua_1,
    AVG(s.tempag2) AS media_temp_agua_2,
    MIN(s.tempag2) AS minimo_temp_agua_2,
    MAX(s.tempag2) AS maximo_temp_agua_2,
    AVG(s.tempag3) AS media_temp_agua_3,
    MIN(s.tempag3) AS minimo_temp_agua_3,
    MAX(s.tempag3) AS maximo_temp_agua_3,
    AVG(s.tempag4) AS media_temp_agua_4,
    MIN(s.tempag4) AS minimo_temp_agua_4,
    MAX(s.tempag4) AS maximo_temp_agua_4,
    AVG(s.sonda_temp) AS media_temp_sonda,
    MIN(s.sonda_temp) AS minimo_temp_sonda,
    MAX(s.sonda_temp) AS maximo_temp_sonda
FROM tbestacao e
INNER JOIN tbsima s ON e.idestacao = s.idestacao
WHERE s.tempag1 IS NOT NULL OR s.tempag2 IS NOT NULL OR s.tempag3 IS NOT NULL OR s.tempag4 IS NOT NULL
GROUP BY e.idestacao, e.rotulo, e.lat, e.lng
ORDER BY e.rotulo;

-- =====================================================
-- CONSULTA 4: Instituições com mais de 5 campanhas (usando HAVING)
-- =====================================================
-- Objetivo: Identificar instituições que realizaram mais de 5 campanhas de coleta.
-- Retorna: Nome da instituição, total de campanhas e período de atuação.
-- Banco: Furnas (bdfurnas-campanha)
-- =====================================================
SELECT 
    i.nome AS instituicao,
    COUNT(c.idcampanha) AS total_campanhas,
    MIN(c.datainicio) AS primeira_campanha,
    MAX(c.datafim) AS ultima_campanha,
    COUNT(DISTINCT c.idreservatorio) AS total_reservatorios
FROM tbinstituicao i
INNER JOIN tbcampanha c ON i.idinstituicao = c.idinstituicao
GROUP BY i.idinstituicao, i.nome
HAVING COUNT(c.idcampanha) > 5
ORDER BY total_campanhas DESC, i.nome;

-- =====================================================
-- CONSULTA 5: Primeira e última coleta em cada reservatório
-- =====================================================
-- Objetivo: Identificar o período de atividade de coleta em cada reservatório,
--           mostrando a primeira e última data de campanha.
-- Retorna: Nome do reservatório, primeira e última data de coleta, e total de campanhas.
-- Banco: Furnas (bdfurnas-campanha)
-- =====================================================
SELECT 
    r.nome AS reservatorio,
    r.lat AS latitude,
    r.lng AS longitude,
    COUNT(c.idcampanha) AS total_campanhas,
    MIN(c.datainicio) AS primeira_coleta,
    MAX(c.datafim) AS ultima_coleta,
    MAX(c.datafim) - MIN(c.datainicio) AS periodo_atividade_dias
FROM tbreservatorio r
INNER JOIN tbcampanha c ON r.idreservatorio = c.idreservatorio
WHERE c.datainicio IS NOT NULL AND c.datafim IS NOT NULL
GROUP BY r.idreservatorio, r.nome, r.lat, r.lng
ORDER BY primeira_coleta, r.nome;

