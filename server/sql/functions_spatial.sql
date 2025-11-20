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
