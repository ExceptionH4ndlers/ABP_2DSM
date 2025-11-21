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


CREATE OR REPLACE VIEW vw_furnas_agregado AS
SELECT
    c.idcampanha,
    c.nroCampanha,
    r.idreservatorio,
    r.nome AS reservatorio_nome,
    c.datainicio,
    c.datafim,

    -- AGREGADOS ABIOTICO SUPERFÍCIE
    AVG(a_nt.nt) AS nt_media,
    AVG(a_nt.pt) AS pt_media,
    AVG(a_nt.dic) AS dic_media,

    -- AGREGADOS BIOTICO SUPERFÍCIE
    AVG(bio.clorofilaa) AS clorofila_media,
    AVG(bio.doc) AS doc_media,
    AVG(bio.densidadebacteria) AS dens_bacterias_media,

    -- FLUXOS DIFUSIVOS (FURNAS)
    AVG(fd.ch4) AS fluxo_difusivo_ch4_media,
    AVG(fd.co2) AS fluxo_difusivo_co2_media,

    -- CONCENTRAÇÃO GAS ÁGUA
    AVG(cga.ch4) AS conc_gas_agua_ch4_media,
    AVG(cga.co2) AS conc_gas_agua_co2_media,

    -- CONCENTRAÇÃO GAS SEDIMENTO
    AVG(cgs.ch4) AS conc_gas_sedimento_ch4_media,
    AVG(cgs.co2) AS conc_gas_sedimento_co2_media,

    -- HORIBA
    AVG(ho.tempagua) AS tempagua_media,
    AVG(ho.ph) AS ph_media,
    AVG(ho.condutividade) AS cond_media,

    -- NUTRIENTES SEDIMENTO
    AVG(ns.tc) AS tc_sedimento_media,
    AVG(ns.n2) AS n2_sedimento_media,
    AVG(ns.pt) AS pt_sedimento_media

FROM tbcampanha c
JOIN tbreservatorio r ON r.idreservatorio = c.idreservatorio

LEFT JOIN tbabioticosuperficie a_nt 
    ON a_nt.idcampanha = c.idcampanha

LEFT JOIN tbbioticosuperficie bio
    ON bio.idcampanha = c.idcampanha

LEFT JOIN tbfluxodifusivo fd
    ON fd.idcampanha = c.idcampanha

LEFT JOIN tbconcentracaogasagua cga
    ON cga.idcampanha = c.idcampanha

LEFT JOIN tbconcentracaogassedimento cgs
    ON cgs.idcampanha = c.idcampanha

LEFT JOIN tbhoriba ho
    ON ho.idcampanha = c.idcampanha

LEFT JOIN tbnutrientessedimento ns
    ON ns.idcampanha = c.idcampanha

GROUP BY 
    c.idcampanha, c.nroCampanha,
    r.idreservatorio, r.nome,
    c.datainicio, c.datafim;