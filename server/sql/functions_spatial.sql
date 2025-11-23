-- Função de distância Haversine (sem PostGIS)

CREATE OR REPLACE FUNCTION fn_calcular_distancia_haversine(
    lat1 DOUBLE PRECISION,
    lng1 DOUBLE PRECISION,
    lat2 DOUBLE PRECISION,
    lng2 DOUBLE PRECISION
)
RETURNS DOUBLE PRECISION AS $$
DECLARE
    r CONSTANT DOUBLE PRECISION := 6371; -- raio da Terra em KM
    dlat DOUBLE PRECISION;
    dlng DOUBLE PRECISION;
    a DOUBLE PRECISION;
    c DOUBLE PRECISION;
BEGIN
    dlat := radians(lat2 - lat1);
    dlng := radians(lng2 - lng1);

    a := sin(dlat/2)^2 
         + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlng/2)^2;

    c := 2 * atan2(sqrt(a), sqrt(1-a));

    RETURN r * c;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- =====================================================
-- Função: retornar pontos dentro de um raio
-- BDR-109: Atualizada para incluir sítios e estações
-- =====================================================

CREATE OR REPLACE FUNCTION fn_pontos_dentro_raio(
    lat_centro DOUBLE PRECISION,
    lng_centro DOUBLE PRECISION,
    raio_km DOUBLE PRECISION
)
RETURNS TABLE (
    id_ponto TEXT,
    nome_ponto TEXT,
    tipo_ponto TEXT,
    lat DOUBLE PRECISION,
    lng DOUBLE PRECISION,
    distancia_km DOUBLE PRECISION
) AS $$
BEGIN
    RETURN QUERY
    WITH pontos_com_distancia AS (
        -- Sítios (Furnas e BALCAR)
        SELECT 
            s.idsitio::TEXT AS id_ponto,
            s.nome AS nome_ponto,
            'sitio'::TEXT AS tipo_ponto,
            s.lat,
            s.lng,
            fn_calcular_distancia_haversine(lat_centro, lng_centro, s.lat, s.lng) AS distancia
        FROM tbsitio s
        WHERE s.lat IS NOT NULL AND s.lng IS NOT NULL
        
        UNION ALL
        
        -- Estações (SIMA)
        SELECT 
            e.idestacao AS id_ponto,
            COALESCE(e.rotulo, e.idestacao) AS nome_ponto,
            'estacao'::TEXT AS tipo_ponto,
            e.lat,
            e.lng,
            fn_calcular_distancia_haversine(lat_centro, lng_centro, e.lat, e.lng) AS distancia
        FROM tbestacao e
        WHERE e.lat IS NOT NULL AND e.lng IS NOT NULL
    )
    SELECT 
        id_ponto,
        nome_ponto,
        tipo_ponto,
        lat,
        lng,
        distancia
    FROM pontos_com_distancia
    WHERE distancia <= raio_km
    ORDER BY distancia;
END;
$$ LANGUAGE plpgsql STABLE;

-- =====================================================
-- Função de compatibilidade: mantém a assinatura antiga
-- para código que ainda usa id_sitio e nome_sitio
-- =====================================================

CREATE OR REPLACE FUNCTION fn_pontos_dentro_raio_legacy(
    lat_centro DOUBLE PRECISION,
    lng_centro DOUBLE PRECISION,
    raio_km DOUBLE PRECISION
)
RETURNS TABLE (
    id_sitio INTEGER,
    nome_sitio TEXT,
    lat DOUBLE PRECISION,
    lng DOUBLE PRECISION,
    distancia_km DOUBLE PRECISION
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.id_ponto::INTEGER AS id_sitio,
        p.nome_ponto AS nome_sitio,
        p.lat,
        p.lng,
        p.distancia_km
    FROM fn_pontos_dentro_raio(lat_centro, lng_centro, raio_km) p
    WHERE p.tipo_ponto = 'sitio';
END;
$$ LANGUAGE plpgsql STABLE;