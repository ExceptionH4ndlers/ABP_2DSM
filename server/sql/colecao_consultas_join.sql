-- =====================================================
-- COLEÇÃO DE CONSULTAS JOIN - BANCOS BALCAR, FURNAS E SIMA
-- =====================================================
-- Este arquivo contém uma coleção de consultas JOIN
-- baseadas nos relacionamentos identificados nos três bancos de dados
-- =====================================================

-- =====================================================
-- 1. CONSULTAS BÁSICAS - JOIN SIMPLES (2 TABELAS)
-- =====================================================

-- 1.1 BALCAR - Campanhas com informações do reservatório
SELECT 
    c.idcampanha,
    c.nrocampanha,
    c.datainicio,
    c.datafim,
    r.nome AS nome_reservatorio,
    r.lat,
    r.lng
FROM tbcampanha c
INNER JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio;

-- 1.2 BALCAR - Campanhas com informações da instituição
SELECT 
    c.idcampanha,
    c.nrocampanha,
    c.datainicio,
    c.datafim,
    i.nome AS nome_instituicao
FROM tbcampanha c
INNER JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao;

-- 1.3 BALCAR - Sítios com informações do reservatório
SELECT 
    s.idsitio,
    s.nome AS nome_sitio,
    s.lat,
    s.lng,
    s.descricao,
    r.nome AS nome_reservatorio
FROM tbsitio s
INNER JOIN tbreservatorio r ON s.idreservatorio = r.idreservatorio;

-- 1.4 BALCAR - Fluxo INPE com informações da campanha
SELECT 
    f.idfluxoinpe,
    f.datamedida,
    f.ch4,
    f.batimetria,
    f.tempar,
    c.nrocampanha,
    c.datainicio,
    c.datafim
FROM tbfluxoinpe f
INNER JOIN tbcampanha c ON f.idcampanha = c.idcampanha;

-- 1.5 BALCAR - Fluxo INPE com informações do sítio
SELECT 
    f.idfluxoinpe,
    f.datamedida,
    f.ch4,
    f.tempaguameio,
    f.phmeio,
    s.nome AS nome_sitio,
    s.lat,
    s.lng
FROM tbfluxoinpe f
INNER JOIN tbsitio s ON f.idsitio = s.idsitio;

-- 1.6 FURNAS - Campanhas com informações do reservatório
SELECT 
    c.idcampanha,
    c.nroCampanha,
    c.datainicio,
    c.datafim,
    r.nome AS nome_reservatorio,
    r.lat,
    r.lng
FROM tbcampanha c
INNER JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio;

-- 1.7 FURNAS - Campanhas com informações da instituição
SELECT 
    c.idcampanha,
    c.nroCampanha,
    c.datainicio,
    c.datafim,
    i.nome AS nome_instituicao
FROM tbcampanha c
INNER JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao;

-- 1.8 FURNAS - Sítios com informações do reservatório
SELECT 
    s.idsitio,
    s.nome AS nome_sitio,
    s.lat,
    s.lng,
    s.descricao,
    r.nome AS nome_reservatorio
FROM tbsitio s
INNER JOIN tbreservatorio r ON s.idreservatorio = r.idreservatorio;

-- 1.9 FURNAS - Tabelas com informações da instituição
SELECT 
    t.idTabela,
    t.nome AS nome_tabela,
    t.rotulo,
    t.sitio,
    t.campanha,
    i.nome AS nome_instituicao
FROM tbtabela t
INNER JOIN tbinstituicao i ON t.idInstituicao = i.idinstituicao;

-- 1.10 FURNAS - Campos por tabela com informações da tabela
SELECT 
    ct.idCampoPorTabela,
    ct.nome AS nome_campo,
    ct.rotulo,
    ct.unidade,
    ct.descricao,
    ct.principal,
    ct.ordem,
    ct.tipo,
    t.nome AS nome_tabela,
    t.rotulo AS rotulo_tabela
FROM tbcampoportabela ct
INNER JOIN tbtabela t ON ct.idTabela = t.idTabela;

-- 1.11 SIMA - Dados SIMA com informações da estação
SELECT 
    s.idsima,
    s.datahora,
    s.tempar,
    s.tempag1,
    s.tempag2,
    s.sonda_temp,
    s.sonda_ph,
    e.rotulo AS nome_estacao,
    e.lat,
    e.lng
FROM tbsima s
INNER JOIN tbestacao e ON s.idestacao = e.idestacao;

-- 1.12 SIMA - Dados SIMA offline com informações da estação
SELECT 
    so.idsimaoffline,
    so.datahora,
    so.tempar,
    so.tempag1,
    so.sonda_temp,
    so.sonda_ph,
    e.rotulo AS nome_estacao,
    e.lat,
    e.lng
FROM tbsimaoffline so
INNER JOIN tbestacao e ON so.idestacao = e.idestacao;

-- 1.13 SIMA - Campos da tabela com informações do sensor
SELECT 
    ct.idcampotabela,
    ct.nomecampo,
    ct.rotulo,
    ct.unidademedida,
    ct.ordem,
    sen.nome AS nome_sensor,
    sen.fabricante,
    sen.modelo
FROM tbcampotabela ct
INNER JOIN tbsensor sen ON ct.idSensor = sen.idSensor;

-- =====================================================
-- 2. CONSULTAS INTERMEDIÁRIAS - JOIN MÚLTIPLAS (3-4 TABELAS)
-- =====================================================

-- 2.1 BALCAR - Fluxo INPE completo com todas as informações relacionadas
SELECT 
    f.idfluxoinpe,
    f.datamedida,
    f.ch4,
    f.batimetria,
    f.tempar,
    f.tempaguameio,
    f.phmeio,
    s.nome AS nome_sitio,
    s.lat AS lat_sitio,
    s.lng AS lng_sitio,
    r.nome AS nome_reservatorio,
    r.lat AS lat_reservatorio,
    r.lng AS lng_reservatorio,
    c.nrocampanha,
    c.datainicio,
    c.datafim,
    i.nome AS nome_instituicao
FROM tbfluxoinpe f
INNER JOIN tbsitio s ON f.idsitio = s.idsitio
INNER JOIN tbreservatorio r ON s.idreservatorio = r.idreservatorio
INNER JOIN tbcampanha c ON f.idcampanha = c.idcampanha
INNER JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao;

-- 2.2 BALCAR - Campanhas com informações completas
SELECT 
    c.idcampanha,
    c.nrocampanha,
    c.datainicio,
    c.datafim,
    r.nome AS nome_reservatorio,
    r.lat AS lat_reservatorio,
    r.lng AS lng_reservatorio,
    i.nome AS nome_instituicao,
    COUNT(s.idsitio) AS total_sitios,
    COUNT(f.idfluxoinpe) AS total_medicoes
FROM tbcampanha c
INNER JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
INNER JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
LEFT JOIN tbsitio s ON r.idreservatorio = s.idreservatorio
LEFT JOIN tbfluxoinpe f ON s.idsitio = f.idsitio AND c.idcampanha = f.idcampanha
GROUP BY c.idcampanha, c.nrocampanha, c.datainicio, c.datafim, r.nome, r.lat, r.lng, i.nome;

-- 2.3 FURNAS - Parâmetros biológicos com informações completas
SELECT 
    pb.idParametrosBiologicosFisicosAgua,
    pb.dataMedida,
    pb.profundidade,
    pb.tempagua,
    pb.ph,
    pb.clorofilaa,
    pb.biomassabacteria,
    s.nome AS nome_sitio,
    s.lat,
    s.lng,
    r.nome AS nome_reservatorio,
    c.nroCampanha,
    c.datainicio,
    c.datafim,
    i.nome AS nome_instituicao
FROM tbparametrosbiologicosfisicosagua pb
INNER JOIN tbsitio s ON pb.idSitio = s.idsitio
INNER JOIN tbreservatorio r ON s.idreservatorio = r.idreservatorio
INNER JOIN tbcampanha c ON pb.idCampanha = c.idcampanha
INNER JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao;

-- 2.4 FURNAS - Fluxo de carbono com informações completas
SELECT 
    fc.idFluxoCarbono,
    fc.dataMedida,
    fc.horaMedida,
    fc.producaofitoplanctonica,
    fc.carbonoorganicoexcretado,
    fc.respiracaofito,
    fc.producaobacteriana,
    fc.respiracaobacteriana,
    fc.taxasedimentacao,
    s.nome AS nome_sitio,
    s.lat,
    s.lng,
    r.nome AS nome_reservatorio,
    c.nroCampanha,
    c.datainicio,
    c.datafim,
    i.nome AS nome_instituicao
FROM tbfluxocarbono fc
INNER JOIN tbsitio s ON fc.idSitio = s.idsitio
INNER JOIN tbreservatorio r ON s.idreservatorio = r.idreservatorio
INNER JOIN tbcampanha c ON fc.idCampanha = c.idcampanha
INNER JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao;

-- 2.5 FURNAS - Dados de precipitação com informações do reservatório
SELECT 
    dp.idDadosPrecipitacao,
    dp.dataMedida,
    dp.precipitacao,
    r.nome AS nome_reservatorio,
    r.lat,
    r.lng
FROM tbdadosprecipitacao dp
INNER JOIN tbreservatorio r ON dp.idReservatorio = r.idreservatorio;

-- 2.6 FURNAS - Dados da represa com informações do reservatório
SELECT 
    dr.idDadosRepresa,
    dr.dataMedida,
    dr.nivelReservatorio,
    dr.volUtilReservatorio,
    dr.porVolUtilReservatorio,
    dr.geracao,
    dr.vazaoAfluente,
    dr.vazaoDefluente,
    r.nome AS nome_reservatorio,
    r.lat,
    r.lng
FROM tbdadosrepresa dr
INNER JOIN tbreservatorio r ON dr.idReservatorio = r.idreservatorio;

-- 2.7 FURNAS - Campanhas por tabela com informações completas
SELECT 
    cpt.idCampanha,
    cpt.idTabela,
    c.nroCampanha,
    c.datainicio,
    c.datafim,
    t.nome AS nome_tabela,
    t.rotulo AS rotulo_tabela,
    t.sitio,
    t.campanha,
    i.nome AS nome_instituicao,
    r.nome AS nome_reservatorio
FROM tbcampanhaportabela cpt
INNER JOIN tbcampanha c ON cpt.idCampanha = c.idcampanha
INNER JOIN tbtabela t ON cpt.idTabela = t.idTabela
INNER JOIN tbinstituicao i ON t.idInstituicao = i.idinstituicao
INNER JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio;

-- 2.8 SIMA - Dados SIMA com informações completas da estação
SELECT 
    s.idsima,
    s.datahora,
    s.tempar,
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
    e.rotulo AS nome_estacao,
    e.idhexadecimal,
    e.lat,
    e.lng,
    e.inicio,
    e.fim
FROM tbsima s
INNER JOIN tbestacao e ON s.idestacao = e.idestacao;

-- =====================================================
-- 3. CONSULTAS AVANÇADAS - JOIN COMPLEXAS (5+ TABELAS)
-- =====================================================

-- 3.1 FURNAS - Análise completa de fluxos de gases com todas as informações
SELECT 
    fd.idFluxoDifusivo,
    fd.dataMedida,
    fd.horaMedida,
    fd.batimetria,
    fd.ch4,
    fd.co2,
    s.nome AS nome_sitio,
    s.lat AS lat_sitio,
    s.lng AS lng_sitio,
    s.descricao AS descricao_sitio,
    r.nome AS nome_reservatorio,
    r.lat AS lat_reservatorio,
    r.lng AS lng_reservatorio,
    c.nroCampanha,
    c.datainicio,
    c.datafim,
    i.nome AS nome_instituicao,
    -- Dados de precipitação do mesmo período
    dp.precipitacao,
    -- Dados da represa do mesmo período
    dr.nivelReservatorio,
    dr.volUtilReservatorio,
    dr.geracao
FROM tbfluxodifusivo fd
INNER JOIN tbsitio s ON fd.idSitio = s.idsitio
INNER JOIN tbreservatorio r ON s.idreservatorio = r.idreservatorio
INNER JOIN tbcampanha c ON fd.idCampanha = c.idcampanha
INNER JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
LEFT JOIN tbdadosprecipitacao dp ON r.idreservatorio = dp.idReservatorio 
    AND DATE(fd.dataMedida) = DATE(dp.dataMedida)
LEFT JOIN tbdadosrepresa dr ON r.idreservatorio = dr.idReservatorio 
    AND DATE(fd.dataMedida) = DATE(dr.dataMedida);

-- 3.2 FURNAS - Análise completa de parâmetros biológicos com dados ambientais
SELECT 
    pb.idParametrosBiologicosFisicosAgua,
    pb.dataMedida,
    pb.profundidade,
    pb.tempagua,
    pb.ph,
    pb.clorofilaa,
    pb.biomassabacteria,
    pb.densidadebacteria,
    pb.biomassacarbonototalfito,
    pb.densidadetotalfito,
    pb.biomassazoo,
    pb.densidadetotalzoo,
    s.nome AS nome_sitio,
    s.lat,
    s.lng,
    r.nome AS nome_reservatorio,
    c.nroCampanha,
    c.datainicio,
    c.datafim,
    i.nome AS nome_instituicao,
    -- Dados de precipitação
    dp.precipitacao,
    -- Dados da represa
    dr.nivelReservatorio,
    dr.volUtilReservatorio,
    dr.vazaoAfluente,
    dr.vazaoDefluente
FROM tbparametrosbiologicosfisicosagua pb
INNER JOIN tbsitio s ON pb.idSitio = s.idsitio
INNER JOIN tbreservatorio r ON s.idreservatorio = r.idreservatorio
INNER JOIN tbcampanha c ON pb.idCampanha = c.idcampanha
INNER JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
LEFT JOIN tbdadosprecipitacao dp ON r.idreservatorio = dp.idReservatorio 
    AND DATE(pb.dataMedida) = DATE(dp.dataMedida)
LEFT JOIN tbdadosrepresa dr ON r.idreservatorio = dr.idReservatorio 
    AND DATE(pb.dataMedida) = DATE(dr.dataMedida);

-- 3.3 FURNAS - Análise completa de concentrações de gases com dados ambientais
SELECT 
    cga.idConcentracaoGasAgua,
    cga.dataMedida,
    cga.horaMedida,
    cga.batimetria,
    cga.altura,
    cga.replica,
    cga.ch4,
    cga.co2,
    cgs.idConcentracaoGasSedimento,
    cgs.profundidadeDoSedimento,
    cgs.ch4 AS ch4_sedimento,
    cgs.co2 AS co2_sedimento,
    s.nome AS nome_sitio,
    s.lat,
    s.lng,
    r.nome AS nome_reservatorio,
    c.nroCampanha,
    c.datainicio,
    c.datafim,
    i.nome AS nome_instituicao,
    -- Dados ambientais
    dp.precipitacao,
    dr.nivelReservatorio,
    dr.volUtilReservatorio
FROM tbconcentracaogasagua cga
INNER JOIN tbsitio s ON cga.idSitio = s.idsitio
INNER JOIN tbreservatorio r ON s.idreservatorio = r.idreservatorio
INNER JOIN tbcampanha c ON cga.idCampanha = c.idcampanha
INNER JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
LEFT JOIN tbconcentracaogassedimento cgs ON s.idsitio = cgs.idSitio 
    AND c.idcampanha = cgs.idCampanha 
    AND DATE(cga.dataMedida) = DATE(cgs.dataMedida)
LEFT JOIN tbdadosprecipitacao dp ON r.idreservatorio = dp.idReservatorio 
    AND DATE(cga.dataMedida) = DATE(dp.dataMedida)
LEFT JOIN tbdadosrepresa dr ON r.idreservatorio = dr.idReservatorio 
    AND DATE(cga.dataMedida) = DATE(dr.dataMedida);

-- =====================================================
-- 4. CONSULTAS ANALÍTICAS - AGRUPAMENTOS E ESTATÍSTICAS
-- =====================================================

-- 4.1 BALCAR - Estatísticas por reservatório
SELECT 
    r.nome AS nome_reservatorio,
    r.lat,
    r.lng,
    COUNT(DISTINCT c.idcampanha) AS total_campanhas,
    COUNT(DISTINCT s.idsitio) AS total_sitios,
    COUNT(f.idfluxoinpe) AS total_medicoes,
    AVG(f.ch4) AS media_ch4,
    MAX(f.ch4) AS max_ch4,
    MIN(f.ch4) AS min_ch4,
    AVG(f.tempar) AS media_temperatura_ar,
    AVG(f.tempaguameio) AS media_temperatura_agua
FROM tbreservatorio r
LEFT JOIN tbcampanha c ON r.idreservatorio = c.idreservatorio
LEFT JOIN tbsitio s ON r.idreservatorio = s.idreservatorio
LEFT JOIN tbfluxoinpe f ON s.idsitio = f.idsitio
GROUP BY r.idreservatorio, r.nome, r.lat, r.lng;

-- 4.2 FURNAS - Estatísticas por instituição
SELECT 
    i.nome AS nome_instituicao,
    COUNT(DISTINCT c.idcampanha) AS total_campanhas,
    COUNT(DISTINCT r.idreservatorio) AS total_reservatorios,
    COUNT(DISTINCT s.idsitio) AS total_sitios,
    COUNT(DISTINCT t.idTabela) AS total_tabelas,
    MIN(c.datainicio) AS primeira_campanha,
    MAX(c.datafim) AS ultima_campanha
FROM tbinstituicao i
LEFT JOIN tbcampanha c ON i.idinstituicao = c.idinstituicao
LEFT JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
LEFT JOIN tbsitio s ON r.idreservatorio = s.idreservatorio
LEFT JOIN tbtabela t ON i.idinstituicao = t.idInstituicao
GROUP BY i.idinstituicao, i.nome;

-- 4.3 FURNAS - Análise temporal de parâmetros biológicos
SELECT 
    DATE_TRUNC('month', pb.dataMedida) AS mes_ano,
    r.nome AS nome_reservatorio,
    AVG(pb.tempagua) AS media_temperatura_agua,
    AVG(pb.ph) AS media_ph,
    AVG(pb.clorofilaa) AS media_clorofila,
    AVG(pb.biomassabacteria) AS media_biomassa_bacteria,
    AVG(pb.densidadebacteria) AS media_densidade_bacteria,
    COUNT(*) AS total_medicoes
FROM tbparametrosbiologicosfisicosagua pb
INNER JOIN tbsitio s ON pb.idSitio = s.idsitio
INNER JOIN tbreservatorio r ON s.idreservatorio = r.idreservatorio
GROUP BY DATE_TRUNC('month', pb.dataMedida), r.nome
ORDER BY mes_ano, r.nome;

-- 4.4 SIMA - Análise temporal de dados meteorológicos
SELECT 
    DATE_TRUNC('month', s.datahora) AS mes_ano,
    e.rotulo AS nome_estacao,
    AVG(s.tempar) AS media_temperatura_ar,
    AVG(s.ur) AS media_umidade_relativa,
    AVG(s.pressatm) AS media_pressao_atmosferica,
    AVG(s.radincid) AS media_radiacao_incidente,
    AVG(s.tempag1) AS media_temperatura_agua_1,
    AVG(s.tempag2) AS media_temperatura_agua_2,
    COUNT(*) AS total_registros
FROM tbsima s
INNER JOIN tbestacao e ON s.idestacao = e.idestacao
GROUP BY DATE_TRUNC('month', s.datahora), e.rotulo
ORDER BY mes_ano, e.rotulo;

-- 4.5 FURNAS - Comparação entre diferentes tipos de fluxos
SELECT 
    r.nome AS nome_reservatorio,
    s.nome AS nome_sitio,
    DATE_TRUNC('month', fd.dataMedida) AS mes_ano,
    AVG(fd.ch4) AS media_ch4_difusivo,
    AVG(fd.co2) AS media_co2_difusivo,
    AVG(fbi.ch4) AS media_ch4_bolhas_inpe,
    AVG(fbi.ch4_desviopadrao) AS desvio_padrao_ch4_bolhas,
    COUNT(fd.idFluxoDifusivo) AS total_medicoes_difusivo,
    COUNT(fbi.idFluxoBolhasInpe) AS total_medicoes_bolhas
FROM tbreservatorio r
INNER JOIN tbsitio s ON r.idreservatorio = s.idreservatorio
LEFT JOIN tbfluxodifusivo fd ON s.idsitio = fd.idSitio
LEFT JOIN tbfluxobolhasinpe fbi ON s.idsitio = fbi.idSitio 
    AND DATE_TRUNC('month', fd.dataMedida) = DATE_TRUNC('month', fbi.dataMedida)
GROUP BY r.nome, s.nome, DATE_TRUNC('month', fd.dataMedida)
ORDER BY r.nome, s.nome, mes_ano;

-- =====================================================
-- 5. CONSULTAS ESPECIAIS - LEFT JOIN E OUTER JOIN
-- =====================================================

-- 5.1 BALCAR - Todos os reservatórios com suas campanhas (incluindo sem campanhas)
SELECT 
    r.nome AS nome_reservatorio,
    r.lat,
    r.lng,
    c.idcampanha,
    c.nrocampanha,
    c.datainicio,
    c.datafim,
    i.nome AS nome_instituicao
FROM tbreservatorio r
LEFT JOIN tbcampanha c ON r.idreservatorio = c.idreservatorio
LEFT JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
ORDER BY r.nome, c.datainicio;

-- 5.2 FURNAS - Todas as instituições com suas tabelas (incluindo sem tabelas)
SELECT 
    i.nome AS nome_instituicao,
    t.idTabela,
    t.nome AS nome_tabela,
    t.rotulo,
    t.sitio,
    t.campanha,
    COUNT(ct.idCampoPorTabela) AS total_campos
FROM tbinstituicao i
LEFT JOIN tbtabela t ON i.idinstituicao = t.idInstituicao
LEFT JOIN tbcampoportabela ct ON t.idTabela = ct.idTabela
GROUP BY i.idinstituicao, i.nome, t.idTabela, t.nome, t.rotulo, t.sitio, t.campanha
ORDER BY i.nome, t.nome;

-- 5.3 SIMA - Todas as estações com seus dados (incluindo sem dados)
SELECT 
    e.rotulo AS nome_estacao,
    e.lat,
    e.lng,
    e.inicio,
    e.fim,
    COUNT(s.idsima) AS total_registros_sima,
    COUNT(so.idsimaoffline) AS total_registros_offline,
    MIN(s.datahora) AS primeira_medicao,
    MAX(s.datahora) AS ultima_medicao
FROM tbestacao e
LEFT JOIN tbsima s ON e.idestacao = s.idestacao
LEFT JOIN tbsimaoffline so ON e.idestacao = so.idestacao
GROUP BY e.idestacao, e.rotulo, e.lat, e.lng, e.inicio, e.fim
ORDER BY e.rotulo;

-- =====================================================
-- 6. CONSULTAS DE CORRELAÇÃO E ANÁLISE MULTIVARIADA
-- =====================================================

-- 6.1 FURNAS - Correlação entre parâmetros físicos e biológicos
SELECT 
    pb.dataMedida,
    pb.tempagua,
    pb.ph,
    pb.clorofilaa,
    pb.biomassabacteria,
    pb.densidadebacteria,
    pb.biomassacarbonototalfito,
    pb.densidadetotalfito,
    pb.biomassazoo,
    pb.densidadetotalzoo,
    s.nome AS nome_sitio,
    r.nome AS nome_reservatorio,
    -- Dados ambientais para correlação
    dp.precipitacao,
    dr.nivelReservatorio,
    dr.volUtilReservatorio,
    dr.vazaoAfluente,
    dr.vazaoDefluente
FROM tbparametrosbiologicosfisicosagua pb
INNER JOIN tbsitio s ON pb.idSitio = s.idsitio
INNER JOIN tbreservatorio r ON s.idreservatorio = r.idreservatorio
LEFT JOIN tbdadosprecipitacao dp ON r.idreservatorio = dp.idReservatorio 
    AND DATE(pb.dataMedida) = DATE(dp.dataMedida)
LEFT JOIN tbdadosrepresa dr ON r.idreservatorio = dr.idReservatorio 
    AND DATE(pb.dataMedida) = DATE(dr.dataMedida)
WHERE pb.tempagua IS NOT NULL 
    AND pb.ph IS NOT NULL 
    AND pb.clorofilaa IS NOT NULL
ORDER BY pb.dataMedida, s.nome;

-- 6.2 FURNAS - Análise de gases com dados ambientais correlacionados
SELECT 
    fd.dataMedida,
    fd.ch4,
    fd.co2,
    fd.batimetria,
    s.nome AS nome_sitio,
    r.nome AS nome_reservatorio,
    -- Dados ambientais correlacionados
    dp.precipitacao,
    dr.nivelReservatorio,
    dr.volUtilReservatorio,
    dr.vazaoAfluente,
    dr.vazaoDefluente,
    dr.geracao,
    -- Dados biológicos do mesmo período
    pb.tempagua,
    pb.ph,
    pb.clorofilaa,
    pb.biomassabacteria
FROM tbfluxodifusivo fd
INNER JOIN tbsitio s ON fd.idSitio = s.idsitio
INNER JOIN tbreservatorio r ON s.idreservatorio = r.idreservatorio
LEFT JOIN tbdadosprecipitacao dp ON r.idreservatorio = dp.idReservatorio 
    AND DATE(fd.dataMedida) = DATE(dp.dataMedida)
LEFT JOIN tbdadosrepresa dr ON r.idreservatorio = dr.idReservatorio 
    AND DATE(fd.dataMedida) = DATE(dr.dataMedida)
LEFT JOIN tbparametrosbiologicosfisicosagua pb ON s.idsitio = pb.idSitio 
    AND DATE(fd.dataMedida) = DATE(pb.dataMedida)
WHERE fd.ch4 IS NOT NULL AND fd.co2 IS NOT NULL
ORDER BY fd.dataMedida, s.nome;

-- =====================================================
-- 7. CONSULTAS DE PERFORMANCE E OTIMIZAÇÃO
-- =====================================================

-- 7.1 BALCAR - Consulta otimizada com índices sugeridos
-- (Assumindo que existem índices em idreservatorio, idcampanha, idsitio)
SELECT 
    f.idfluxoinpe,
    f.datamedida,
    f.ch4,
    f.tempar,
    s.nome AS nome_sitio,
    r.nome AS nome_reservatorio,
    c.nrocampanha
FROM tbfluxoinpe f
INNER JOIN tbsitio s ON f.idsitio = s.idsitio
INNER JOIN tbreservatorio r ON s.idreservatorio = r.idreservatorio
INNER JOIN tbcampanha c ON f.idcampanha = c.idcampanha
WHERE f.datamedida >= '2011-01-01' 
    AND f.datamedida <= '2011-12-31'
    AND f.ch4 IS NOT NULL
ORDER BY f.datamedida DESC, f.ch4 DESC;

-- 7.2 FURNAS - Consulta otimizada com filtros específicos
SELECT 
    pb.idParametrosBiologicosFisicosAgua,
    pb.dataMedida,
    pb.tempagua,
    pb.ph,
    pb.clorofilaa,
    s.nome AS nome_sitio,
    r.nome AS nome_reservatorio,
    c.nroCampanha
FROM tbparametrosbiologicosfisicosagua pb
INNER JOIN tbsitio s ON pb.idSitio = s.idsitio
INNER JOIN tbreservatorio r ON s.idreservatorio = r.idreservatorio
INNER JOIN tbcampanha c ON pb.idCampanha = c.idcampanha
WHERE pb.dataMedida >= '2006-01-01' 
    AND pb.dataMedida <= '2010-12-31'
    AND pb.tempagua BETWEEN 20 AND 35
    AND pb.ph BETWEEN 6 AND 8
ORDER BY pb.dataMedida DESC, pb.tempagua DESC;

-- 7.3 SIMA - Consulta otimizada com filtros temporais
SELECT 
    s.idsima,
    s.datahora,
    s.tempar,
    s.tempag1,
    s.tempag2,
    s.sonda_temp,
    s.sonda_ph,
    e.rotulo AS nome_estacao
FROM tbsima s
INNER JOIN tbestacao e ON s.idestacao = e.idestacao
WHERE s.datahora >= '2013-01-01' 
    AND s.datahora <= '2013-12-31'
    AND s.tempar IS NOT NULL
    AND s.tempag1 IS NOT NULL
ORDER BY s.datahora DESC, s.tempar DESC;

-- =====================================================
-- 8. CONSULTAS ADICIONAIS - 10 NOVAS CONSULTAS PRÁTICAS
-- =====================================================

-- 8.1 BALCAR - Análise de qualidade da água por profundidade
SELECT 
    f.idfluxoinpe,
    f.datamedida,
    f.batimetria,
    f.tempaguasubsuperficie,
    f.tempaguameio,
    f.tempaguafundo,
    f.phsubsuperficie,
    f.phmeio,
    f.phfundo,
    f.odsubsuperficie,
    f.odmeio,
    f.odfundo,
    s.nome AS nome_sitio,
    r.nome AS nome_reservatorio,
    c.nrocampanha
FROM tbfluxoinpe f
INNER JOIN tbsitio s ON f.idsitio = s.idsitio
INNER JOIN tbreservatorio r ON s.idreservatorio = r.idreservatorio
INNER JOIN tbcampanha c ON f.idcampanha = c.idcampanha
WHERE f.batimetria IS NOT NULL
ORDER BY f.datamedida, s.nome, f.batimetria;

-- 8.2 FURNAS - Comparação entre dados de superfície e coluna d'água
SELECT 
    bs.idBioticoSuperficie,
    bs.dataMedida,
    bs.doc AS doc_superficie,
    bs.toc AS toc_superficie,
    bs.poc AS poc_superficie,
    bs.clorofilaA AS clorofila_superficie,
    bc.idBioticoColuna,
    bc.doc AS doc_coluna,
    bc.toc AS toc_coluna,
    bc.poc AS poc_coluna,
    bc.clorofilaA AS clorofila_coluna,
    s.nome AS nome_sitio,
    r.nome AS nome_reservatorio,
    c.nroCampanha
FROM tbbioticosuperficie bs
INNER JOIN tbsitio s ON bs.idSitio = s.idsitio
INNER JOIN tbreservatorio r ON s.idreservatorio = r.idreservatorio
INNER JOIN tbcampanha c ON bs.idCampanha = c.idcampanha
LEFT JOIN tbbioticocoluna bc ON s.idsitio = bc.idSitio 
    AND c.idcampanha = bc.idCampanha 
    AND DATE(bs.dataMedida) = DATE(bc.dataMedida)
WHERE bs.dataMedida IS NOT NULL
ORDER BY bs.dataMedida, s.nome;

-- 8.3 FURNAS - Análise de gases em bolhas vs difusivos
SELECT 
    b.idBolhas,
    b.dataMedida,
    b.profundidade,
    b.ch4 AS ch4_bolhas,
    b.co2 AS co2_bolhas,
    b.n2o AS n2o_bolhas,
    fd.idFluxoDifusivo,
    fd.ch4 AS ch4_difusivo,
    fd.co2 AS co2_difusivo,
    fd.batimetria,
    s.nome AS nome_sitio,
    r.nome AS nome_reservatorio,
    c.nroCampanha
FROM tbbolhas b
INNER JOIN tbsitio s ON b.idSitio = s.idsitio
INNER JOIN tbreservatorio r ON s.idreservatorio = r.idreservatorio
INNER JOIN tbcampanha c ON b.idCampanha = c.idcampanha
LEFT JOIN tbfluxodifusivo fd ON s.idsitio = fd.idSitio 
    AND c.idcampanha = fd.idCampanha 
    AND DATE(b.dataMedida) = DATE(fd.dataMedida)
WHERE b.dataMedida IS NOT NULL
ORDER BY b.dataMedida, s.nome;

-- 8.4 SIMA - Análise de variação térmica da água
SELECT 
    s.idsima,
    s.datahora,
    s.tempag1,
    s.tempag2,
    s.tempag3,
    s.tempag4,
    (s.tempag1 - s.tempag4) AS gradiente_termico,
    s.tempar,
    s.sonda_temp,
    e.rotulo AS nome_estacao,
    e.lat,
    e.lng
FROM tbsima s
INNER JOIN tbestacao e ON s.idestacao = e.idestacao
WHERE s.tempag1 IS NOT NULL 
    AND s.tempag4 IS NOT NULL
    AND s.tempar IS NOT NULL
ORDER BY s.datahora DESC, e.rotulo;

-- 8.5 FURNAS - Análise de nutrientes no sedimento
SELECT 
    ns.idNutrientesSedimento,
    ns.dataMedida,
    ns.profundidade,
    ns.batimetria,
    ns.n2 AS nitrogenio_sedimento,
    ns.pt AS fosforo_total_sedimento,
    ns.tc AS carbono_total_sedimento,
    pb.tempagua,
    pb.ph,
    pb.clorofilaa,
    s.nome AS nome_sitio,
    r.nome AS nome_reservatorio,
    c.nroCampanha
FROM tbnutrientessedimento ns
INNER JOIN tbsitio s ON ns.idSitio = s.idsitio
INNER JOIN tbreservatorio r ON s.idreservatorio = r.idreservatorio
INNER JOIN tbcampanha c ON ns.idCampanha = c.idcampanha
LEFT JOIN tbparametrosbiologicosfisicosagua pb ON s.idsitio = pb.idSitio 
    AND c.idcampanha = pb.idCampanha 
    AND DATE(ns.dataMedida) = DATE(pb.dataMedida)
WHERE ns.dataMedida IS NOT NULL
ORDER BY ns.dataMedida, s.nome;

-- 8.6 BALCAR - Análise de condutividade por profundidade
SELECT 
    f.idfluxoinpe,
    f.datamedida,
    f.batimetria,
    f.condutividadesubsuperficie,
    f.condutividademeio,
    f.condutividadefundo,
    f.tsdsubsuperficie,
    f.tsdmeio,
    f.tsdfundo,
    f.tempaguasubsuperficie,
    f.tempaguameio,
    f.tempaguafundo,
    s.nome AS nome_sitio,
    r.nome AS nome_reservatorio,
    c.nrocampanha
FROM tbfluxoinpe f
INNER JOIN tbsitio s ON f.idsitio = s.idsitio
INNER JOIN tbreservatorio r ON s.idreservatorio = r.idreservatorio
INNER JOIN tbcampanha c ON f.idcampanha = c.idcampanha
WHERE f.condutividadesubsuperficie IS NOT NULL
ORDER BY f.datamedida, s.nome;

-- 8.7 FURNAS - Análise de câmaras de solo
SELECT 
    cs.idCamaraSolo,
    cs.dataMedida,
    cs.horaMedida,
    cs.ch4 AS ch4_solo,
    cs.co2 AS co2_solo,
    cs.n2o AS n2o_solo,
    cs.tempar,
    cs.tempsolo,
    cs.vento,
    cs.altitude,
    s.nome AS nome_sitio,
    r.nome AS nome_reservatorio,
    c.nroCampanha,
    -- Dados correlacionados da água
    pb.tempagua,
    pb.ph,
    pb.clorofilaa
FROM tbcamarasolo cs
INNER JOIN tbsitio s ON cs.idSitio = s.idsitio
INNER JOIN tbreservatorio r ON s.idreservatorio = r.idreservatorio
INNER JOIN tbcampanha c ON cs.idCampanha = c.idcampanha
LEFT JOIN tbparametrosbiologicosfisicosagua pb ON s.idsitio = pb.idSitio 
    AND c.idcampanha = pb.idCampanha 
    AND DATE(cs.dataMedida) = DATE(pb.dataMedida)
WHERE cs.dataMedida IS NOT NULL
ORDER BY cs.dataMedida, s.nome;

-- 8.8 SIMA - Análise de qualidade da água com sonda
SELECT 
    s.idsima,
    s.datahora,
    s.sonda_temp,
    s.sonda_cond,
    s.sonda_DOsat,
    s.sonda_DO,
    s.sonda_pH,
    s.sonda_NH4,
    s.sonda_NO3,
    s.sonda_turb,
    s.sonda_chl,
    s.sonda_bateria,
    e.rotulo AS nome_estacao,
    e.lat,
    e.lng,
    -- Dados meteorológicos correlacionados
    s.tempar,
    s.ur,
    s.pressatm,
    s.radincid
FROM tbsima s
INNER JOIN tbestacao e ON s.idestacao = e.idestacao
WHERE s.sonda_temp IS NOT NULL 
    AND s.sonda_pH IS NOT NULL
    AND s.sonda_DO IS NOT NULL
ORDER BY s.datahora DESC, e.rotulo;

-- 8.9 FURNAS - Análise de dupla dessorção de água
SELECT 
    dda.idDuplaDessorcaoAgua,
    dda.dataMedida,
    dda.horaMedida,
    dda.profundidade,
    dda.co2,
    dda.o2,
    dda.n2,
    dda.ch4,
    dda.n2o,
    s.nome AS nome_sitio,
    r.nome AS nome_reservatorio,
    c.nroCampanha,
    -- Dados ambientais correlacionados
    dp.precipitacao,
    dr.nivelReservatorio,
    dr.volUtilReservatorio
FROM tbdupladessorcaoagua dda
INNER JOIN tbsitio s ON dda.idSitio = s.idsitio
INNER JOIN tbreservatorio r ON s.idreservatorio = r.idreservatorio
INNER JOIN tbcampanha c ON dda.idCampanha = c.idcampanha
LEFT JOIN tbdadosprecipitacao dp ON r.idreservatorio = dp.idReservatorio 
    AND DATE(dda.dataMedida) = DATE(dp.dataMedida)
LEFT JOIN tbdadosrepresa dr ON r.idreservatorio = dr.idReservatorio 
    AND DATE(dda.dataMedida) = DATE(dr.dataMedida)
WHERE dda.dataMedida IS NOT NULL
ORDER BY dda.dataMedida, s.nome;

-- 8.10 FURNAS - Análise de variáveis físicas e químicas da água
SELECT 
    vfqa.idVariaveisFisicasQuimicasDaAgua,
    vfqa.dataMedida,
    vfqa.horaMedida,
    vfqa.profundidade,
    vfqa.batimetria,
    vfqa.clorofila,
    vfqa.feofitina,
    vfqa.turbidez,
    vfqa.nt AS nitrogenio_total,
    vfqa.pt AS fosforo_total,
    vfqa.tdc AS total_dissolvido_carbono,
    -- Íons principais
    vfqa.na AS sodio,
    vfqa.k AS potassio,
    vfqa.mg AS magnesio,
    vfqa.ca AS calcio,
    vfqa.cl AS cloreto,
    vfqa.sso42 AS sulfato,
    s.nome AS nome_sitio,
    r.nome AS nome_reservatorio,
    c.nroCampanha
FROM tbvariaveisfisicasquimicasdaagua vfqa
INNER JOIN tbsitio s ON vfqa.idSitio = s.idsitio
INNER JOIN tbreservatorio r ON s.idreservatorio = r.idreservatorio
INNER JOIN tbcampanha c ON vfqa.idCampanha = c.idcampanha
WHERE vfqa.dataMedida IS NOT NULL
ORDER BY vfqa.dataMedida, s.nome;
