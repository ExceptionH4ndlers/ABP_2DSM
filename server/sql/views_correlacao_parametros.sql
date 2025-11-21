-- =====================================================
-- BDR-110: View para Correlação entre Parâmetros Limnológicos
-- =====================================================
-- Objetivo: Facilitar análises de correlação entre diferentes parâmetros
--           limnológicos no mesmo ponto e período de coleta.
-- Banco: Furnas (bdfurnas-campanha)
-- =====================================================

CREATE OR REPLACE VIEW vw_correlacao_parametros_limnologicos AS
SELECT 
    -- Identificação e contexto
    pb.idParametrosBiologicosFisicosAgua AS id_registro,
    pb.dataMedida,
    pb.profundidade,
    
    -- Contexto geográfico e organizacional
    r.idreservatorio,
    r.nome AS reservatorio_nome,
    r.lat AS reservatorio_lat,
    r.lng AS reservatorio_lng,
    s.idsitio,
    s.nome AS sitio_nome,
    s.lat AS sitio_lat,
    s.lng AS sitio_lng,
    c.idcampanha,
    c.nroCampanha,
    c.datainicio AS campanha_data_inicio,
    c.datafim AS campanha_data_fim,
    i.idinstituicao,
    i.nome AS instituicao_nome,
    
    -- Parâmetros físicos
    pb.tempagua AS temperatura_agua,
    pb.ph,
    pb.condutividade,
    pb._do AS oxigenio_dissolvido,
    pb.turbidez,
    pb.secchi AS disco_secchi,
    pb.materialemsuspensao,
    
    -- Parâmetros biológicos
    pb.clorofilaa,
    pb.biomassabacteria,
    pb.densidadebacteria,
    pb.biomassacarbonototalfito,
    pb.densidadetotalfito,
    pb.biomassazoo,
    pb.densidadetotalzoo,
    pb.producaofitoplanctonica,
    pb.carbonoorganicoexcretado,
    pb.respiracaofito,
    pb.producaobacteriana,
    pb.respiracaobacteriana,
    pb.taxasedimentacao,
    
    -- Parâmetros químicos
    pb.doc AS carbono_organico_dissolvido,
    pb.toc AS carbono_organico_total,
    pb.poc AS carbono_particulado_organico,
    pb.dic AS carbono_inorganico_dissolvido,
    pb.nt AS nitrogenio_total,
    pb.pt AS fosforo_total,
    pb.delta13c,
    pb.delta15n,
    
    -- Parâmetros ambientais
    pb.intensidadeluminosa,
    
    -- Gases - Fluxo Difusivo
    fd.ch4 AS ch4_fluxo_difusivo,
    fd.co2 AS co2_fluxo_difusivo,
    fd.batimetria AS batimetria_fluxo_difusivo,
    fd.intervalo AS intervalo_fluxo_difusivo,
    
    -- Gases - Bolhas
    b.ch4 AS ch4_bolhas,
    b.co2 AS co2_bolhas,
    b.n2o AS n2o_bolhas,
    b.profundidade AS profundidade_bolhas,
    
    -- Gases - Concentração na Água
    cga.ch4 AS ch4_concentracao_agua,
    cga.co2 AS co2_concentracao_agua,
    cga.batimetria AS batimetria_concentracao_agua,
    cga.altura AS altura_concentracao_agua,
    
    -- Gases - Concentração no Sedimento
    cgs.ch4 AS ch4_concentracao_sedimento,
    cgs.co2 AS co2_concentracao_sedimento,
    cgs.profundidadeDoSedimento AS profundidade_sedimento,
    
    -- Dados ambientais - Precipitação
    dp.precipitacao,
    
    -- Dados ambientais - Represa
    dr.nivelReservatorio,
    dr.volUtilReservatorio,
    dr.porVolUtilReservatorio,
    dr.geracao,
    dr.vazaoAfluente,
    dr.vazaoDefluente,
    dr.produtividade
    
FROM tbparametrosbiologicosfisicosagua pb
INNER JOIN tbsitio s ON pb.idSitio = s.idsitio
INNER JOIN tbreservatorio r ON s.idreservatorio = r.idreservatorio
INNER JOIN tbcampanha c ON pb.idCampanha = c.idcampanha
INNER JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
LEFT JOIN tbfluxodifusivo fd 
    ON fd.idSitio = s.idsitio 
    AND fd.idCampanha = c.idcampanha
    AND DATE(fd.dataMedida) = DATE(pb.dataMedida)
LEFT JOIN tbbolhas b 
    ON b.idSitio = s.idsitio 
    AND b.idCampanha = c.idcampanha
    AND DATE(b.dataMedida) = DATE(pb.dataMedida)
LEFT JOIN tbconcentracaogasagua cga 
    ON cga.idSitio = s.idsitio 
    AND cga.idCampanha = c.idcampanha
    AND DATE(cga.dataMedida) = DATE(pb.dataMedida)
LEFT JOIN tbconcentracaogassedimento cgs 
    ON cgs.idSitio = s.idsitio 
    AND cgs.idCampanha = c.idcampanha
    AND DATE(cgs.dataMedida) = DATE(pb.dataMedida)
LEFT JOIN tbdadosprecipitacao dp 
    ON dp.idReservatorio = r.idreservatorio
    AND DATE(dp.dataMedida) = DATE(pb.dataMedida)
LEFT JOIN tbdadosrepresa dr 
    ON dr.idReservatorio = r.idreservatorio
    AND DATE(dr.dataMedida) = DATE(pb.dataMedida);

-- =====================================================
-- Comentários e índices sugeridos para otimização
-- =====================================================
-- Para melhorar a performance da view, recomenda-se criar os seguintes índices:
--
-- CREATE INDEX idx_parametros_data_medida ON tbparametrosbiologicosfisicosagua(dataMedida);
-- CREATE INDEX idx_parametros_sitio_campanha ON tbparametrosbiologicosfisicosagua(idSitio, idCampanha);
-- CREATE INDEX idx_fluxodifusivo_data_sitio ON tbfluxodifusivo(dataMedida, idSitio);
-- CREATE INDEX idx_bolhas_data_sitio ON tbbolhas(dataMedida, idSitio);
-- CREATE INDEX idx_concentracao_gas_agua_data_sitio ON tbconcentracaogasagua(dataMedida, idSitio);
-- CREATE INDEX idx_dados_precipitacao_data_reservatorio ON tbdadosprecipitacao(dataMedida, idReservatorio);
-- CREATE INDEX idx_dados_represa_data_reservatorio ON tbdadosrepresa(dataMedida, idReservatorio);
--
-- Exemplo de uso para análise de correlação:
-- SELECT 
--     temperatura_agua,
--     ph,
--     clorofilaa,
--     ch4_fluxo_difusivo,
--     precipitacao
-- FROM vw_correlacao_parametros_limnologicos
-- WHERE reservatorio_nome = 'Furnas'
--     AND dataMedida BETWEEN '2006-01-01' AND '2010-12-31'
--     AND temperatura_agua IS NOT NULL
--     AND ph IS NOT NULL
--     AND clorofilaa IS NOT NULL;

