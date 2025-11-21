-- =====================================================
-- BDR.01 - CONSULTAS COM JUNÇÃO DE TABELAS (JOINs)
-- Requisito: Aplicar junções entre tabelas no banco de dados
-- Tema: Aplicação Web para visualização e disseminação de dados limnológicos
-- =====================================================

-- =====================================================
-- CONSULTA 1: Parâmetros biológicos coletados por reservatório e instituição
-- =====================================================
-- Objetivo: Relacionar parâmetros biológicos coletados com informações do reservatório,
--           sítio de coleta, campanha e instituição responsável.
-- Retorna: Dados de parâmetros biológicos com contexto completo de localização e organização.
-- Banco: Furnas (bdfurnas-campanha)
-- =====================================================
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
    r.lat AS latitude_reservatorio,
    r.lng AS longitude_reservatorio,
    c.nroCampanha,
    c.datainicio AS data_inicio_campanha,
    c.datafim AS data_fim_campanha,
    i.nome AS nome_instituicao
FROM tbparametrosbiologicosfisicosagua pb
INNER JOIN tbsitio s ON pb.idSitio = s.idsitio
INNER JOIN tbreservatorio r ON s.idreservatorio = r.idreservatorio
INNER JOIN tbcampanha c ON pb.idCampanha = c.idcampanha
INNER JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
ORDER BY r.nome, c.datainicio, pb.dataMedida;

-- =====================================================
-- CONSULTA 2: Fluxos INPE com informações completas de localização
-- =====================================================
-- Objetivo: Relacionar fluxos INPE (metano CH4) com informações completas de localização,
--           incluindo sítio, reservatório, campanha e instituição.
-- Retorna: Dados de fluxo de metano com contexto geográfico e temporal completo.
-- Banco: BALCAR (bdbalcar-campanha)
-- =====================================================
SELECT 
    f.idfluxoinpe,
    f.datamedida,
    f.ch4 AS metano_ch4,
    f.batimetria,
    f.tempar AS temperatura_ar,
    f.tempaguameio AS temperatura_agua_meio,
    f.phmeio AS ph_meio,
    f.odmeio AS oxigenio_dissolvido_meio,
    s.nome AS nome_sitio,
    s.lat AS latitude_sitio,
    s.lng AS longitude_sitio,
    s.descricao AS descricao_sitio,
    r.nome AS nome_reservatorio,
    r.lat AS latitude_reservatorio,
    r.lng AS longitude_reservatorio,
    c.nrocampanha,
    c.datainicio AS data_inicio_campanha,
    c.datafim AS data_fim_campanha,
    i.nome AS nome_instituicao
FROM tbfluxoinpe f
INNER JOIN tbsitio s ON f.idsitio = s.idsitio
INNER JOIN tbreservatorio r ON s.idreservatorio = r.idreservatorio
INNER JOIN tbcampanha c ON f.idcampanha = c.idcampanha
INNER JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
WHERE f.ch4 IS NOT NULL
ORDER BY r.nome, c.datainicio, f.datamedida;

-- =====================================================
-- CONSULTA 3: Dados SIMA com informações da estação e sensores
-- =====================================================
-- Objetivo: Relacionar dados do SIMA (Sistema Integrado de Monitoramento Ambiental) com
--           informações da estação de coleta e metadados dos sensores utilizados.
-- Retorna: Dados de monitoramento contínuo com informações da estação e sensores.
-- Banco: SIMA (bdsima)
-- =====================================================
SELECT 
    s.idsima,
    s.datahora,
    s.tempar AS temperatura_ar,
    s.tempag1 AS temperatura_agua_1,
    s.tempag2 AS temperatura_agua_2,
    s.tempag3 AS temperatura_agua_3,
    s.tempag4 AS temperatura_agua_4,
    s.sonda_temp AS temperatura_sonda,
    s.sonda_ph AS ph_sonda,
    s.sonda_DO AS oxigenio_dissolvido_sonda,
    s.sonda_cond AS condutividade_sonda,
    s.ur AS umidade_relativa,
    s.pressatm AS pressao_atmosferica,
    s.radincid AS radiacao_incidente,
    e.rotulo AS nome_estacao,
    e.idhexadecimal,
    e.lat AS latitude_estacao,
    e.lng AS longitude_estacao,
    e.inicio AS data_inicio_estacao,
    e.fim AS data_fim_estacao,
    ct.nomecampo AS nome_campo,
    ct.rotulo AS rotulo_campo,
    ct.unidademedida AS unidade_medida,
    sen.nome AS nome_sensor,
    sen.fabricante AS fabricante_sensor,
    sen.modelo AS modelo_sensor
FROM tbsima s
INNER JOIN tbestacao e ON s.idestacao = e.idestacao
LEFT JOIN tbcampotabela ct ON s.idestacao = e.idestacao
LEFT JOIN tbsensor sen ON ct.idSensor = sen.idSensor
WHERE s.datahora IS NOT NULL
ORDER BY e.rotulo, s.datahora DESC;

-- =====================================================
-- CONSULTA 4: Campanhas por tabela com metadados completos
-- =====================================================
-- Objetivo: Relacionar campanhas com suas tabelas de dados, incluindo informações da
--           instituição responsável e do reservatório onde foram realizadas.
-- Retorna: Mapeamento completo de campanhas, tabelas, instituições e reservatórios.
-- Banco: Furnas (bdfurnas-campanha)
-- =====================================================
SELECT 
    cpt.idCampanha,
    cpt.idTabela,
    c.nroCampanha,
    c.datainicio AS data_inicio_campanha,
    c.datafim AS data_fim_campanha,
    t.nome AS nome_tabela,
    t.rotulo AS rotulo_tabela,
    t.sitio AS tem_sitio,
    t.campanha AS tem_campanha,
    t.excecao AS excecao_tabela,
    i.nome AS nome_instituicao,
    r.nome AS nome_reservatorio,
    r.lat AS latitude_reservatorio,
    r.lng AS longitude_reservatorio
FROM tbcampanhaportabela cpt
INNER JOIN tbcampanha c ON cpt.idCampanha = c.idcampanha
INNER JOIN tbtabela t ON cpt.idTabela = t.idTabela
INNER JOIN tbinstituicao i ON t.idInstituicao = i.idinstituicao
INNER JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
ORDER BY r.nome, c.datainicio, t.nome;

-- =====================================================
-- CONSULTA 5: Fluxos difusivos com dados ambientais correlacionados
-- =====================================================
-- Objetivo: Relacionar fluxos difusivos de gases (CH4 e CO2) com dados ambientais como
--           precipitação e condições do reservatório no mesmo período.
-- Retorna: Dados de fluxo difusivo enriquecidos com contexto ambiental.
-- Banco: Furnas (bdfurnas-campanha)
-- =====================================================
SELECT 
    fd.idFluxoDifusivo,
    fd.dataMedida,
    fd.horaMedida,
    fd.batimetria,
    fd.intervalo,
    fd.ch4 AS metano_ch4,
    fd.co2 AS dioxido_carbono_co2,
    s.nome AS nome_sitio,
    s.lat AS latitude_sitio,
    s.lng AS longitude_sitio,
    r.nome AS nome_reservatorio,
    r.lat AS latitude_reservatorio,
    r.lng AS longitude_reservatorio,
    c.nroCampanha,
    c.datainicio AS data_inicio_campanha,
    c.datafim AS data_fim_campanha,
    i.nome AS nome_instituicao,
    -- Dados ambientais correlacionados
    dp.precipitacao,
    dr.nivelReservatorio,
    dr.volUtilReservatorio,
    dr.porVolUtilReservatorio,
    dr.geracao,
    dr.vazaoAfluente,
    dr.vazaoDefluente
FROM tbfluxodifusivo fd
INNER JOIN tbsitio s ON fd.idSitio = s.idsitio
INNER JOIN tbreservatorio r ON s.idreservatorio = r.idreservatorio
INNER JOIN tbcampanha c ON fd.idCampanha = c.idcampanha
INNER JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
LEFT JOIN tbdadosprecipitacao dp ON r.idreservatorio = dp.idReservatorio 
    AND DATE(fd.dataMedida) = DATE(dp.dataMedida)
LEFT JOIN tbdadosrepresa dr ON r.idreservatorio = dr.idReservatorio 
    AND DATE(fd.dataMedida) = DATE(dr.dataMedida)
WHERE fd.ch4 IS NOT NULL OR fd.co2 IS NOT NULL
ORDER BY r.nome, fd.dataMedida, s.nome;

