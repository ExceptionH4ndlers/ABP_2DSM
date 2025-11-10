import { useState } from "react";
import styled, { css } from "styled-components";
import { BookOpen, FileText } from "lucide-react";
import FurnasSidebar from "../components/FurnasSidebar";

const FurnasPublicacoesContainer = styled.div`
  min-height: 100vh;
  background: #ffffff;
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.media.lg} {
    flex-direction: row;
  }
`;

const MainContent = styled.main<{ $collapsed: boolean }>`
  flex: 1;
  margin-left: 0;
  padding: 1.5rem 1rem;
  max-width: 100%;
  overflow-x: hidden;
  transition:
    margin-left 0.3s ease,
    max-width 0.3s ease;

  ${({ theme }) => theme.media.sm} {
    padding: 2rem;
  }

  ${({ theme, $collapsed }) => css`
    ${theme.media.lg} {
      margin-left: ${$collapsed ? "80px" : "240px"};
      max-width: ${$collapsed ? "calc(100vw - 80px)" : "calc(100vw - 240px)"};
    }

    ${theme.media.xl} {
      margin-left: ${$collapsed ? "80px" : "280px"};
      max-width: ${$collapsed ? "calc(100vw - 80px)" : "calc(100vw - 280px)"};
    }
  `}
`;

const Section = styled.section`
  background: #ffffff;
  border-radius: 16px;
  padding: 1.75rem 1.25rem;
  margin-bottom: 2rem;
  border: 2px solid rgba(0, 0, 0, 0.1);

  ${({ theme }) => theme.media.sm} {
    border-radius: 18px;
    padding: 2.25rem;
  }

  ${({ theme }) => theme.media.lg} {
    border-radius: 20px;
    padding: 3rem;
    margin-bottom: 3rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #000000;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  ${({ theme }) => theme.media.sm} {
    font-size: 2.25rem;
  }

  ${({ theme }) => theme.media.lg} {
    font-size: 2.5rem;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1rem;
  color: #7f8c8d;
  margin-bottom: 1.5rem;
  line-height: 1.6;

  ${({ theme }) => theme.media.sm} {
    font-size: 1.1rem;
  }

  ${({ theme }) => theme.media.lg} {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
`;

const CategoryTitle = styled.h3`
  font-size: 1.35rem;
  font-weight: 600;
  color: #194378;
  margin: 1.5rem 0 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #194378;

  ${({ theme }) => theme.media.sm} {
    margin: 2rem 0 1rem 0;
    font-size: 1.5rem;
  }
`;

const PublicationItem = styled.div`
  margin-bottom: 1.5rem;
  padding-left: 1rem;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 8px;
    width: 6px;
    height: 6px;
    background: #3399cc;
    border-radius: 50%;
  }

  ${({ theme }) => theme.media.sm} {
    padding-left: 1.5rem;
    margin-bottom: 2rem;
  }
`;

const PublicationTitle = styled.p`
  font-size: 0.95rem;
  color: #194378;
  font-weight: 600;
  margin-bottom: 0.5rem;
  line-height: 1.5;

  a {
    color: #194378;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: #3399cc;
      text-decoration: underline;
    }
  }
`;

const PublicationAuthors = styled.p`
  font-size: 0.9rem;
  color: #3399cc;
  margin-bottom: 0.5rem;
  line-height: 1.4;

  ${({ theme }) => theme.media.lg} {
    font-size: 0.95rem;
  }
`;

const PublicationDetails = styled.p`
  font-size: 0.85rem;
  color: #3399cc;
  margin-bottom: 0;
  line-height: 1.4;
  font-style: italic;

  ${({ theme }) => theme.media.lg} {
    font-size: 0.9rem;
  }
`;

const CongressTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  color: #194378;
  margin: 1.5rem 0 1rem 1.5rem;
`;

const CongressSubtitle = styled.p`
  font-size: 1rem;
  color: #194378;
  margin: 0.5rem 0 1rem 1.5rem;
  font-style: italic;
`;

function FurnasPublicacoesPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  return (
    <FurnasPublicacoesContainer>
      <FurnasSidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        activeItem="publicacoes"
      />

      <MainContent $collapsed={sidebarCollapsed}>
        <Section>
          <SectionTitle>
            <BookOpen size={40} />
            Publicações
          </SectionTitle>
          <SectionSubtitle>
            Produção científica do projeto Balanço de Carbono em Reservatórios Hidrelétricos
          </SectionSubtitle>

          {/* Matérias */}
          <CategoryTitle>
            <FileText size={20} style={{ display: "inline", marginRight: "0.5rem" }} />
            Matérias
          </CategoryTitle>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/lagoa.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                As Muitas Faces de uma Lagoa - Ciência Hoje setembro de 1999
              </a>
            </PublicationTitle>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/RelFProj029.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Capacitação do Setor Elétrico Brasileiro em Relação à Mudança Global do Clima
              </a>
            </PublicationTitle>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/revistaFurnas_341_mcapa.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Energia Renovável e Limpa: Pesquisa revela que hidrelétricas de FURNAS emitem cem
                vezes menos gases de efeito estufa que termelétricas. Revista Furnas de junho de
                2007
              </a>
            </PublicationTitle>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/LD297_pesqui.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                FURNAS inicia pesquisa de balanço de carbono em reservatórios - Linha Direta No 297
                de 14 de junho de 2003
              </a>
            </PublicationTitle>
          </PublicationItem>

          {/* Publicações em Revistas e Livros */}
          <CategoryTitle>
            <FileText size={20} style={{ display: "inline", marginRight: "0.5rem" }} />
            Publicações em Revistas e Livros
          </CategoryTitle>

          <PublicationItem>
            <PublicationTitle>
              Carbon gas emission from the sediments of reservoirs of different ages in central
              Brazil
            </PublicationTitle>
            <PublicationAuthors>
              ABE, D. S.; SIDAGIS-GALLI, C.; ADAMS, D. D.; CIMBLERIS, A. C. P.; BRUM, P. R.;
              TUNDISI, J. G.; TUNDISI, T. M.; MATSUMURA-TUNDISI, J. E.
            </PublicationAuthors>
            <PublicationDetails>
              In: Marco Aurélio dos Santos; Luiz Pinguelli Rosa. (Org.). Global Warming and
              Hydroelectric Reservoirs. 1 ed. Rio de Janeiro: COPPE/UFRJ e Eletrobrás, 2005, v. 1,
              p. 101-107
            </PublicationDetails>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              Carbon gas cycling in the sediments of Serra da Mesa and Manso reservoirs, central
              Brazil
            </PublicationTitle>
            <PublicationAuthors>
              ABE, D. S.; ADAMS, D. D.; SIDAGIS-GALLI, C.; CIMBLERIS, A. C. P.; TUNDISI, J. G.
            </PublicationAuthors>
            <PublicationDetails>
              Verhandlungen - Internationale Vereinigung für Theoretische und Angewandte Limnologie,
              Stuttgart, v. 29, p. 567-572, 2005
            </PublicationDetails>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              Princípios físicos e químicos a serviço da limnologia - um exercício
            </PublicationTitle>
            <PublicationAuthors>
              ASSIREU, A. T.; STECH, J. L.; MARINHO, M. M.; CESAR, D. E.; LORENZZETTI, J. A.;
              FERREIRA, R. M.; PACHECO, F. S.; ROLAND, F.
            </PublicationAuthors>
            <PublicationDetails>
              In: Fábio Roland; Dionéia E. Cesar; Marcelo Marinho. (Org.). Lições de Limnologia. 1
              ed. São Carlos, 2005, p. 229-242
            </PublicationDetails>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              Caminhos do fósforo em ecossistemas aquáticos continentais
            </PublicationTitle>
            <PublicationAuthors>FERREIRA, R. M.; ROLAND, F.</PublicationAuthors>
            <PublicationDetails>
              In: Fábio Roland; Dionéia E. Cesar; Marcelo Marinho. (Org.). Lições de Limnologia. 1
              ed. São Carlos, 2005, p. 229-242
            </PublicationDetails>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              Carbon dioxide and methane fluxes in the littoral zone of a tropical savanna reservoir
              (Corumbá, Brazil)
            </PublicationTitle>
            <PublicationAuthors>
              LIMA, I. B. T.; MAZZI, E. A.; NOVO, E. M. L. M.; OMETTO, J. P. H. B.; MELACK, J. M.;
              RAMOS, F. M.; RASERA, M. F. F. L.; ABE, D. S.; LORENZZETTI, J. A.; ASSIREU, A. T.;
              ROSA, R. R.; ROLAND, F.; CIMBLERIS, A. C. P.; BRUM, P. R.; SOARES, C. B. P.; SOUMIS,
              N.; STECH, J. L.
            </PublicationAuthors>
            <PublicationDetails>
              Submitted to Journal of Geophysical Research - Biogeosciences
            </PublicationDetails>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/dynamic-chamber-photoacoustic-sensor-2005.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Photoacoustic/dynamic chamber method for measuring greenhouse gas fluxes in
                hydroreservoirs
              </a>
            </PublicationTitle>
            <PublicationAuthors>
              LIMA, I. B. T.; MAZZI, E. A.; CARVALHO, J. C.; OMETTO, J. P. H. B.; RAMOS, F. M.;
              STECH, J. L.; NOVO, E. M. L. M.
            </PublicationAuthors>
            <PublicationDetails>
              Verhandlungen - Internationale Vereinigung für Theoretische und Angewandte Limnologie,
              Stuttgart, v. 29, p. 603-606, 2005
            </PublicationDetails>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/SatelliteEcohydrology.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Satellite ecohydrology and multifractals: perspectives for understanding and dealing
                with greenhouse gas emissions from hydroreservoirs
              </a>
            </PublicationTitle>
            <PublicationAuthors>LIMA, I. B. T.; STECH, J. L.; RAMOS, F. M.</PublicationAuthors>
            <PublicationDetails>Relatório técnico - INPE</PublicationDetails>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              The use of remote sensing and automated water quality systems for estimating
              greenhouse gas emissions from hydroelectric reservoirs
            </PublicationTitle>
            <PublicationAuthors>
              LIMA, I. B. T.; NOVO, E. M. L. M.; STECH, J. L.; LORENZZETTI, J. A.
            </PublicationAuthors>
            <PublicationDetails>
              In: Luiz Pinguelli Rosa; Marco Aurélio dos Santos; José Galizia Tundisi. (Org.).
              Greenhouse gas emissions from hydropower reservoirs and water quality. Rio de Janeiro:
              COPPE-UFRJ, 2004, p. 47-65
            </PublicationDetails>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/Extreme_event_dynamics_methane_tropical.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Extreme event dynamics in methane ebullition fluxes from tropical reservoirs
              </a>
            </PublicationTitle>
            <PublicationAuthors>
              RAMOS, F. M.; LIMA, I. B. T.; ROSA, R. R.; MAZZI, E. A.; CARVALHO, J. C.; RASERA, M.
              F. F. L.; OMETTO, J. P. H. B.; ASSIREU, A. T.; STECH, J. L.
            </PublicationAuthors>
            <PublicationDetails>
              Geophysical Research Letters, v. 33, L21404, doi:10.1029/2006GL027943, 2006
            </PublicationDetails>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              Long term monitoring of greenhouse gas emissions at two brazilian hydro reservoirs
            </PublicationTitle>
            <PublicationAuthors>
              ROSA, L. P.; SANTOS, M. A.; MATVIENKO, B.; SANTOS, E. O.; SILVA, M. B.; SIKAR, E.
            </PublicationAuthors>
            <PublicationDetails>
              In: Luiz Pinguelli Rosa; Marco Aurélio dos Santos; José Galízia Tundisi. (Org.).
              Greenhouse Gas Emissions from Hydropower Reservoirs and Water Quality. 1 ed. Rio de
              Janeiro: COPPE/UFRJ, 2004, v. 1, p. 121-136
            </PublicationDetails>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              Carbon dioxide and methane emissions from hydroelectric reservoirs in Brazil
            </PublicationTitle>
            <PublicationAuthors>
              SANTOS, M. A.; MATVIENKO, B.; ROSA, L. P.; SIKAR, E.
            </PublicationAuthors>
            <PublicationDetails>
              In: Marco Aurélio dos Santos; Luiz Pinguelli Rosa. (Org.). Global Warming and
              Hydroelectric Reservoirs. 1 ed. Rio de Janeiro: COPPE/UFRJ, 2005, v. 1, p. 81-94
            </PublicationDetails>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>Global warming and hydroelectric reservoirs</PublicationTitle>
            <PublicationAuthors>Editores: SANTOS, M. A.; ROSA, L. P.</PublicationAuthors>
            <PublicationDetails>
              1. ed. Rio de Janeiro: COPPE/UFRJ, 2005. v. 1. 196 p. (Como um produto do encontro no
              SIL, foi lançado este livro com diversas contribuições dos integrantes do projeto)
            </PublicationDetails>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/energypolicyhydroversusthermo.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Gross greenhouse gas fluxes from hydro-power reservoir compared to thermo-power
                plants
              </a>
            </PublicationTitle>
            <PublicationAuthors>
              SANTOS, M. A.; ROSA, L. P.; MATVIENKO, B.; SIKAR, E.; SANTOS, E. O.
            </PublicationAuthors>
            <PublicationDetails>
              Energy Policy, The Netherlands, v. 34, n. 1, p. 481-488, 2005
            </PublicationDetails>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/1878_IVL29_Sikar[1].pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Greenhouse gases and initial findings on the carbon circulation in two reservoirs
                and their watersheds
              </a>
            </PublicationTitle>
            <PublicationAuthors>
              SIKAR, E.; SANTOS, M. A.; MATVIENKO, B.; SILVA, M. B.; ALMEIDA, C. H. E.; SANTOS, E.
              O.; BENTES JUNIOR, A. P.; ROSA, L. P.
            </PublicationAuthors>
            <PublicationDetails>
              Verhandlungen - Internationale Vereinigung für Theoretische und Angewandte Limnologie,
              Stuttgart, v. 29, n. 2, p. 573-576, 2005
            </PublicationDetails>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              Caminhos do carbono em ecossistemas aquáticos continentais
            </PublicationTitle>
            <PublicationAuthors>
              VIDAL, L. O.; MENDONÇA, R. F.; MARINHO, M. M.; ROLAND, F.
            </PublicationAuthors>
            <PublicationDetails>
              In: Fábio Roland; Dionéia E. Cesar; Marcelo Marinho. (Org.). Lições de Limnologia. 1
              ed. São Carlos: Rima, 2005, p. 193-208
            </PublicationDetails>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/VariabilityCarbonDioxideFluxTropical.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Variability of carbon dioxide flux from tropical (Cerrado) hydroelectric reservoirs
              </a>
            </PublicationTitle>
            <PublicationAuthors>
              ROLAND F.; VIDAL L. O.; PACHECO, F. S.; BARROS, N. O.; ASSIREU, A. T.; OMETTO, J. P.
              H. B.; CIMBLERIS, A. C. P.; COLE, J. J.
            </PublicationAuthors>
            <PublicationDetails>Aquatic Sciences, v. 72, n. 3, p. 283-293, 2010</PublicationDetails>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>Silicon as a permanent-carbon sedimentation tracer</PublicationTitle>
            <PublicationAuthors>
              Sikar E.; Matvienko B.; Santos M. A.; Patchineelam S. R.; Santos E. O.; Silva M. B.;
              Rocha C. H. E. D.; Cimbleris A. C. P.; Rosa L. P.
            </PublicationAuthors>
            <PublicationDetails>Inland Waters, v. 2, n. 3, p. 119-128, 2012</PublicationDetails>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/ComplexidadeGeometricaVariabilidadeEspacial.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Complexidade geométrica e variabilidade espacial de emissões de gases de efeito
                estufa em reservatórios hidrelétricos
              </a>
            </PublicationTitle>
            <PublicationAuthors>
              ABE, D. S.; SIDAGIS-GALLI, C.; ADAMS, D. D.; CIMBLERIS, A. C. P.; BRUM, P. R.;
              TUNDISI, J. G.; TUNDISI, T. M.; MATSUMURA-TUNDISI, J. E.
            </PublicationAuthors>
            <PublicationDetails>
              In: Marco Aurélio dos Santos; Luiz Pinguelli Rosa. (Org.). Global Warming and
              Hydroelectric Reservoirs. 1 ed. Rio de Janeiro: COPPE/UFRJ e Eletrobrás, 2005, v. 1,
              p. 101-107
            </PublicationDetails>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              Carbon gas cycling in the sediments of Serra da Mesa and Manso reservoirs, central
              Brazil
            </PublicationTitle>
            <PublicationAuthors>
              ABE, D. S.; ADAMS, D. D.; SIDAGIS-GALLI, C.; CIMBLERIS, A. C. P.; TUNDISI, J. G.
            </PublicationAuthors>
            <PublicationDetails>
              Verhandlungen - Internationale Vereinigung für Theoretische und Angewandte Limnologie,
              Stuttgart, v. 29, p. 567-572, 2005
            </PublicationDetails>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              Princípios físicos e químicos a serviço da limnologia - um exercício
            </PublicationTitle>
            <PublicationAuthors>
              ASSIREU, A. T.; STECH, J. L.; MARINHO, M. M.; CESAR, D. E.; LORENZZETTI, J. A.;
              FERREIRA, R. M.; PACHECO, F. S.; ROLAND, F.
            </PublicationAuthors>
            <PublicationDetails>
              In: Fábio Roland; Dionéia E. Cesar; Marcelo Marinho. (Org.). Lições de Limnologia. 1
              ed. São Carlos: , 2005, p. 229-242
            </PublicationDetails>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              Caminhos do fósforo em ecossistemas aquáticos continentais
            </PublicationTitle>
            <PublicationAuthors>FERREIRA, R. M.; ROLAND, F.</PublicationAuthors>
            <PublicationDetails>
              In: Fábio Roland; Dionéia E. Cesar; Marcelo Marinho. (Org.). Lições de Limnologia. 1
              ed. São Carlos: , 2005, p. 229-242
            </PublicationDetails>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              Carbon dioxide and methane fluxes in the littoral zone of a tropical savanna reservoir
              (Corumbá, Brazil)
            </PublicationTitle>
            <PublicationAuthors>
              LIMA, I. B. T.; MAZZI, E. A.; NOVO, E. M. L. M.; OMETTO, J. P. H. B.; MELACK, J. M.;
              RAMOS, F. M.; RASERA, M. F. F. L.; ABE, D. S.; LORENZZETTI, J. A.; ASSIREU, A. T.;
              ROSA, R. R.; ROLAND, F.; CIMBLERIS, A. C. P.; BRUM, P. R.; SOARES, C. B. P.; SOUMIS,
              N.; STECH, J. L.
            </PublicationAuthors>
            <PublicationDetails>
              Submitted to Journal of Geophysical Research - Biogeosciences
            </PublicationDetails>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/dynamic-chamber-photoacoustic-sensor-2005.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Photoacoustic/dynamic chamber method for measuring greenhouse gas fluxes in
                hydroreservoirs
              </a>
            </PublicationTitle>
            <PublicationAuthors>
              LIMA, I. B. T.; MAZZI, E. A.; CARVALHO, J. C.; OMETTO, J. P. H. B.; RAMOS, F. M.;
              STECH, J. L.; NOVO, E. M. L. M.
            </PublicationAuthors>
            <PublicationDetails>
              Verhandlungen - Internationale Vereinigung für Theoretische und Angewandte Limnologie,
              Stuttgart, v. 29, p. 603-606, 2005
            </PublicationDetails>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/SatelliteEcohydrology.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Satellite ecohydrology and multifractals: perspectives for understanding and dealing
                with greenhouse gas emissions from hydroreservoirs
              </a>
            </PublicationTitle>
            <PublicationAuthors>LIMA, I. B. T.; STECH, J. L.; RAMOS, F. M.</PublicationAuthors>
            <PublicationDetails>Relatório técnico - INPE</PublicationDetails>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              The use of remote sensing and automated water quality systems for estimating
              greenhouse gas emissions from hydroelectric reservoirs
            </PublicationTitle>
            <PublicationAuthors>
              LIMA, I. B. T.; NOVO, E. M. L. M.; STECH, J. L.; LORENZZETTI, J. A.
            </PublicationAuthors>
            <PublicationDetails>
              In: Luiz Pinguelli Rosa; Marco Aurélio dos Santos; José Galizia Tundisi. (Org.).
              Greenhouse gas emissions from hydropower reservoirs and water quality. Rio de Janeiro:
              COPPE-UFRJ, 2004, p. 47-65
            </PublicationDetails>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/Extreme_event_dynamics_methane_tropical.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Extreme event dynamics in methane ebullition fluxes from tropical reservoirs
              </a>
            </PublicationTitle>
            <PublicationAuthors>
              RAMOS, F. M.; LIMA, I. B. T.; ROSA, R. R.; MAZZI, E. A.; CARVALHO, J. C.; RASERA, M.
              F. F. L.; OMETTO, J. P. H. B.; ASSIREU, A. T.; STECH, J. L.
            </PublicationAuthors>
            <PublicationDetails>
              Geophysical Research Letters, v. 33, L21404, doi:10.1029/2006GL027943, 2006
            </PublicationDetails>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              Long term monitoring of greenhouse gas emissions at two brazilian hydro reservoirs
            </PublicationTitle>
            <PublicationAuthors>
              ROSA, L. P.; SANTOS, M. A.; MATVIENKO, B.; SANTOS, E. O.; SILVA, M. B.; SIKAR, E.
            </PublicationAuthors>
            <PublicationDetails>
              In: Luiz Pinguelli Rosa; Marco Aurélio dos Santos; José Galízia Tundisi. (Org.).
              Greenhouse Gas Emissions from Hydropower Reservoirs and Water Quality. 1 ed. Rio de
              Janeiro: COPPE/UFRJ, 2004, v. 1, p. 121-136
            </PublicationDetails>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              Carbon dioxide and methane emissions from hydroelectric reservoirs in Brazil
            </PublicationTitle>
            <PublicationAuthors>
              SANTOS, M. A.; MATVIENKO, B.; ROSA, L. P.; SIKAR, E.
            </PublicationAuthors>
            <PublicationDetails>
              In: Marco Aurélio dos Santos; Luiz Pinguelli Rosa. (Org.). Global Warming and
              Hydroelectric Reservoirs. 1 ed. Rio de Janeiro: COPPE/UFRJ, 2005, v. 1, p. 81-94
            </PublicationDetails>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>Global warming and hydroelectric reservoirs</PublicationTitle>
            <PublicationAuthors>Editores: SANTOS, M. A.; ROSA, L. P.</PublicationAuthors>
            <PublicationDetails>
              1. ed. Rio de Janeiro: COPPE/UFRJ, 2005. v. 1. 196 p. (Como um produto do encontro no
              SIL, foi lançado este livro com diversas contribuições dos integrantes do projeto)
            </PublicationDetails>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/energypolicyhydroversusthermo.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Gross greenhouse gas fluxes from hydro-power reservoir compared to thermo-power
                plants
              </a>
            </PublicationTitle>
            <PublicationAuthors>
              SANTOS, M. A.; ROSA, L. P.; MATVIENKO, B.; SIKAR, E.; SANTOS, E. O.
            </PublicationAuthors>
            <PublicationDetails>
              Energy Policy, The Netherlands, v. 34, n. 1, p. 481-488, 2005
            </PublicationDetails>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/1878_IVL29_Sikar[1].pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Greenhouse gases and initial findings on the carbon circulation in two reservoirs
                and theis watersheds
              </a>
            </PublicationTitle>
            <PublicationAuthors>
              SIKAR, E.; SANTOS, M. A.; MATVIENKO, B.; SILVA, M. B.; ALMEIDA, C. H. E.; SANTOS, E.
              O.; BENTES JUNIOR, A. P.; ROSA, L. P.
            </PublicationAuthors>
            <PublicationDetails>
              Verhandlungen - Internationale Vereinigung für Theoretische und Angewandte Limnologie,
              Stuttgart, v. 29, n. 2, p. 573-576, 2005
            </PublicationDetails>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              Caminhos do carbono em ecossistemas aquáticos continentais
            </PublicationTitle>
            <PublicationAuthors>
              VIDAL, L. O.; MENDONÇA, R. F.; MARINHO, M. M.; ROLAND, F.
            </PublicationAuthors>
            <PublicationDetails>
              In: Fábio Roland; Dionéia E. Cesar; Marcelo Marinho. (Org.). Lições de Limnologia. 1
              ed. São Carlos: Rima, 2005, p. 193-208
            </PublicationDetails>
          </PublicationItem>

          {/* Participações em Congressos */}
          <CategoryTitle>
            <FileText size={20} style={{ display: "inline", marginRight: "0.5rem" }} />
            Participações em Congressos
          </CategoryTitle>

          <CongressTitle>ASLO - 2006. Victoria, Canada</CongressTitle>

          <PublicationItem>
            <PublicationTitle>
              Greenhouse gas concentrations and diffusive flux at the sediment-water interface from
              5 tropical reservoirs in Brazil: trophic status consideration
            </PublicationTitle>
            <PublicationAuthors>
              ABE, D. S.; SIDAGIS-GALLI, C.; ADAMS, D. D.; TUNDISI, J. G.; MATSUMURA-TUNDISI, T.;
              TUNDISI, J. E.; CIMBLERIS, A. C. P.; BRUM, P. R.
            </PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>Carbon budget in two neotropical reservoirs</PublicationTitle>
            <PublicationAuthors>
              CIMBLERIS, A. C. P.; BRUM, P. R.; SOARES, C. B.; ROLAND, F.; CESAR, D. E.; ROSA, L.
              P.; SANTOS, M. A.; SIKAR, B. M.; TUNDISI, J. G.; ABE, D. S.
            </PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              Management strategies to minimize bacterial methane emission from tropical
              hydroreservoirs
            </PublicationTitle>
            <PublicationAuthors>
              LIMA, I. B.; RAMOS, F. M.; MAZZI, E. A.; OMETTO, J. P.; RASERA, M. F.; ASSIREU, A. T.;
              ROSA, R. R.; NOVO, E. M. L. M.; STECH, J. L.
            </PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              Extreme event dynamics in methane bubbling from tropical reservoirs
            </PublicationTitle>
            <PublicationAuthors>
              RAMOS, F. M.; LIMA, I. B.; MAZZI, E. A.; OMETTO, J. P.; RASERA, M. F.; ASSIREU, A. T.;
              ROSA, R. R.; STECH, J. L.
            </PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              Heterotrophic pathways on carbon balance in tropical reservoirs
            </PublicationTitle>
            <PublicationAuthors>
              ROLAND, F.; VIDAL, L.; COLE, J. J.; CIMBLERIS, A. C. P.
            </PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              Land use-stream carbon fluxes relationship in a small watershed of a tropical hydro
              reservoir, Brazil
            </PublicationTitle>
            <PublicationAuthors>
              SANTOS, M. A.; MATVIENKO, B.; ROSA, L. P.; SILVA, C.; COSTA, R. S.; SIKAR, E.; ROCHA,
              C. H.; SILVA, M. B.; BENTES JUNIOR, A. P.
            </PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              The effect of cold fronts over the emission patterns of CO<sub>2</sub> and CH
              <sub>4</sub> in Brazilian Tropical Reservoirs
            </PublicationTitle>
            <PublicationAuthors>
              LORENZETTI, J. A.; LIMA, I. B.; ASIREU, A. T.; STECH, J. L.
            </PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              The fitting of weibull pdf for surface winds observed in low latitude Brazilian lakes
              and hydroeletric reservoirs
            </PublicationTitle>
            <PublicationAuthors>
              STECH, J. L.; ASSIREU, A. T.; LORENZETTI, J. L.; NOVO, E. M. L. M.; LIMA, I. B.;
              RAMOS, F.
            </PublicationAuthors>
          </PublicationItem>

          <CongressTitle>SIL - 2004. Lahti, Finland</CongressTitle>
          <CongressSubtitle>
            XXIX Congress of the International Association of Theoretical and Applied Limnology
          </CongressSubtitle>

          <PublicationItem>
            <PublicationTitle>
              Carbon gas cycling in the sediments of Serra da Mesa and Manso reservoirs, central
              Brazil
            </PublicationTitle>
            <PublicationAuthors>
              ABE, D. S.; ADAMS, D.D.; SIDAGIS-GALLI, C.; CIMBLERIS, A. C. P.; TUNDISI, J. G.
            </PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              Theoretical diffusive flux of greenhouse gases (CH<sub>4</sub> & CO<sub>2</sub>) at
              the sediment-water interface from 24 lakes and reservoirs of different trophic status
              worldwide
            </PublicationTitle>
            <PublicationAuthors>ADAMS, D. D.</PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              Carbon budget in hydroelectric reservoirs of Furnas Centrais Elétricas S.A., Brazil
            </PublicationTitle>
            <PublicationAuthors>
              CIMBLERIS, A. C. P.; SANTOS, M. A.; MATVIENKO, B.; MOZETO, A.; STECH, J. L.; LIMA, I.
              B. T.; TUNDISI, J. G.; ABE, D. S.; SIDAGIS-GALLI, C. V.; ROLAND, F.; CESAR, D. E.;
              BRUM, P. R.
            </PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              Carbon content in the zooplankton populations of Serra da Mesa Reservoir, Tocantins
              River, Brazil
            </PublicationTitle>
            <PublicationAuthors>MATSUMURA-TUNDISI, T.; TUNDISI, J. G.</PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>Methane emission downstream of reservoirs</PublicationTitle>
            <PublicationAuthors>
              MATVIENKO, B.; SANTOS, M. A.; SIKAR, E.; SILVA, M. B.; ALMEIDA, C. H.E.; SANTOS, E. O.
            </PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              Preliminary results of photoacoustic/dynamic chamber technique for measuring
              greenhouse gas fluxes to the atmosphere from hydroelectric reservoirs in the brazilian
              savannah, cerrado
            </PublicationTitle>
            <PublicationAuthors>
              MAZZI, E. A.; LIMA, I. B. T.; CARVALHO, J. C.; OMETTO, J. P. H. B.; RAMOS, F. M.;
              STECH, J. L.; NOVO, E. M. L. M.
            </PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              Greenhouse gases and the carbon circulation in a reservoir and its watershed
            </PublicationTitle>
            <PublicationAuthors>
              SANTOS, M. A.; MATVIENKO, B.; SIKAR, E.; SILVA, M. B.; ALMEIDA, C. H.E.; SANTOS, E. O.
            </PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              Sediment CH<sub>4</sub> and CO<sub>2</sub> concentrations and diffuse emission fluxes
              related to limnological factors in the Lobo-Broa reservoir, São Paulo State, Brazil
            </PublicationTitle>
            <PublicationAuthors>
              SIDAGIS-GALLI, C.; ADAMS, D. D.; ABE, D. S.; SIKAR, E.; TUNDISI, J. G.
            </PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              Telemetric monitoring system for ecohydrology applications in aquatic environments
            </PublicationTitle>
            <PublicationAuthors>
              STECH, J. L.; LIMA, I. B. T.; NOVO, E. M. L. M.; SILVA, C. M.; ASSIREU, A. T.;
              CARVALHO, J. C.; LORENZZETTI, J. A.; BARBOSA, C. C.; ROSA, R. R.
            </PublicationAuthors>
          </PublicationItem>

          <CongressTitle>SIL - 2007. Montreal, Canada</CongressTitle>
          <CongressSubtitle>
            XXX Congress of the International Association of Theoretical and Applied Limnology
          </CongressSubtitle>
          <CongressSubtitle>
            Title: Greenhouse gas emissions from natural ecosystems and reservoirs
          </CongressSubtitle>

          <PublicationItem>
            <PublicationTitle>
              Carbon budget in seven Brazilian hydropower reservoirs
            </PublicationTitle>
            <PublicationAuthors>
              CIMBLERIS, A. C. P.; BRUM, P. R.; SOARES, C. B. P.; ROLAND, F.; ROSA, L. P.; SANTOS,
              M. A.; MATVIENKO, B.; TUNDISI, J. G.; ABE, D. S.; GALLI, C. S.; STECH, J. L.; NOVO, E.
              M. L. M.
            </PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              Greenhouse gas emissions downstream tropical hydroeletric reservoirs
            </PublicationTitle>
            <PublicationAuthors>
              DOS SANTOS, M. A.; ROSA, L. P.; MATVIENKO, B.; DOS SANTOS, E. O.; ROCHA, C. H. E.
              D'A.; SIKAR, E.; SILVA, M. B.; JUNIOR, A. M. P. B.
            </PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              Greenhouse gas concentrations and diffusive flux at the sediment-water interface from
              two reservoirs in Brazil
            </PublicationTitle>
            <PublicationAuthors>
              GALLI, C. S.; ABE, D. S.; TUNDISI, J.G.; ADAMS, D. D.; TUNDISI, T. M.; TUNDISI, J. E.;
              BRUM, P. R.; CIMBLERIS, A. C. P.
            </PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              Sunlight effects on diel CO<sub>2</sub> and CH<sub>4</sub> emissions from a tropical
              reservoirs
            </PublicationTitle>
            <PublicationAuthors>
              LIMA, I. B. T.; CIMBLERIS, A. C. P.; MAZZI, E. A.; NOVO, E. M. L. M.; OMETTO, J. P. H.
              B.; RAMOS, F. M.; ROSA, R. R.; STECH, J. L.
            </PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              Concentrarion profile at the air-water interface and its bearing on mentane flux
              measurement
            </PublicationTitle>
            <PublicationAuthors>
              MATVIENKO, B.; SIKAR, E.; DOS SANTOS, M.; ROSA, L.; SILVA, M.; DOS SANTOS, E.; ROCHA,
              C.
            </PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              Evaluation of dissolved carbon dioxide and methane at three tropical hydroelectric
            </PublicationTitle>
            <PublicationAuthors>
              ROCHA, C. H. E. D'A.; DOS SANTOS, M. A.; MATVIENKO, B.; ROSA, L. P.; DOS SANTOS, E.
              O.; SIKAR, E.; SILVA, M. B.; JUNIOR, A. M. P. B.
            </PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              Contribution of planktonic respiration to greenhouse emissions in tropical reservoirs
            </PublicationTitle>
            <PublicationAuthors>
              ROLAND, F.; HUSZAR, V. L. M.; BARROS, N. O.; FERREIRA, R. M.; ASSIREU, A. T.;
              CIMBLERIS, A. C. P.; BRUM, P. R.; COLE, J. J.
            </PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              The importance of land use changes analisys in the greenhouse gas emissions from
              hydroelectric reservoirs
            </PublicationTitle>
            <PublicationAuthors>
              SANTOS, E.; SILVA, C.; MATVIENKO, B.; ROCHA, C. H.; ROSA, L. P.; SIKAR, E.; SILVA, M.;
              JUNIOR, A. B.
            </PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              Tropical reservoirs are on average 2.7 times bigger carbon sinks than soils
            </PublicationTitle>
            <PublicationAuthors>
              SIKAR, E.; MATVIENKO, B.; DOS SANTOS,M.; ROSA, L.; SILVA, M.; DOS SANTOS, E.; ROCHA,
              C.; JUNIOR, A. B.
            </PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              Does methane from hydro-reservoirs fiz out from the water upon turbine discharge?
            </PublicationTitle>
            <PublicationAuthors>
              SILVA, M.; MATVIENKO, B.; DOS SANTOS, M.; SIKAR, E.; ROSA, L.; DOS SANTOS E.; ROCHA,
              C.
            </PublicationAuthors>
          </PublicationItem>

          <CongressTitle>Outros Congressos</CongressTitle>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/ComplexidadeGeometricaVariabilidadeEspacial.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Existe relação entre a complexidade geométrica do entorno dos reservatórios e a
                variabilidade espacial dos parâmetros limnológicos?
              </a>
            </PublicationTitle>
            <PublicationAuthors>
              ASSIREU, A. T.; ROLAND, F.; NOVO, E. M. L. M.; BARROS, N. O.; STECH, J. L.; PACHECO,
              F. S.
            </PublicationAuthors>
            <PublicationDetails>
              Anais XIII Simpósio Brasileiro de Sensoriamento Remoto, Florianópolis, Brasil, 21-26
              abril 2007, p. 3263-3269
            </PublicationDetails>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/DistribuicaoVerticalDoFitoplancton.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Distribuição vertical do fitoplâncton nos reservatórios de Serra da Mesa (GO) e
                Manso (MT) no início do período de chuvas
              </a>
            </PublicationTitle>
            <PublicationAuthors>
              SILVA, L. H. S.; TRINDADE, T. N.; ROLAND, F.; CESAR, D. E.
            </PublicationAuthors>
            <PublicationDetails>
              I Simpósio de Ecologia de Reservatórios, Avaré - SP, 2004
            </PublicationDetails>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/DistribuicaoVerticalDoFitoplanctonico.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Distribuição vertical do fitoplâncton nos reservatórios de Serra da Mesa (GO) e
                Manso (MT) em três períodos climatológicos
              </a>
            </PublicationTitle>
            <PublicationAuthors>TRINDADE, T. N.</PublicationAuthors>
            <PublicationDetails>
              VI Seminário de Iniciação Científica da Biologia da Universidade Gama Filho, RJ, 2004
            </PublicationDetails>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/DinamicaHorizontal.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Dinâmica horizontal do fitoplâncton no reservatório de Corumbá (GO) em três períodos
                climatológicos
              </a>
            </PublicationTitle>
            <PublicationAuthors>
              TRINDADE, T. N.; SILVA, L. H. S.; HUSZAR, V. L. M.; ROLAND, F.; CESAR, D. E.
            </PublicationAuthors>
            <PublicationDetails>
              XI Congresso Brasileiro de Ficologia, Itajaí - SC, 2006
            </PublicationDetails>
          </PublicationItem>

          <CongressTitle>
            XI Seminário de Iniciação Científica, Juiz de Fora - MG, 2004
          </CongressTitle>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/VariacaoDaIntensidadeLuminosa.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Variação da intensidade luminosa em dois reservatórios do sistema FURNAS
              </a>
            </PublicationTitle>
            <PublicationAuthors>BARROS, N. O.; CESAR, D. E.; ROLAND, F.</PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/RelacaoEntreDensidadeBacterianaO2.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Relação entre a densidade bacteriana e a concentração de oxigênio dissolvido na
                variação vertical de dois reservatórios recentes do sistema FURNAS Centrais
                Elétricas (UHE de Serra da Mesa – GO e APM de Manso – MT) no período de seca
              </a>
            </PublicationTitle>
            <PublicationAuthors>DEL'DUCA, A.; CESAR, D. E.; ROLAND, F.</PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/VariacaoEspacialDaBact.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Variação espacial da densidade bacteriana nos reservatórios de Serra da Mesa e de
                Manso em diferentes épocas do ano
              </a>
            </PublicationTitle>
            <PublicationAuthors>DEL'DUCA, A.; CESAR, D. E.; ROLAND, F.</PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/PerfilVerticalDaCondutividade.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Perfil vertical da condutividade elétrica em dois reservatórios do sistema FURNAS
              </a>
            </PublicationTitle>
            <PublicationAuthors>
              DUQUE-ESTRADA, C. H. E.; CESAR, D. E.; ROLAND, F.
            </PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/VariacaoNictemeralManso.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Variação Nictemeral no início do período de estiagem no reservatório de Manso (MT)
              </a>
            </PublicationTitle>
            <PublicationAuthors>
              DUQUE-ESTRADA, C. H. E.; CESAR, D. E.; ROLAND, F.
            </PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/VariacaoDasTaxasDeProducao.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Variação nas taxas de produção fitoplanctônica em dois reservatórios do sistema
                FURNAS
              </a>
            </PublicationTitle>
            <PublicationAuthors>
              FERREIRA, R. M.; BASSOLI-ROSA, F.; CESAR, D. E.; ROLAND, F.
            </PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/RespiracaoPlanctonicaEm2Reservatorios.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Respiração planctônica em dois reservatórios do sistema FURNAS
              </a>
            </PublicationTitle>
            <PublicationAuthors>
              FERREIRA, R. M.; VIDAL, L. O.; CESAR, D. E.; ROLAND, F.
            </PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/ContribuicaoDasBacterias.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contribuição das bactérias heterotróficas para o estoque de carbono em reservatórios
                tropicais
              </a>
            </PublicationTitle>
            <PublicationAuthors>
              LOBÃO, L. M.; ALFENAS, G. F. M.; CESAR, D. E.; ROLAND, F.
            </PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/PerfilVerticalDaProducao.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Perfil vertical da produção bacteriana em dois reservatórios do sistema FURNAS
              </a>
            </PublicationTitle>
            <PublicationAuthors>
              LOBÃO, L. M.; ALFENAS, G. F. M.; CESAR, D. E.; ROLAND, F.
            </PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/EstudoQualitativoQuantitativo.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Estudo qualitativo e quantitativo do processo de sedimentação em dois reservatórios
                do sistema FURNAS
              </a>
            </PublicationTitle>
            <PublicationAuthors>MENDONÇA, R. F.; CESAR, D. E.; ROLAND, F.</PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/AvaliacaoDaEficiencia.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Avaliação da eficiência de métodos de preservação de amostras para análises de
                carbono
              </a>
            </PublicationTitle>
            <PublicationAuthors>
              MENDONÇA, R. F.; MARINHO, M. M.; CESAR, D. E.; ROLAND, F.
            </PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/ConcentracoesDeFosforo.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Concentração de Fósforo em dois reservatórios do sistema FURNAS
              </a>
            </PublicationTitle>
            <PublicationAuthors>NOYMA, N. P.; CESAR, D. E.; ROLAND, F.</PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/ConcentracaoDeSilicato.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Concentração de Silicato em dois reservatórios do sistema FURNAS
              </a>
            </PublicationTitle>
            <PublicationAuthors>NOYMA, N. P.; CESAR, D. E.; ROLAND, F.</PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/AnaliseComparacaoDeCarbono.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Análise e comparação de carbono orgânico total em dois reservatórios do sistema
                FURNAS de geração de energia elétrica
              </a>
            </PublicationTitle>
            <PublicationAuthors>PACHECO, F. S.; CESAR, D. E.; ROLAND, F.</PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/VariacaoNictemeralSerra.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Variação Nictemeral de fatores abióticos no reservatório da UHE de Serra da Mesa/GO
              </a>
            </PublicationTitle>
            <PublicationAuthors>PACHECO, F. S.; CESAR, D. E.; ROLAND, F.</PublicationAuthors>
          </PublicationItem>

          <CongressTitle>X Congresso Brasileiro de Limnologia, Ilhéus - BA, 2005</CongressTitle>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/BacteriasHeterotroficas.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Bactérias heterotróficas: um passeio por seis reservatórios tropicais
              </a>
            </PublicationTitle>
            <PublicationAuthors>DEL'DUCA, A.; ROLAND, F.; CESAR, D. E.</PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/DeterminacaoDoCarbono.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Determinação do Carbono Inorgânico Dissolvido (DIC): avaliação da eficiência dos
                métodos direto e indireto
              </a>
            </PublicationTitle>
            <PublicationAuthors>MARINHO, M. M.; MENDONÇA, R.F.; ROLAND, F.</PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/MetabolismoPlanctonicoEmDoisReservatorios.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Metabolismo planctônico em dois reservatórios do sistema FURNAS – reservatório de
                Serra da Mesa (GO) e de Manso (MT)
              </a>
            </PublicationTitle>
            <PublicationAuthors>MELLO, M.; CESAR, D. E.; ROLAND, F.</PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/DinamicaDosEstoquesDeCarbono.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Dinâmica dos estoques de carbono orgânico e inorgânico em reservatórios de
                diferentes idades
              </a>
            </PublicationTitle>
            <PublicationAuthors>MENDONÇA, R. F.; MARINHO, M. M.; ROLAND, F.</PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/ClorofilaBiomassa.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Concentrações de clorofila e biomassa fitoplanctônica em diferentes profundidades em
                um reservatório de FURNAS Centrais Elétricas S.A. no início do período de chuvas
              </a>
            </PublicationTitle>
            <PublicationAuthors>PACHECO, F. S.; ROLAND, F.; CESAR, D. E.</PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/DinamicaDosSolidosSuspensos.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Dinâmica dos sólidos suspensos em reservatórios: entrada e processamento do material
                alóctone
              </a>
            </PublicationTitle>
            <PublicationAuthors>ROLAND, F.; MENDONÇA, R. F.</PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/AvaliacaoDaBiomassa.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Avaliação da biomassa (conteúdo de carbono) de Rotifera no reservatório de Manso
                (MT), Brasil
              </a>
            </PublicationTitle>
            <PublicationAuthors>ROSA, P. G.; BRANCO, C. W. C.; ROLAND, F.</PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/VariacaoDaDensidadeRelativaZoo.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Variação da densidade relativa zooplanctônica, em três épocas distintas, do
                reservatório de UHE Serra da Mesa (GO), Brasil
              </a>
            </PublicationTitle>
            <PublicationAuthors>ROSA, P. G.; BRANCO, C. W. C.; ROLAND, F.</PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/DinamicaDoFitoplanctonManso.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Dinâmica do fitoplâncton no reservatório de Manso (MT)
              </a>
            </PublicationTitle>
            <PublicationAuthors>
              SILVA, L. H. S.; TRINDADE, T. N.; HUSZAR, V. L. M.; ROLAND, F.; CESAR, D. E.
            </PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/DinamicaDoFitoplanctonSM.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Dinâmica do fitoplâncton no reservatório de Serra da Mesa (GO)
              </a>
            </PublicationTitle>
            <PublicationAuthors>
              TRINDADE, T. N.; SILVA, L. H. S.; HUSZAR, V. L. M.; ROLAND, F.; CESAR, D. E.
            </PublicationAuthors>
          </PublicationItem>

          {/* Resumos Publicados */}
          <CategoryTitle>
            <FileText size={20} style={{ display: "inline", marginRight: "0.5rem" }} />
            Resumos Publicados
          </CategoryTitle>

          <PublicationItem>
            <PublicationTitle>
              Trophic classifications between temperate and tropical aquatic ecosystems: is such
              terminology unrealistic for sedimentary carbon cycling?
            </PublicationTitle>
            <PublicationAuthors>
              ABE, D. S.; ADAMS, D. D.; SIDAGIS-GALLI, C.; TUNDISI, J. G.; CIMBLERIS, A. C. P.;
              BRUM, P. R.
            </PublicationAuthors>
            <PublicationDetails>
              In: 11th World Lakes Conference - Management of Lake Basins for their Sustainable Use:
              Global Experience and African Issues, 2005, Nairobi. 11th World Lakes Conference -
              Abstracts Volume. Nairobi: PASS, University of Nairobi, 2005. v. 1. p. 105-105
            </PublicationDetails>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              Carbon budget in hydroelectric reservoirs of FURNAS Centrais Elétricas, Brazil
            </PublicationTitle>
            <PublicationAuthors>
              CIMBLERIS, A. C. P.; SANTOS, M. A.; MATVIENKO, B.; STECH, J. L.; LIMA, I. B. T.;
              TUNDISI, J. G.; ABE, D. S.; SIDAGIS-GALLI, C. V.; ROLAND, F.; CESAR, D. E.; BRUM, P.
              R.
            </PublicationAuthors>
            <PublicationDetails>
              Proceedings of the International Association of Theoretical and Applied Limnology, v.
              29, p. 563, 2005
            </PublicationDetails>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/ConcentracaoDeO2eImplicacoesNaEstrutura.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Concentração de oxigênio e suas implicações na estrutura e metabolismo bacteriano no
                reservatório de Serra da Mesa/GO
              </a>
            </PublicationTitle>
            <PublicationAuthors>DEL'DUCA, A.; CESAR, D. E.; ROLAND, F.</PublicationAuthors>
            <PublicationDetails>
              XXIII Brazilian Congress of Microbiology, Santos - SP, Brazil, 2005
            </PublicationDetails>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/Ferramentas.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ferramentas para abrir uma caixa, ainda, nebulosa
              </a>
            </PublicationTitle>
            <PublicationAuthors>DEL'DUCA, A.; ROLAND, F.; CESAR, D. E.</PublicationAuthors>
            <PublicationDetails>
              X Brazilian Congress of Limnology, Ilhéus - BA, Brazil, 2005
            </PublicationDetails>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>Carbon budget in two neotropical reservoirs</PublicationTitle>
            <PublicationAuthors>
              ROLAND, F.; BRUM, P. R.; SOARES, C. B.; CESAR, D. E.; ROSA, L. P.; SANTOS, M. A.;
              SIKAR, B. M.; TUNDISI, J. G.; ABE, D. S.; STECH, J. L.; NOVO, E. M. L. M.
            </PublicationAuthors>
            <PublicationDetails>
              In: ASLO - Aquatic Sciences Meeting, 2006, Victoria
            </PublicationDetails>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              Heterotrophic pathways on carbon balance in tropical reservoirs
            </PublicationTitle>
            <PublicationAuthors>
              ROLAND, F.; VIDAL, L.; COLE, J. J.; CIMBLERIS, A. C. P.
            </PublicationAuthors>
            <PublicationDetails>
              In: ASLO - Aquatic Sciences Meeting, 2006, Victoria
            </PublicationDetails>
          </PublicationItem>

          {/* Monografias */}
          <CategoryTitle>
            <FileText size={20} style={{ display: "inline", marginRight: "0.5rem" }} />
            Monografias
          </CategoryTitle>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/ComunidadeZooplanctonicoDeQuatroReservatorios.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Comunidade zooplanctônica de quatro reservatórios do centro-oeste do Brasil:
                abundância e biomassa em carbono
              </a>
            </PublicationTitle>
            <PublicationAuthors>ROSA, P. G.</PublicationAuthors>
            <PublicationDetails>
              Trabalho de Conclusão de Curso (Graduação em Ciências Biológicas) - Universidade
              Federal do Estado do Rio de Janeiro, 2005
            </PublicationDetails>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/DinamicaHorizontalFitoplanctonSM.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Dinâmica horizontal do fitoplâncton no reservatório de Serra da Mesa (GO) em três
                períodos climatológicos
              </a>
            </PublicationTitle>
            <PublicationAuthors>Trindade, T. N.</PublicationAuthors>
            <PublicationDetails>
              Trabalho de Conclusão de Curso (Graduação em Ciências Biológicas) - Universidade
              Federal do Estado do Rio de Janeiro, 2007
            </PublicationDetails>
          </PublicationItem>

          {/* Resumos Publicados */}
          <CategoryTitle>
            <FileText size={20} style={{ display: "inline", marginRight: "0.5rem" }} />
            Resumos Publicados
          </CategoryTitle>

          <CongressTitle>
            XIII Simpósio Brasileiro de Sensoriamento Remoto - 2007. Florianópolis, Brasil
          </CongressTitle>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/ComplexidadeGeometricaVariabilidadeEspacial.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Existe relação entre a complexidade geométrica do entorno dos reservatórios e a
                variabilidade espacial dos parâmetros limnológicos?
              </a>
            </PublicationTitle>
            <PublicationAuthors>
              ASSIREU, A. T.; ROLAND, F.; NOVO, E. M. L. M.; BARROS, N. O.; STECH, J. L.; PACHECO,
              F. S.
            </PublicationAuthors>
            <PublicationDetails>
              Anais XIII Simpósio Brasileiro de Sensoriamento Remoto, Florianópolis, Brasil, 21-26
              abril 2007, p. 3263-3269
            </PublicationDetails>
          </PublicationItem>

          <CongressTitle>I Simpósio de Ecologia de Reservatórios - 2004. Avaré - SP</CongressTitle>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/DistribuicaoVerticalDoFitoplancton.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Distribuição vertical do fitoplâncton nos reservatórios de Serra da Mesa (GO) e
                Manso (MT) no início do período de chuvas
              </a>
            </PublicationTitle>
            <PublicationAuthors>
              SILVA, L. H. S.; TRINDADE, T. N.; ROLAND, F.; CESAR, D. E.
            </PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/DistribuicaoVerticalDoFitoplanctonico.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Distribuição vertical do fitoplâncton nos reservatórios de Serra da Mesa (GO) e
                Manso (MT) em três períodos climatológicos
              </a>
            </PublicationTitle>
            <PublicationAuthors>TRINDADE, T. N.</PublicationAuthors>
          </PublicationItem>

          <CongressTitle>
            VI Seminário de Iniciação Científica da Biologia da Universidade Gama Filho - 2004. RJ
          </CongressTitle>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/DinamicaHorizontal.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Dinâmica horizontal do fitoplâncton no reservatório de Corumbá (GO) em três períodos
                climatológicos
              </a>
            </PublicationTitle>
            <PublicationAuthors>
              TRINDADE, T. N.; SILVA, L. H. S.; HUSZAR, V. L. M.; ROLAND, F.; CESAR, D. E.
            </PublicationAuthors>
          </PublicationItem>

          <CongressTitle>XI Congresso Brasileiro de Ficologia - 2006. Itajaí - SC</CongressTitle>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/VariacaoDaIntensidadeLuminosa.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Variação da intensidade luminosa em dois reservatórios do sistema FURNAS
              </a>
            </PublicationTitle>
            <PublicationAuthors>BARROS, N. O.; CESAR, D. E.; ROLAND, F.</PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/RelacaoEntreDensidadeBacterianaO2.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Relação entre a densidade bacteriana e a concentração de oxigênio dissolvido na
                variação vertical de dois reservatórios recentes do sistema FURNAS Centrais
                Elétricas (UHE de Serra da Mesa – GO e APM de Manso – MT) no período de seca
              </a>
            </PublicationTitle>
            <PublicationAuthors>DEL'DUCA, A.; CESAR, D. E.; ROLAND, F.</PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/VariacaoEspacialDaBact.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Variação espacial da densidade bacteriana nos reservatórios de Serra da Mesa e de
                Manso em diferentes épocas do ano
              </a>
            </PublicationTitle>
            <PublicationAuthors>DEL'DUCA, A.; CESAR, D. E.; ROLAND, F.</PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/PerfilVerticalDaCondutividade.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Perfil vertical da condutividade elétrica em dois reservatórios do sistema FURNAS
              </a>
            </PublicationTitle>
            <PublicationAuthors>
              DUQUE-ESTRADA, C. H. E.; CESAR, D. E.; ROLAND, F.
            </PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/VariacaoNictemeralManso.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Variação Nictemeral no início do período de estiagem no reservatório de Manso (MT)
              </a>
            </PublicationTitle>
            <PublicationAuthors>
              DUQUE-ESTRADA, C. H. E.; CESAR, D. E.; ROLAND, F.
            </PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/VariacaoDasTaxasDeProducao.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Variação nas taxas de produção fitoplanctônica em dois reservatórios do sistema
                FURNAS
              </a>
            </PublicationTitle>
            <PublicationAuthors>
              FERREIRA, R. M.; BASSOLI-ROSA, F.; CESAR, D. E.; ROLAND, F.
            </PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/RespiracaoPlanctonicaEm2Reservatorios.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Respiração planctônica em dois reservatórios do sistema FURNAS
              </a>
            </PublicationTitle>
            <PublicationAuthors>
              FERREIRA, R. M.; VIDAL, L. O.; CESAR, D. E.; ROLAND, F.
            </PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/ContribuicaoDasBacterias.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contribuição das bactérias heterotróficas para o estoque de carbono em reservatórios
                tropicais
              </a>
            </PublicationTitle>
            <PublicationAuthors>
              LOBÃO, L. M.; ALFENAS, G. F. M.; CESAR, D. E.; ROLAND, F.
            </PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/PerfilVerticalDaProducao.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Perfil vertical da produção bacteriana em dois reservatórios do sistema FURNAS
              </a>
            </PublicationTitle>
            <PublicationAuthors>
              LOBÃO, L. M.; ALFENAS, G. F. M.; CESAR, D. E.; ROLAND, F.
            </PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/EstudoQualitativoQuantitativo.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Estudo qualitativo e quantitativo do processo de sedimentação em dois reservatórios
                do sistema FURNAS
              </a>
            </PublicationTitle>
            <PublicationAuthors>MENDONÇA, R. F.; CESAR, D. E.; ROLAND, F.</PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/AvaliacaoDaEficiencia.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Avaliação da eficiência de métodos de preservação de amostras para análises de
                carbono
              </a>
            </PublicationTitle>
            <PublicationAuthors>
              MENDONÇA, R. F.; MARINHO, M. M.; CESAR, D. E.; ROLAND, F.
            </PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/ConcentracoesDeFosforo.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Concentração de Fósforo em dois reservatórios do sistema FURNAS
              </a>
            </PublicationTitle>
            <PublicationAuthors>NOYMA, N. P.; CESAR, D. E.; ROLAND, F.</PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/ConcentracaoDeSilicato.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Concentração de Silicato em dois reservatórios do sistema FURNAS
              </a>
            </PublicationTitle>
            <PublicationAuthors>NOYMA, N. P.; CESAR, D. E.; ROLAND, F.</PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/AnaliseComparacaoDeCarbono.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Análise e comparação de carbono orgânico total em dois reservatórios do sistema
                FURNAS de geração de energia elétrica
              </a>
            </PublicationTitle>
            <PublicationAuthors>PACHECO, F. S.; CESAR, D. E.; ROLAND, F.</PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/VariacaoNictemeralSerra.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Variação Nictemeral de fatores abióticos no reservatório da UHE de Serra da Mesa/GO
              </a>
            </PublicationTitle>
            <PublicationAuthors>PACHECO, F. S.; CESAR, D. E.; ROLAND, F.</PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/BacteriasHeterotroficas.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Bactérias heterotróficas: um passeio por seis reservatórios tropicais
              </a>
            </PublicationTitle>
            <PublicationAuthors>DEL'DUCA, A.; ROLAND, F.; CESAR, D. E.</PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/DeterminacaoDoCarbono.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Determinação do Carbono Inorgânico Dissolvido (DIC): avaliação da eficiência dos
                métodos direto e indireto
              </a>
            </PublicationTitle>
            <PublicationAuthors>MARINHO, M. M.; MENDONÇA, R.F.; ROLAND, F.</PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/MetabolismoPlanctonicoEmDoisReservatorios.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Metabolismo planctônico em dois reservatórios do sistema FURNAS – reservatório de
                Serra da Mesa (GO) e de Manso (MT)
              </a>
            </PublicationTitle>
            <PublicationAuthors>MELLO, M.; CESAR, D. E.; ROLAND, F.</PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/DinamicaDosEstoquesDeCarbono.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Dinâmica dos estoques de carbono orgânico e inorgânico em reservatórios de
                diferentes idades
              </a>
            </PublicationTitle>
            <PublicationAuthors>MENDONÇA, R. F.; MARINHO, M. M.; ROLAND, F.</PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/ClorofilaBiomassa.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Concentrações de clorofila e biomassa fitoplanctônica em diferentes profundidades em
                um reservatório de FURNAS Centrais Elétricas S.A. no início do período de chuvas
              </a>
            </PublicationTitle>
            <PublicationAuthors>PACHECO, F. S.; ROLAND, F.; CESAR, D. E.</PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/DinamicaDosSolidosSuspensos.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Dinâmica dos sólidos suspensos em reservatórios: entrada e processamento do material
                alóctone
              </a>
            </PublicationTitle>
            <PublicationAuthors>ROLAND, F.; MENDONÇA, R. F.</PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/AvaliacaoDaBiomassa.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Avaliação da biomassa (conteúdo de carbono) de Rotifera no reservatório de Manso
                (MT), Brasil
              </a>
            </PublicationTitle>
            <PublicationAuthors>ROSA, P. G.; BRANCO, C. W. C.; ROLAND, F.</PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/VariacaoDaDensidadeRelativaZoo.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Variação da densidade relativa zooplanctônica, em três épocas distintas, do
                reservatório de UHE Serra da Mesa (GO), Brasil
              </a>
            </PublicationTitle>
            <PublicationAuthors>ROSA, P. G.; BRANCO, C. W. C.; ROLAND, F.</PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/DinamicaDoFitoplanctonManso.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Dinâmica do fitoplâncton no reservatório de Manso (MT)
              </a>
            </PublicationTitle>
            <PublicationAuthors>
              SILVA, L. H. S.; TRINDADE, T. N.; HUSZAR, V. L. M.; ROLAND, F.; CESAR, D. E.
            </PublicationAuthors>
          </PublicationItem>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/DinamicaDoFitoplanctonSM.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Dinâmica do fitoplâncton no reservatório de Serra da Mesa (GO)
              </a>
            </PublicationTitle>
            <PublicationAuthors>
              TRINDADE, T. N.; SILVA, L. H. S.; HUSZAR, V. L. M.; ROLAND, F.; CESAR, D. E.
            </PublicationAuthors>
          </PublicationItem>

          <CongressTitle>
            XXIII Brazilian Congress of Microbiology - 2005. Santos - SP, Brazil
          </CongressTitle>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/ConcentracaoDeO2eImplicacoesNaEstrutura.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Concentração de oxigênio e suas implicações na estrutura e metabolismo bacteriano no
                reservatório de Serra da Mesa/GO
              </a>
            </PublicationTitle>
            <PublicationAuthors>DEL'DUCA, A.; CESAR, D. E.; ROLAND, F.</PublicationAuthors>
          </PublicationItem>

          <CongressTitle>
            X Brazilian Congress of Limnology - 2005. Ilhéus - BA, Brazil
          </CongressTitle>

          <PublicationItem>
            <PublicationTitle>
              <a
                href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/Ferramentas.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ferramentas para abrir uma caixa, ainda, nebulosa
              </a>
            </PublicationTitle>
            <PublicationAuthors>DEL'DUCA, A.; ROLAND, F.; CESAR, D. E.</PublicationAuthors>
          </PublicationItem>
        </Section>
      </MainContent>
    </FurnasPublicacoesContainer>
  );
}

export default FurnasPublicacoesPage;
