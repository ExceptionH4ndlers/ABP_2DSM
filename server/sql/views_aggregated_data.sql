CREATE OR REPLACE VIEW vw_balcar_agregado AS
SELECT
    c.idcampanha,
    c.nroCampanha,
    r.idreservatorio,
    r.nome AS reservatorio_nome,
    s.idsitio,
    s.nome AS sitio_nome,

    -- Difusivo INPE
    AVG(d.ch4) AS difusivo_ch4_media,
    MIN(d.ch4) AS difusivo_ch4_min,
    MAX(d.ch4) AS difusivo_ch4_max,
    STDDEV(d.ch4) AS difusivo_ch4_stddev,

    AVG(d.co2) AS difusivo_co2_media,
    MIN(d.co2) AS difusivo_co2_min,
    MAX(d.co2) AS difusivo_co2_max,
    STDDEV(d.co2) AS difusivo_co2_stddev,

    -- Bolhas INPE
    AVG(b.ch4) AS bolhas_ch4_media,
    MIN(b.ch4) AS bolhas_ch4_min,
    MAX(b.ch4) AS bolhas_ch4_max,
    STDDEV(b.ch4) AS bolhas_ch4_stddev
FROM tbcampanha c
JOIN tbreservatorio r ON r.idreservatorio = c.idreservatorio
JOIN tbsitio s ON s.idreservatorio = r.idreservatorio
LEFT JOIN tbfluxodifusivoinpe d 
    ON d.idcampanha = c.idcampanha AND d.idsitio = s.idsitio
LEFT JOIN tbfluxobolhasinpe b 
    ON b.idcampanha = c.idcampanha AND b.idsitio = s.idsitio
GROUP BY 
    c.idcampanha, c.nroCampanha,
    r.idreservatorio, r.nome,
    s.idsitio, s.nome;