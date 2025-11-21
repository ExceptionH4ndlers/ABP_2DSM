-- View: Distâncias entre pontos SIMA, FURNAS e BALCAR

CREATE OR REPLACE VIEW vw_distancias_pontos AS
SELECT 
    e.idestacao,
    e.rotulo AS nome_estacao,
    e.lat AS est_lat,
    e.lng AS est_lng,
    s.idsitio,
    s.nome AS nome_sitio,
    s.lat AS sitio_lat,
    s.lng AS sitio_lng,
    fn_calcular_distancia_haversine(e.lat, e.lng, s.lat, s.lng) AS distancia_km
FROM tbestacao e
CROSS JOIN tbsitio s;

-- View: pontos dentro de raio (exemplo com raio 10km)

CREATE OR REPLACE VIEW vw_pontos_raio AS
SELECT *
FROM fn_pontos_dentro_raio(-21.00, -45.00, 10);