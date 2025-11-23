-- =====================================================
-- BDR-111: View para Exportação Otimizada de Dados Filtrados
-- =====================================================
-- Objetivo: Fornecer uma interface única e otimizada para exportação
--           de dados com filtros aplicados, unificando dados de Furnas,
--           BALCAR e SIMA em formato padronizado.
-- Bancos: Furnas (bdfurnas-campanha), BALCAR (bdbalcar-campanha), SIMA (bdsima)
-- =====================================================

-- Nota: Esta view utiliza UNION para combinar dados de diferentes bancos.
-- Em um ambiente com múltiplos bancos, pode ser necessário criar views
-- separadas por banco ou usar dblink para acessar bancos remotos.

-- =====================================================
-- View para dados FURNAS
-- =====================================================
CREATE OR REPLACE VIEW vw_exportacao_furnas AS
SELECT 
    -- Identificação
    pb.idParametrosBiologicosFisicosAgua AS id_registro,
    'FURNAS' AS tipo_dado,
    'tbparametrosbiologicosfisicosagua' AS tabela_origem,
    
    -- Contexto geográfico
    r.idreservatorio,
    r.nome AS reservatorio_nome,
    COALESCE(s.lat, r.lat) AS latitude,
    COALESCE(s.lng, r.lng) AS longitude,
    s.idsitio,
    s.nome AS sitio_nome,
    NULL::CHAR(6) AS idestacao,
    NULL::VARCHAR(50) AS estacao_nome,
    
    -- Contexto organizacional
    c.idcampanha,
    c.nroCampanha AS numero_campanha,
    c.datainicio AS campanha_data_inicio,
    c.datafim AS campanha_data_fim,
    i.idinstituicao,
    i.nome AS instituicao_nome,
    
    -- Campos temporais
    pb.dataMedida AS data_medicao,
    NULL::TIME AS hora_medicao,
    pb.dataMedida::TIMESTAMP AS datahora_medicao,
    
    -- Parâmetros físicos
    pb.tempagua AS temperatura_agua,
    pb.ph,
    pb.condutividade,
    pb._do AS oxigenio_dissolvido,
    pb.turbidez,
    pb.secchi AS disco_secchi,
    pb.profundidade,
    
    -- Parâmetros biológicos
    pb.clorofilaa,
    pb.biomassabacteria,
    pb.densidadebacteria,
    pb.biomassacarbonototalfito,
    pb.densidadetotalfito,
    pb.biomassazoo,
    pb.densidadetotalzoo,
    
    -- Parâmetros químicos
    pb.doc AS carbono_organico_dissolvido,
    pb.toc AS carbono_organico_total,
    pb.dic AS carbono_inorganico_dissolvido,
    pb.nt AS nitrogenio_total,
    pb.pt AS fosforo_total,
    
    -- Gases
    NULL::FLOAT AS ch4,
    NULL::FLOAT AS co2,
    
    -- Metadados
    'mg/L' AS unidade_temperatura,
    'adimensional' AS unidade_ph,
    'µS/cm' AS unidade_condutividade,
    'mg/L' AS unidade_oxigenio,
    'NTU' AS unidade_turbidez,
    'm' AS unidade_profundidade,
    'µg/L' AS unidade_clorofila,
    'mg/L' AS unidade_carbono,
    'mg/L' AS unidade_nitrogenio,
    'mg/L' AS unidade_fosforo
    
FROM tbparametrosbiologicosfisicosagua pb
INNER JOIN tbsitio s ON pb.idSitio = s.idsitio
INNER JOIN tbreservatorio r ON s.idreservatorio = r.idreservatorio
INNER JOIN tbcampanha c ON pb.idCampanha = c.idcampanha
INNER JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao;

-- =====================================================
-- View para dados BALCAR
-- =====================================================
CREATE OR REPLACE VIEW vw_exportacao_balcar AS
SELECT 
    -- Identificação
    f.idfluxoinpe AS id_registro,
    'BALCAR' AS tipo_dado,
    'tbfluxoinpe' AS tabela_origem,
    
    -- Contexto geográfico
    r.idreservatorio,
    r.nome AS reservatorio_nome,
    COALESCE(s.lat, r.lat) AS latitude,
    COALESCE(s.lng, r.lng) AS longitude,
    s.idsitio,
    s.nome AS sitio_nome,
    NULL::CHAR(6) AS idestacao,
    NULL::VARCHAR(50) AS estacao_nome,
    
    -- Contexto organizacional
    c.idcampanha,
    c.nrocampanha AS numero_campanha,
    c.datainicio AS campanha_data_inicio,
    c.datafim AS campanha_data_fim,
    i.idinstituicao,
    i.nome AS instituicao_nome,
    
    -- Campos temporais
    f.datamedida AS data_medicao,
    NULL::TIME AS hora_medicao,
    f.datamedida::TIMESTAMP AS datahora_medicao,
    
    -- Parâmetros físicos
    f.tempaguameio AS temperatura_agua,
    f.phmeio AS ph,
    f.condutividademeio AS condutividade,
    f.odmeio AS oxigenio_dissolvido,
    NULL::FLOAT AS turbidez,
    NULL::FLOAT AS disco_secchi,
    f.batimetria AS profundidade,
    
    -- Parâmetros biológicos
    NULL::FLOAT AS clorofilaa,
    NULL::FLOAT AS biomassabacteria,
    NULL::FLOAT AS densidadebacteria,
    NULL::FLOAT AS biomassacarbonototalfito,
    NULL::FLOAT AS densidadetotalfito,
    NULL::FLOAT AS biomassazoo,
    NULL::FLOAT AS densidadetotalzoo,
    
    -- Parâmetros químicos
    NULL::FLOAT AS carbono_organico_dissolvido,
    NULL::FLOAT AS carbono_organico_total,
    NULL::FLOAT AS carbono_inorganico_dissolvido,
    NULL::FLOAT AS nitrogenio_total,
    NULL::FLOAT AS fosforo_total,
    
    -- Gases
    f.ch4,
    NULL::FLOAT AS co2,
    
    -- Metadados
    '°C' AS unidade_temperatura,
    'adimensional' AS unidade_ph,
    'mS/cm' AS unidade_condutividade,
    'mg/L' AS unidade_oxigenio,
    NULL::VARCHAR AS unidade_turbidez,
    'm' AS unidade_profundidade,
    NULL::VARCHAR AS unidade_clorofila,
    NULL::VARCHAR AS unidade_carbono,
    NULL::VARCHAR AS unidade_nitrogenio,
    NULL::VARCHAR AS unidade_fosforo
    
FROM tbfluxoinpe f
INNER JOIN tbsitio s ON f.idsitio = s.idsitio
INNER JOIN tbreservatorio r ON s.idreservatorio = r.idreservatorio
INNER JOIN tbcampanha c ON f.idcampanha = c.idcampanha
INNER JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao;

-- =====================================================
-- View para dados SIMA
-- =====================================================
CREATE OR REPLACE VIEW vw_exportacao_sima AS
SELECT 
    -- Identificação
    s.idsima AS id_registro,
    'SIMA' AS tipo_dado,
    'tbsima' AS tabela_origem,
    
    -- Contexto geográfico
    NULL::INTEGER AS idreservatorio,
    NULL::VARCHAR AS reservatorio_nome,
    e.lat AS latitude,
    e.lng AS longitude,
    NULL::INTEGER AS idsitio,
    NULL::VARCHAR AS sitio_nome,
    e.idestacao,
    e.rotulo AS estacao_nome,
    
    -- Contexto organizacional
    NULL::INTEGER AS idcampanha,
    NULL::INTEGER AS numero_campanha,
    NULL::DATE AS campanha_data_inicio,
    NULL::DATE AS campanha_data_fim,
    NULL::INTEGER AS idinstituicao,
    'SIMA' AS instituicao_nome,
    
    -- Campos temporais
    s.datahora::DATE AS data_medicao,
    s.datahora::TIME AS hora_medicao,
    s.datahora AS datahora_medicao,
    
    -- Parâmetros físicos
    s.sonda_temp AS temperatura_agua,
    s.sonda_ph AS ph,
    s.sonda_cond AS condutividade,
    s.sonda_DO AS oxigenio_dissolvido,
    s.sonda_turb AS turbidez,
    NULL::FLOAT AS disco_secchi,
    NULL::FLOAT AS profundidade,
    
    -- Parâmetros biológicos
    s.sonda_chl AS clorofilaa,
    NULL::FLOAT AS biomassabacteria,
    NULL::FLOAT AS densidadebacteria,
    NULL::FLOAT AS biomassacarbonototalfito,
    NULL::FLOAT AS densidadetotalfito,
    NULL::FLOAT AS biomassazoo,
    NULL::FLOAT AS densidadetotalzoo,
    
    -- Parâmetros químicos
    NULL::FLOAT AS carbono_organico_dissolvido,
    NULL::FLOAT AS carbono_organico_total,
    NULL::FLOAT AS carbono_inorganico_dissolvido,
    s.sonda_NH4 AS nitrogenio_total,
    s.sonda_NO3 AS fosforo_total,
    
    -- Gases
    NULL::FLOAT AS ch4,
    s.co2_low AS co2,
    
    -- Metadados
    '°C' AS unidade_temperatura,
    'adimensional' AS unidade_ph,
    'µS/cm' AS unidade_condutividade,
    'mg/L' AS unidade_oxigenio,
    'NTU' AS unidade_turbidez,
    NULL::VARCHAR AS unidade_profundidade,
    'µg/L' AS unidade_clorofila,
    NULL::VARCHAR AS unidade_carbono,
    'mg/L' AS unidade_nitrogenio,
    'mg/L' AS unidade_fosforo
    
FROM tbsima s
INNER JOIN tbestacao e ON s.idestacao = e.idestacao;

-- =====================================================
-- View unificada para exportação (UNION de todos os dados)
-- =====================================================
-- Nota: Em um ambiente com múltiplos bancos PostgreSQL separados,
-- esta view pode não funcionar diretamente. Nesse caso, é necessário:
-- 1. Usar dblink para acessar bancos remotos, ou
-- 2. Criar views separadas por banco e fazer UNION no código da aplicação, ou
-- 3. Usar um banco de dados federado/unificado
--
-- Esta view assume que todos os dados estão no mesmo banco ou
-- que há uma estrutura de banco unificado.
-- =====================================================

CREATE OR REPLACE VIEW vw_exportacao_dados_filtrados AS
SELECT * FROM vw_exportacao_furnas
UNION ALL
SELECT * FROM vw_exportacao_balcar
UNION ALL
SELECT * FROM vw_exportacao_sima;

-- =====================================================
-- Comentários e índices sugeridos para otimização
-- =====================================================
-- Para melhorar a performance da view, recomenda-se criar os seguintes índices:
--
-- FURNAS:
-- CREATE INDEX idx_parametros_data_medida ON tbparametrosbiologicosfisicosagua(dataMedida);
-- CREATE INDEX idx_parametros_reservatorio ON tbparametrosbiologicosfisicosagua(idSitio, idCampanha);
-- CREATE INDEX idx_reservatorio_nome ON tbreservatorio(nome);
--
-- BALCAR:
-- CREATE INDEX idx_fluxoinpe_data_medida ON tbfluxoinpe(datamedida);
-- CREATE INDEX idx_fluxoinpe_sitio_campanha ON tbfluxoinpe(idsitio, idcampanha);
--
-- SIMA:
-- CREATE INDEX idx_sima_datahora ON tbsima(datahora);
-- CREATE INDEX idx_sima_estacao ON tbsima(idestacao);
-- CREATE INDEX idx_estacao_rotulo ON tbestacao(rotulo);
--
-- Exemplo de uso com filtros:
-- SELECT *
-- FROM vw_exportacao_dados_filtrados
-- WHERE reservatorio_nome = 'Furnas'
--     AND data_medicao BETWEEN '2006-01-01' AND '2010-12-31'
--     AND instituicao_nome = 'INPE'
-- ORDER BY datahora_medicao, tipo_dado;
--
-- Exemplo de exportação para CSV:
-- COPY (
--     SELECT *
--     FROM vw_exportacao_dados_filtrados
--     WHERE data_medicao >= '2020-01-01'
-- ) TO '/tmp/dados_exportados.csv' WITH CSV HEADER;

