import { useState } from "react";
import styled from "styled-components";
import { BookOpen, FileText, Calendar, Hash, Layers, Book, ExternalLink } from "lucide-react";

// Layout base (mesmo estilo usado em SimaPublicacoesPage)
const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
`;

const MainContent = styled.main`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  overflow-x: visible;
`;

const Section = styled.section`
  background: white;
  border-radius: 20px;
  padding: 3rem;
  margin-bottom: 3rem;
  border: 2px solid #e2e8f0;
`;

const SectionTitle = styled.h2`
  font-size: 2.25rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const SectionSubtitle = styled.p`
  font-size: 1.05rem;
  color: #475569;
  margin: 0 0 1.25rem 0;
`;

const PublicationsContainer = styled.div`
  background: #f8fafc;
  border-radius: 16px;
  padding: 1.5rem;
  margin: 1.5rem 0 0 0;
  border: 1px solid #e5e7eb;
  box-shadow:
    0 10px 20px rgba(2, 6, 23, 0.04),
    0 2px 6px rgba(2, 6, 23, 0.04);
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: center;
  flex-wrap: wrap;
`;

const InputWrapper = styled.div`
  position: relative;
  flex: 1;
  min-width: 300px;
`;

const SearchIconLeft = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  padding-left: 2.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: white;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

const FilterChips = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const ToolbarRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

const ClearButton = styled.button`
  background: white;
  border: 1px solid #cbd5e1;
  color: #334155;
  font-weight: 600;
  padding: 0.55rem 0.9rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background: #f1f5f9;
    border-color: #94a3b8;
  }
`;

const FilterChip = styled.button<{ $active?: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  border: 1px solid ${({ $active }) => ($active ? "#1e3a8a" : "#e5e7eb")};
  background: ${({ $active }) => ($active ? "linear-gradient(135deg, #1e3a8a, #3b82f6)" : "white")};
  color: ${({ $active }) => ($active ? "#fff" : "#1f2937")};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: ${({ $active }) =>
    $active ? "0 6px 14px rgba(30, 58, 138, 0.25)" : "0 2px 6px rgba(2, 6, 23, 0.04)"};

  &:hover {
    border-color: #1e40af;
    background: ${({ $active }) =>
      $active ? "linear-gradient(135deg, #1e3a8a, #2563eb)" : "#f8fafc"};
    color: ${({ $active }) => ($active ? "#fff" : "#1e40af")};
  }
`;

const PublicationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 1.25rem;
  margin-top: 1rem;
`;

const PublicationCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.25rem 1.25rem 1rem 1.25rem;
  border: 1px solid #e5e7eb;
  transition: all 0.25s ease;
  position: relative;
  box-shadow:
    0 8px 16px rgba(2, 6, 23, 0.04),
    0 2px 6px rgba(2, 6, 23, 0.04);

  &:hover {
    border-color: #1e40af;
    box-shadow:
      0 16px 30px rgba(30, 64, 175, 0.12),
      0 6px 14px rgba(30, 64, 175, 0.06);
    transform: translateY(-2px);
  }
`;

const AccentBar = styled.div<{ $category: string }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 4px;
  width: 100%;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background: ${({ $category }) => {
    switch ($category) {
      case "artigo":
        return "linear-gradient(90deg, #1e40af, #60a5fa)";
      case "livro":
        return "linear-gradient(90deg, #166534, #34d399)";
      case "capitulo":
        return "linear-gradient(90deg, #d97706, #fbbf24)";
      case "evento":
        return "linear-gradient(90deg, #7c3aed, #c4b5fd)";
      case "tese":
        return "linear-gradient(90deg, #dc2626, #fca5a5)";
      default:
        return "#e5e7eb";
    }
  }};
`;

const PublicationHeader = styled.div`
  margin-bottom: 1rem;
`;

const PublicationCategory = styled.div<{ $category: string }>`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 1rem;
  background: ${({ $category }) => {
    switch ($category) {
      case "artigo":
        return "#f0f9ff";
      case "livro":
        return "#f0fdf4";
      case "capitulo":
        return "#fffbeb";
      case "evento":
        return "#faf5ff";
      case "tese":
        return "#fef2f2";
      default:
        return "#f9fafb";
    }
  }};
  color: ${({ $category }) => {
    switch ($category) {
      case "artigo":
        return "#1e40af";
      case "livro":
        return "#166534";
      case "capitulo":
        return "#d97706";
      case "evento":
        return "#7c3aed";
      case "tese":
        return "#dc2626";
      default:
        return "#374151";
    }
  }};
  border: 1px solid
    ${({ $category }) => {
      switch ($category) {
        case "artigo":
          return "#dbeafe";
        case "livro":
          return "#dcfce7";
        case "capitulo":
          return "#fed7aa";
        case "evento":
          return "#e9d5ff";
        case "tese":
          return "#fecaca";
        default:
          return "#e5e7eb";
      }
    }};
`;

const PublicationTitle = styled.h3`
  font-size: 1.05rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 0.5rem 0;
  line-height: 1.45;
`;

const PublicationAuthors = styled.p`
  color: #475569;
  font-size: 0.9rem;
  margin: 0 0 0.5rem 0;
  line-height: 1.5;
  font-style: italic;
`;

const PublicationDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 0.5rem 0.75rem;
  margin-top: 0.5rem;
  padding-top: 0.75rem;
  border-top: 1px solid #eef2f7;
`;

const PublicationDetail = styled.div`
  color: #475569;
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PublicationCTA = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #1e3a8a;
  background: #eef2ff;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.9rem;
  margin-top: 0.75rem;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  transition: all 0.2s ease;
  box-shadow: none;

  &:hover {
    background: #e0e7ff;
    transform: translateY(-1px);
  }
`;

type Publication = {
  id: number;
  category: string;
  title: string;
  authors: string;
  journal: string | null;
  volume: string | null;
  pages: string | null;
  year: string;
  issn: string | null;
  link: string | null;
};

// Dados extraídos do site original (resumo adaptado)
const publicationsData: Publication[] = [
  // Artigos
  {
    id: 0,
    category: "artigo",
    authors: "ABE, D. S.; ADAMS, D. D.; SIDAGIS-GALLI, C.; CIMBLERIS, A. C. P.; TUNDISI, J. G.",
    title:
      "Carbon gas cycling in the sediments of Serra da Mesa and Manso reservoirs, central Brazil",
    journal:
      "Verhandlungen - Internationale Vereinigung für Theoretische und Angewandte Limnologie, Stuttgart",
    volume: "29",
    pages: "567-572",
    year: "2005",
    issn: null,
    link: null,
  },
  {
    id: 1,
    category: "artigo",
    authors:
      "LIMA, I. B. T.; MAZZI, E. A.; CARVALHO, J. C.; OMETTO, J. P. H. B.; RAMOS, F. M.; STECH, J. L.; NOVO, E. M. L. M.",
    title:
      "Photoacoustic/dynamic chamber method for measuring greenhouse gas fluxes in hydroreservoirs",
    journal:
      "Verhandlungen - Internationale Vereinigung für Theoretische und Angewandte Limnologie, Stuttgart",
    volume: "29",
    pages: "603-606",
    year: "2005",
    issn: null,
    link: "http://www.dsr.inpe.br/hidrosfera/balanco/arquivos/dynamic-chamber-photoacoustic-sensor-2005.pdf",
  },
  {
    id: 2,
    category: "artigo",
    authors:
      "RAMOS, F. M.; LIMA, I. B. T.; ROSA, R. R.; MAZZI, E. A.; CARVALHO, J. C.; RASERA, M. F. F. L.; OMETTO, J. P. H. B.; ASSIREU, A. T.; STECH, J. L.",
    title: "Extreme event dynamics in methane ebullition fluxes from tropical reservoirs",
    journal: "Geophysical Research Letters",
    volume: "33",
    pages: "L21404",
    year: "2006",
    issn: null,
    link: "http://www.dsr.inpe.br/hidrosfera/balanco/arquivos/Extreme_event_dynamics_methane_tropical.pdf",
  },
  {
    id: 3,
    category: "artigo",
    authors: "SANTOS, M. A.; ROSA, L. P.; MATVIENKO, B.; SIKAR, E.; SANTOS, E. O.",
    title: "Gross greenhouse gas fluxes from hydro-power reservoir compared to thermo-power plants",
    journal: "Energy Policy",
    volume: "34(1)",
    pages: "481-488",
    year: "2005",
    issn: null,
    link: "http://www.dsr.inpe.br/hidrosfera/balanco/arquivos/energypolicyhydroversusthermo.pdf",
  },
  {
    id: 4,
    category: "artigo",
    authors:
      "SIKAR, E.; SANTOS, M. A.; MATVIENKO, B.; SILVA, M. B.; ALMEIDA, C. H. E.; SANTOS, E. O.; BENTES JUNIOR, A. P.; ROSA, L. P.",
    title:
      "Greenhouse gases and initial findings on the carbon circulation in two reservoirs and their watersheds",
    journal:
      "Verhandlungen - Internationale Vereinigung für Theoretische und Angewandte Limnologie, Stuttgart",
    volume: "29(2)",
    pages: "573-576",
    year: "2005",
    issn: null,
    link: "http://www.dsr.inpe.br/hidrosfera/balanco/arquivos/greenhouse_gases_initial_findings.pdf",
  },
  {
    id: 5,
    category: "artigo",
    authors:
      "ROLAND, F.; VIDAL, L. O.; PACHECO, F. S.; BARROS, N. O.; ASSIREU, A. T.; OMETTO, J. P. H. B.; CIMBLERIS, A. C. P.; COLE, J. J.",
    title: "Variability of carbon dioxide flux from tropical (Cerrado) hydroelectric reservoirs",
    journal: "Aquatic Sciences",
    volume: "72(3)",
    pages: "283-293",
    year: "2010",
    issn: null,
    link: "http://www.dsr.inpe.br/hidrosfera/balanco/arquivos/VariabilityCarbonDioxideFluxTropical.pdf",
  },
  {
    id: 46,
    category: "artigo",
    authors: "LIMA, I. B. T.; NOVO, E. M. L. M.; STECH, J. L.; LORENZZETTI, J. A.",
    title:
      "The use of remote sensing and automated water quality systems for estimating greenhouse gas emissions from hydroelectric reservoirs",
    journal: "Greenhouse gas emissions from hydropower reservoirs and water quality",
    volume: null,
    pages: "47-65",
    year: "2004",
    issn: null,
    link: null,
  },
  {
    id: 6,
    category: "evento",
    authors:
      "ASSIREU, A. T.; ROLAND, F.; NOVO, E. M. L. M.; BARROS, N. O.; STECH, J. L.; PACHECO, F. S.",
    title:
      "Existe relação entre a complexidade geométrica do entorno dos reservatórios e a variabilidade espacial dos parâmetros limnológicos?",
    journal: "Anais XIII Simpósio Brasileiro de Sensoriamento Remoto, Florianópolis",
    volume: null,
    pages: "3263-3269",
    year: "2007",
    issn: null,
    link: "http://www.dsr.inpe.br/hidrosfera/balanco/arquivos/ComplexidadeGeometricaVariabilidadeEspacial.pdf",
  },
  {
    id: 7,
    category: "tese",
    authors: "ALCÂNTARA, E. H.",
    title:
      "Sensoriamento remoto da temperatura e dos fluxos de calor na superfície da água no reservatório de Itumbiara (GO)",
    journal: "Tese (Doutorado em Sensoriamento Remoto) - Instituto Nacional de Pesquisas Espaciais",
    volume: null,
    pages: "136 p",
    year: "2010",
    issn: null,
    link: "http://mtc-m19.sid.inpe.br/rep/sid.inpe.br/mtc-m19@80/2010/07.26.20.24?languagebutton=pt-BR&searchsite=bibdigital.sid.inpe.br:80",
  },
  {
    id: 8,
    category: "tese",
    authors: "ALCÂNTARA, E. H.",
    title:
      "Análise da turbidez na planície de inundação de Curuaí (PA, Brasil) integrando dados telemétricos e Imagens MODIS/Terra",
    journal:
      "Dissertação (Mestrado em Sensoriamento Remoto) - Instituto Nacional de Pesquisas Espaciais",
    volume: null,
    pages: "217 p",
    year: "2006",
    issn: null,
    link: "http://mtc-m17.sid.inpe.br/rep/sid.inpe.br/mtc-m17@80/2007/02.15.17.09?languagebutton=pt-BR&searchsite=bibdigital.sid.inpe.br:80",
  },
  {
    id: 9,
    category: "tese",
    authors: "CESAR, G. M.",
    title:
      "Caracterização da influência de sistemas frontais sobre a qualidade da água do reservatório de Itumbiara, GO, utilizando dados de sensoriamento remoto e dados in situ",
    journal:
      "Dissertação (Mestrado em Sensoriamento Remoto) - Instituto Nacional de Pesquisas Espaciais",
    volume: null,
    pages: "81 p",
    year: "2011",
    issn: null,
    link: "http://mtc-m19.sid.inpe.br/rep/sid.inpe.br/mtc-m19/2011/09.13.07.48?languagebutton=pt-BR&searchsite=bibdigital.sid.inpe.br:80",
  },
  {
    id: 10,
    category: "tese",
    authors: "NASCIMENTO, R. F. F.",
    title:
      "Utilização de imagens MERIS e dados in situ para a caracterização bio-óptica do reservatório de Itumbiara, GO",
    journal:
      "Dissertação (Mestrado em Sensoriamento Remoto) - Instituto Nacional de Pesquisas Espaciais",
    volume: null,
    pages: "91 p",
    year: "2010",
    issn: null,
    link: "http://mtc-m19.sid.inpe.br/rep/sid.inpe.br/mtc-m19@80/2010/03.15.18.39?languagebutton=pt-BR&searchsite=bibdigital.sid.inpe.br:80",
  },
  {
    id: 11,
    category: "tese",
    authors: "VALÉRIO, A. M.",
    title:
      "O uso do sensoriamento remoto orbital e de superfície para o estudo do comportamento do corpo de água do reservatório de Manso, MT, Brasil",
    journal:
      "Dissertação (Mestrado em Sensoriamento Remoto) - Instituto Nacional de Pesquisas Espaciais",
    volume: null,
    pages: "117 p",
    year: "2009",
    issn: null,
    link: "http://mtc-m18.sid.inpe.br/rep/sid.inpe.br/mtc-m18@80/2009/05.06.19.17?languagebutton=pt-BR&searchsite=bibdigital.sid.inpe.br:80",
  },
  {
    id: 12,
    category: "livro",
    authors: "LIMA, I. B. T.; STECH, J. L.; RAMOS, F. M.",
    title:
      "Satellite ecohydrology and multifractals: perspectives for understanding and dealing with greenhouse gas emissions from hydroreservoirs",
    journal: "Relatório técnico - INPE",
    volume: null,
    pages: null,
    year: "2005",
    issn: null,
    link: "http://www.dsr.inpe.br/hidrosfera/balanco/arquivos/SatelliteEcohydrology.pdf",
  },
  // Capítulos de livros
  {
    id: 13,
    category: "capitulo",
    authors:
      "ABE, D. S.; SIDAGIS-GALLI, C.; ADAMS, D. D.; CIMBLERIS, A. C. P.; BRUM, P. R.; TUNDISI, J. G.; TUNDISI, T. M.; MATSUMURA-TUNDISI, J. E.",
    title:
      "Carbon gas emission from the sediments of reservoirs of different ages in central Brazil",
    journal: "Global Warming and Hydroelectric Reservoirs",
    volume: "1",
    pages: "101-107",
    year: "2005",
    issn: null,
    link: null,
  },
  {
    id: 14,
    category: "capitulo",
    authors:
      "ASSIREU, A. T.; STECH, J. L.; MARINHO, M. M.; CESAR, D. E.; LORENZZETTI, J. A.; FERREIRA, R. M.; PACHECO, F. S.; ROLAND, F.",
    title: "Princípios físicos e químicos a serviço da limnologia - um exercício",
    journal: "Lições de Limnologia",
    volume: null,
    pages: "229-242",
    year: "2005",
    issn: null,
    link: null,
  },
  {
    id: 15,
    category: "capitulo",
    authors: "FERREIRA, R. M.; ROLAND, F.",
    title: "Caminhos do fósforo em ecossistemas aquáticos continentais",
    journal: "Lições de Limnologia",
    volume: null,
    pages: "229-242",
    year: "2005",
    issn: null,
    link: null,
  },
  {
    id: 16,
    category: "capitulo",
    authors: "ROSA, L. P.; SANTOS, M. A.; MATVIENKO, B.; SANTOS, E. O.; SILVA, M. B.; SIKAR, E.",
    title: "Long term monitoring of greenhouse gas emissions at two brazilian hydro reservoirs",
    journal: "Greenhouse Gas Emissions from Hydropower Reservoirs and Water Quality",
    volume: "1",
    pages: "121-136",
    year: "2004",
    issn: null,
    link: null,
  },
  {
    id: 17,
    category: "capitulo",
    authors: "SANTOS, M. A.; MATVIENKO, B.; ROSA, L. P.; SIKAR, E.",
    title: "Carbon dioxide and methane emissions from hydroelectric reservoirs in Brazil",
    journal: "Global Warming and Hydroelectric Reservoirs",
    volume: "1",
    pages: "81-94",
    year: "2005",
    issn: null,
    link: null,
  },
  {
    id: 18,
    category: "capitulo",
    authors: "VIDAL, L. O.; MENDONÇA, R. F.; MARINHO, M. M.; ROLAND, F.",
    title: "Caminhos do carbono em ecossistemas aquáticos continentais",
    journal: "Lições de Limnologia",
    volume: null,
    pages: "193-208",
    year: "2005",
    issn: null,
    link: null,
  },
  {
    id: 19,
    category: "capitulo",
    authors: "LIMA, I. B. T.; NOVO, E. M. L. M.; STECH, J. L.; LORENZZETTI, J. A.",
    title:
      "The use of remote sensing and automated water quality systems for estimating greenhouse gas emissions from hydroelectric reservoirs",
    journal: "Greenhouse gas emissions from hydropower reservoirs and water quality",
    volume: null,
    pages: "47-65",
    year: "2004",
    issn: null,
    link: null,
  },
  // Eventos principais adicionais (sem links)
  {
    id: 20,
    category: "evento",
    authors:
      "ABE, D. S.; SIDAGIS-GALLI, C.; ADAMS, D. D.; TUNDISI, J. G.; MATSUMURA-TUNDISI, T.; TUNDISI, J. E.; CIMBLERIS, A. C. P.; BRUM, P. R.",
    title:
      "Greenhouse gas concentrations and diffusive flux at the sediment-water interface from 5 tropical reservoirs in Brazil: trophic status consideration",
    journal: "ASLO - 2006, Victoria, Canada",
    volume: null,
    pages: null,
    year: "2006",
    issn: null,
    link: null,
  },
  {
    id: 21,
    category: "evento",
    authors:
      "CIMBLERIS, A. C. P.; BRUM, P. R.; SOARES, C. B.; ROLAND, F.; CESAR, D. E.; ROSA, L. P.; SANTOS, M. A.; SIKAR, B. M.; TUNDISI, J. G.; ABE, D. S.",
    title: "Carbon budget in two neotropical reservoirs",
    journal: "ASLO - 2006, Victoria, Canada",
    volume: null,
    pages: null,
    year: "2006",
    issn: null,
    link: null,
  },
  {
    id: 22,
    category: "evento",
    authors:
      "ROLAND, F.; HUSZAR, V. L. M.; BARROS, N. O.; FERREIRA, R. M.; ASSIREU, A. T.; CIMBLERIS, A. C. P.; BRUM, P. R.; COLE, J. J.",
    title: "Contribution of planktonic respiration to greenhouse emissions in tropical reservoirs",
    journal: "SIL - 2007, Montreal, Canada",
    volume: null,
    pages: null,
    year: "2007",
    issn: null,
    link: null,
  },
  {
    id: 23,
    category: "evento",
    authors:
      "CIMBLERIS, A. C. P.; SANTOS, M. A.; MATVIENKO, B.; MOZETO, A.; STECH, J. L.; LIMA, I. B. T.; TUNDISI, J. G.; ABE, D. S.; SIDAGIS-GALLI, C. V.; ROLAND, F.; CESAR, D. E.; BRUM, P. R.",
    title: "Carbon budget in hydroelectric reservoirs of Furnas Centrais Elétricas S.A., Brazil",
    journal: "SIL - 2004, Lahti, Finland",
    volume: null,
    pages: null,
    year: "2004",
    issn: null,
    link: null,
  },
  {
    id: 24,
    category: "evento",
    authors:
      "LIMA, I. B.; RAMOS, F. M.; MAZZI, E. A.; OMETTO, J. P.; RASERA, M. F.; ASSIREU, A. T.; ROSA, R. R.; NOVO, E. M. L. M.; STECH, J. L.",
    title:
      "Management strategies to minimize bacterial methane emission from tropical hydroreservoirs",
    journal: "ASLO - 2006, Victoria, Canada",
    volume: null,
    pages: null,
    year: "2006",
    issn: null,
    link: null,
  },
  {
    id: 25,
    category: "evento",
    authors:
      "RAMOS, F. M.; LIMA, I. B.; MAZZI, E. A.; OMETTO, J. P.; RASERA, M. F.; ASSIREU, A. T.; ROSA, R. R.; STECH, J. L.",
    title: "Extreme event dynamics in methane bubbling from tropical reservoirs",
    journal: "ASLO - 2006, Victoria, Canada",
    volume: null,
    pages: null,
    year: "2006",
    issn: null,
    link: null,
  },
  {
    id: 26,
    category: "evento",
    authors:
      "SANTOS, M. A.; MATVIENKO, B.; ROSA, L. P.; SILVA, C.; COSTA, R. S.; SIKAR, E.; ROCHA, C. H.; SILVA, M. B.; BENTES JUNIOR, A. P.",
    title:
      "Land use-stream carbon fluxes relationship in a small watershed of a tropical hydro reservoir, Brazil",
    journal: "ASLO - 2006, Victoria, Canada",
    volume: null,
    pages: null,
    year: "2006",
    issn: null,
    link: null,
  },
  {
    id: 27,
    category: "evento",
    authors: "LORENZZETTI, J. A.; LIMA, I. B.; ASIREU, A. T.; STECH, J. L.",
    title:
      "The effect of cold fronts over the emission patterns of CO2 and CH4 in Brazilian Tropical Reservoirs",
    journal: "ASLO - 2006, Victoria, Canada",
    volume: null,
    pages: null,
    year: "2006",
    issn: null,
    link: null,
  },
  {
    id: 28,
    category: "evento",
    authors:
      "STECH, J. L.; ASSIREU, A. T.; LORENZETTI, J. L.; NOVO, E. M. L. M.; LIMA, I. B.; RAMOS, F.",
    title:
      "The fitting of weibull pdf for surface winds observed in low latitude Brazilian lakes and hydroeletric reservoirs",
    journal: "ASLO - 2006, Victoria, Canada",
    volume: null,
    pages: null,
    year: "2006",
    issn: null,
    link: null,
  },
  {
    id: 29,
    category: "evento",
    authors: "ABE, D. S.; ADAMS, D. D.; SIDAGIS-GALLI, C.; TUNDISI, J. G.; CIMBLERIS, A. C. P.",
    title:
      "Carbon gas cycling in the sediments of Serra da Mesa and Manso reservoirs, central Brazil",
    journal: "SIL - 2004, Lahti, Finland",
    volume: null,
    pages: null,
    year: "2004",
    issn: null,
    link: null,
  },
  {
    id: 30,
    category: "evento",
    authors: "ADAMS, D. D.",
    title:
      "Theoretical diffusive flux of greenhouse gases (CH4 & CO2) at the sediment-water interface from 24 lakes and reservoirs of different trophic status worldwide",
    journal: "SIL - 2004, Lahti, Finland",
    volume: null,
    pages: null,
    year: "2004",
    issn: null,
    link: null,
  },
  {
    id: 31,
    category: "evento",
    authors: "MATSUMURA-TUNDISI, T.; TUNDISI, J. G.",
    title:
      "Carbon content in the zooplankton populations of Serra da Mesa Reservoir, Tocantins River, Brazil",
    journal: "SIL - 2004, Lahti, Finland",
    volume: null,
    pages: null,
    year: "2004",
    issn: null,
    link: null,
  },
  {
    id: 32,
    category: "evento",
    authors:
      "MATVIENKO, B.; SANTOS, M. A.; SIKAR, E.; SILVA, M. B.; ALMEIDA, C. H. E.; SANTOS, E. O.",
    title: "Methane emission downstream of reservoirs",
    journal: "SIL - 2004, Lahti, Finland",
    volume: null,
    pages: null,
    year: "2004",
    issn: null,
    link: null,
  },
  {
    id: 33,
    category: "evento",
    authors:
      "MAZZI, E. A.; LIMA, I. B. T.; CARVALHO, J. C.; OMETTO, J. P. H. B.; RAMOS, F. M.; STECH, J. L.; NOVO, E. M. L. M.",
    title:
      "Preliminary results of photoacoustic/dynamic chamber technique for measuring greenhouse gas fluxes to the atmosphere from hydroelectric reservoirs in the brazilian savannah, cerrado",
    journal: "SIL - 2004, Lahti, Finland",
    volume: null,
    pages: null,
    year: "2004",
    issn: null,
    link: null,
  },
  {
    id: 34,
    category: "evento",
    authors:
      "SANTOS, M. A.; MATVIENKO, B.; SIKAR, E.; SILVA, M. B.; ALMEIDA, C. H. E.; SANTOS, E. O.",
    title: "Greenhouse gases and the carbon circulation in a reservoir and its watershed",
    journal: "SIL - 2004, Lahti, Finland",
    volume: null,
    pages: null,
    year: "2004",
    issn: null,
    link: null,
  },
  {
    id: 35,
    category: "evento",
    authors: "SIDAGIS-GALLI, C.; ADAMS, D. D.; ABE, D. S.; SIKAR, E.; TUNDISI, J. G.",
    title:
      "Sediment CH4 and CO2 concentrations and diffuse emission fluxes related to limnological factors in the Lobo-Broa reservoir, São Paulo State, Brazil",
    journal: "SIL - 2004, Lahti, Finland",
    volume: null,
    pages: null,
    year: "2004",
    issn: null,
    link: null,
  },
  {
    id: 36,
    category: "evento",
    authors:
      "STECH, J. L.; LIMA, I. B. T.; NOVO, E. M. L. M.; SILVA, C. M.; ASSIREU, A. T.; CARVALHO, J. C.; LORENZZETTI, J. A.; BARBOSA, C. C.; ROSA, R. R.",
    title: "Telemetric monitoring system for ecohydrology applications in aquatic environments",
    journal: "SIL - 2004, Lahti, Finland",
    volume: null,
    pages: null,
    year: "2004",
    issn: null,
    link: null,
  },
  {
    id: 37,
    category: "evento",
    authors:
      "CIMBLERIS, A. C. P.; BRUM, P. R.; SOARES, C. B. P.; ROLAND, F.; ROSA, L. P.; SANTOS, M. A.; MATVIENKO, B.; TUNDISI, J. G.; ABE, D. S.; GALLI, C. S.; STECH, J. L.; NOVO, E. M. L. M.",
    title: "Carbon budget in seven Brazilian hydropower reservoirs",
    journal: "SIL - 2007, Montreal, Canada",
    volume: null,
    pages: null,
    year: "2007",
    issn: null,
    link: null,
  },
  {
    id: 38,
    category: "evento",
    authors:
      "SANTOS, M. A.; ROSA, L. P.; MATVIENKO, B.; DOS SANTOS, E. O.; ROCHA, C. H. E. D’A.; SIKAR, E.; SILVA, M. B.; JUNIOR, A. M. P. B.",
    title: "Greenhouse gas emissions downstream tropical hydroeletric reservoirs",
    journal: "SIL - 2007, Montreal, Canada",
    volume: null,
    pages: null,
    year: "2007",
    issn: null,
    link: null,
  },
  {
    id: 39,
    category: "evento",
    authors:
      "GALLI, C. S.; ABE, D. S.; TUNDISI, J. G.; ADAMS, D. D.; TUNDISI, T. M.; TUNDISI, J. E.; BRUM, P. R.; CIMBLERIS, A. C. P.",
    title:
      "Greenhouse gas concentrations and diffusive flux at the sediment-water interface from two reservoirs in Brazil",
    journal: "SIL - 2007, Montreal, Canada",
    volume: null,
    pages: null,
    year: "2007",
    issn: null,
    link: null,
  },
  {
    id: 40,
    category: "evento",
    authors:
      "LIMA, I. B. T.; CIMBLERIS, A. C. P.; MAZZI, E. A.; NOVO, E. M. L. M.; OMETTO, J. P. H. B.; RAMOS, F. M.; ROSA, R. R.; STECH, J. L.",
    title: "Sunlight effects on diel CO2 and CH4 emissions from a tropical reservoirs",
    journal: "SIL - 2007, Montreal, Canada",
    volume: null,
    pages: null,
    year: "2007",
    issn: null,
    link: null,
  },
  {
    id: 41,
    category: "evento",
    authors: "MATVIENKO, B.; SIKAR, E.; SANTOS, M.; ROSA, L.; SILVA, M.; SANTOS, E.; ROCHA, C.",
    title:
      "Concentrarion profile at the air-water interface and its bearing on mentane flux measurement",
    journal: "SIL - 2007, Montreal, Canada",
    volume: null,
    pages: null,
    year: "2007",
    issn: null,
    link: null,
  },
  {
    id: 42,
    category: "evento",
    authors:
      "ROCHA, C. H. E. D’A.; SANTOS, M. A.; MATVIENKO, B.; ROSA, L. P.; SANTOS, E. O.; SIKAR, E.; SILVA, M. B.; JUNIOR, A. M. P. B.",
    title: "Evaluation of dissolved carbon dioxide and methane at three tropical hydroelectric",
    journal: "SIL - 2007, Montreal, Canada",
    volume: null,
    pages: null,
    year: "2007",
    issn: null,
    link: null,
  },
  {
    id: 43,
    category: "evento",
    authors:
      "SANTOS, E.; SILVA, C.; MATVIENKO, B.; ROCHA, C. H.; ROSA, L. P.; SIKAR, E.; SILVA, M.; JUNIOR, A. B.",
    title:
      "The importance of land use changes analisys in the greenhouse gas emissions from hydroelectric reservoirs",
    journal: "SIL - 2007, Montreal, Canada",
    volume: null,
    pages: null,
    year: "2007",
    issn: null,
    link: null,
  },
  {
    id: 44,
    category: "evento",
    authors:
      "SIKAR, E.; MATVIENKO, B.; SANTOS, M.; ROSA, L.; SILVA, M.; SANTOS, E.; ROCHA, C.; JUNIOR, A. B.",
    title: "Tropical reservoirs are on average 2.7 times bigger carbon sinks than soils",
    journal: "SIL - 2007, Montreal, Canada",
    volume: null,
    pages: null,
    year: "2007",
    issn: null,
    link: null,
  },
  {
    id: 45,
    category: "evento",
    authors: "SILVA, M.; MATVIENKO, B.; SANTOS, M.; SIKAR, E.; ROSA, L.; SANTOS E.; ROCHA, C.",
    title: "Does methane from hydro-reservoirs fiz out from the water upon turbine discharge?",
    journal: "SIL - 2007, Montreal, Canada",
    volume: null,
    pages: null,
    year: "2007",
    issn: null,
    link: null,
  },
  {
    id: 47,
    category: "evento",
    authors: "ROLAND, F.; VIDAL, L.; COLE, J. J.; CIMBLERIS, A. C. P.",
    title: "Heterotrophic pathways on carbon balance in tropical reservoirs",
    journal: "ASLO - 2006, Victoria, Canada",
    volume: null,
    pages: null,
    year: "2006",
    issn: null,
    link: null,
  },
  {
    id: 48,
    category: "evento",
    authors:
      "ROLAND, F.; BRUM, P. R.; SOARES, C. B.; CESAR, D. E.; ROSA, L. P.; SANTOS, M. A.; SIKAR, B. M.; TUNDISI, J. G.; ABE, D. S.; STECH, J. L.; NOVO, E. M. L. M.",
    title: "Carbon budget in two neotropical reservoirs",
    journal: "ASLO - 2006, Victoria, Canada",
    volume: null,
    pages: null,
    year: "2006",
    issn: null,
    link: null,
  },
  {
    id: 49,
    category: "evento",
    authors:
      "ABE, D. S.; ADAMS, D. D.; SIDAGIS-GALLI, C.; TUNDISI, J. G.; CIMBLERIS, A. C. P.; BRUM, P. R.",
    title:
      "Trophic classifications between temperate and tropical aquatic ecosystems: is such terminology unrealistic for sedimentary carbon cycling?",
    journal: "11th World Lakes Conference - Abstracts Volume, Nairobi",
    volume: "1",
    pages: "105-105",
    year: "2005",
    issn: null,
    link: null,
  },
  {
    id: 50,
    category: "evento",
    authors:
      "CIMBLERIS, A. C. P.; SANTOS, M. A.; MATVIENKO, B.; STECH, J. L.; LIMA, I. B. T.; TUNDISI, J. G.; ABE, D. S.; SIDAGIS-GALLI, C. V.; ROLAND, F.; CESAR, D. E.; BRUM, P. R.",
    title: "Carbon budget in hydroelectric reservoirs of FURNAS Centrais Elétricas, Brazil",
    journal: "Proceedings of the International Association of Theoretical and Applied Limnology",
    volume: "29",
    pages: "563",
    year: "2005",
    issn: null,
    link: null,
  },
];

function BalcarPublicacoesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const filteredPublications = publicationsData.filter((pub) => {
    const matchesSearch =
      pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (pub.journal ? pub.journal.toLowerCase().includes(searchTerm.toLowerCase()) : false);

    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(pub.category);
    return matchesSearch && matchesCategory;
  });

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case "artigo":
        return "Artigos";
      case "livro":
        return "Relatórios técnicos";
      case "capitulo":
        return "Capítulos de livros";
      case "evento":
        return "Eventos";
      case "tese":
        return "Teses e dissertações";
      default:
        return "Publicação";
    }
  };

  return (
    <PageContainer>
      <MainContent>
        <Section>
          <SectionTitle>
            <BookOpen size={40} /> Publicações Científicas
          </SectionTitle>
          <SectionSubtitle>
            Catálogo de publicações relacionadas ao BALCAR com filtros e busca.
          </SectionSubtitle>

          <PublicationsContainer>
            <ToolbarRow>
              <SearchContainer>
                <InputWrapper>
                  <SearchIconLeft>
                    <FileText size={18} />
                  </SearchIconLeft>
                  <SearchInput
                    type="text"
                    placeholder="Buscar por título, autor ou revista..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputWrapper>
              </SearchContainer>
              <ClearButton onClick={clearFilters}>Limpar filtros</ClearButton>
            </ToolbarRow>

            <FilterChips>
              {[
                { key: "artigo", label: "Artigos" },
                { key: "livro", label: "Relatórios técnicos" },
                { key: "capitulo", label: "Capítulos de livros" },
                { key: "evento", label: "Eventos" },
                { key: "tese", label: "Teses e dissertações" },
              ].map((c) => (
                <FilterChip
                  key={c.key}
                  $active={selectedCategories.includes(c.key)}
                  onClick={() => toggleCategory(c.key)}
                >
                  {c.label} ({publicationsData.filter((p) => p.category === c.key).length})
                </FilterChip>
              ))}
            </FilterChips>

            <PublicationsGrid>
              {filteredPublications.map((publication) => (
                <PublicationCard key={publication.id}>
                  <AccentBar $category={publication.category} />
                  <PublicationHeader>
                    <PublicationCategory $category={publication.category}>
                      {getCategoryName(publication.category)}
                    </PublicationCategory>
                    <PublicationTitle>{publication.title}</PublicationTitle>
                    <PublicationAuthors>{publication.authors}</PublicationAuthors>
                  </PublicationHeader>

                  <PublicationDetails>
                    {publication.journal && (
                      <PublicationDetail>
                        <Book size={16} /> {publication.journal}
                      </PublicationDetail>
                    )}
                    {publication.volume && (
                      <PublicationDetail>
                        <Layers size={16} /> Volume: {publication.volume}
                      </PublicationDetail>
                    )}
                    {publication.pages && (
                      <PublicationDetail>
                        <FileText size={16} /> Páginas: {publication.pages}
                      </PublicationDetail>
                    )}
                    <PublicationDetail>
                      <Calendar size={16} /> {publication.year}
                    </PublicationDetail>
                    {publication.issn && (
                      <PublicationDetail>
                        <Hash size={16} /> ISSN: {publication.issn}
                      </PublicationDetail>
                    )}
                  </PublicationDetails>

                  {publication.link && (
                    <PublicationCTA
                      href={publication.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Acessar publicação <ExternalLink size={16} />
                    </PublicationCTA>
                  )}
                </PublicationCard>
              ))}
            </PublicationsGrid>
          </PublicationsContainer>
        </Section>
      </MainContent>
    </PageContainer>
  );
}

export default BalcarPublicacoesPage;
