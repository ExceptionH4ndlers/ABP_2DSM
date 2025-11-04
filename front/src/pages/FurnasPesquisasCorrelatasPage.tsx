import { useState } from "react";
import styled from "styled-components";
import { BookOpen } from "lucide-react";
import FurnasSidebar from "../components/FurnasSidebar";

const FurnasPesquisasCorrelatasContainer = styled.div`
  min-height: 100vh;
  background: #ffffff;
  display: flex;
`;

const MainContent = styled.main<{ $collapsed: boolean }>`
  flex: 1;
  margin-left: ${({ $collapsed }) => ($collapsed ? "80px" : "280px")};
  padding: 2rem;
  max-width: calc(100vw - ${({ $collapsed }) => ($collapsed ? "80px" : "280px")});
  overflow-x: visible;
  transition:
    margin-left 0.3s ease,
    max-width 0.3s ease;

  @media (max-width: 1024px) {
    margin-left: ${({ $collapsed }) => ($collapsed ? "80px" : "240px")};
    max-width: ${({ $collapsed }) => ($collapsed ? "calc(100vw - 80px)" : "calc(100vw - 240px)")};
  }

  @media (max-width: 768px) {
    margin-left: 0;
    max-width: 100%;
  }
`;

const Section = styled.section`
  background: #ffffff;
  border-radius: 20px;
  padding: 3rem;
  margin-bottom: 3rem;
  border: 2px solid rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #000000;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  ${({ theme }) => theme.media.mobile} {
    font-size: 2rem;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  color: #7f8c8d;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const ReferenceItem = styled.div`
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #196d95;
`;

const ReferenceTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #196d95;
  margin-bottom: 0.5rem;
`;

const ReferenceAuthors = styled.p`
  font-size: 0.9rem;
  color: #495057;
  margin-bottom: 0.5rem;
  font-style: italic;
`;

const ReferenceJournal = styled.p`
  font-size: 0.9rem;
  color: #6c757d;
  margin-bottom: 0.5rem;
`;

const ReferenceLink = styled.a`
  color: #196d95;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
    color: #0f4c6b;
  }
`;

const CategoryTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #000000;
  margin: 2rem 0 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #196d95;
`;

function FurnasPesquisasCorrelatasPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  return (
    <FurnasPesquisasCorrelatasContainer>
      <FurnasSidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        activeItem="pesquisas"
      />

      <MainContent $collapsed={sidebarCollapsed}>
        <Section>
          <SectionTitle>
            <BookOpen size={40} />
            Pesquisas Correlatas
          </SectionTitle>
          <SectionSubtitle>
            Referências bibliográficas relacionadas ao estudo de emissões de gases de efeito estufa
            em reservatórios hidrelétricos
          </SectionSubtitle>

          <CategoryTitle>Relatórios e Documentos Oficiais</CategoryTitle>

          <ReferenceItem>
            <ReferenceTitle>
              The Third Assessment Report of the Intergovernmental Panel on Climate Change
            </ReferenceTitle>
            <ReferenceAuthors>IPCC 2001</ReferenceAuthors>
            <ReferenceJournal>Intergovernmental Panel on Climate Change</ReferenceJournal>
            <ReferenceLink href="http://www.ipcc.ch" target="_blank" rel="noopener noreferrer">
              http://www.ipcc.ch
            </ReferenceLink>
          </ReferenceItem>

          <CategoryTitle>Estudos sobre Reservatórios Brasileiros</CategoryTitle>

          <ReferenceItem>
            <ReferenceTitle>
              Sediment greenhouse gases (methane and carbon dioxide) in the Lobo-Broa Reservoir, São
              Paulo State, Brazil
            </ReferenceTitle>
            <ReferenceAuthors>
              ABE, D. S. ; ADAMS, D. D. ; GALLI, C. V. S. ; SIKAR, E. ; TUNDISI, J. G.
            </ReferenceAuthors>
            <ReferenceJournal>
              Lakes & Reservoirs: Research and Management, 10: 201-209, 2005
            </ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Greenhouse gas emissions from hydroelectric reservoir (Brazil's Tucuruí dam) and the
              energy policy implications
            </ReferenceTitle>
            <ReferenceAuthors>FEARNSIDE, P.</ReferenceAuthors>
            <ReferenceJournal>Water, Air and Soil Pollution, 133:69-96, 2002</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Do hydroelectric dams mitigate global warming? The case of Brazil's Curuí-Una dam
            </ReferenceTitle>
            <ReferenceAuthors>FEARNSIDE, P. M.</ReferenceAuthors>
            <ReferenceJournal>
              Mitigation and Adaptation Strategies for Global Change, 10: 675-691, 2005
            </ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Environmental impacts of Brazil's Tucuruí dam: unlearned lessons for hydroelectric
              development in Amazonia
            </ReferenceTitle>
            <ReferenceAuthors>FEARNSIDE, P. M.</ReferenceAuthors>
            <ReferenceJournal>Environmental Management, 27 (3): 377-396, 2001</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Greenhouse gas emissions from hydroelectric dams: controversies provide a springboard
              for rethinking a supposedly 'clean' energy source
            </ReferenceTitle>
            <ReferenceAuthors>FEARNSIDE, P. M.</ReferenceAuthors>
            <ReferenceJournal>Climatic Change 66: 1-8, 2004</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Greenhouse-gas emissions from Amazonian hydroelectric reservoirs: the example of
              Brazil's Tucuruí dam as compared to fossil fuel alternatives
            </ReferenceTitle>
            <ReferenceAuthors>FEARNSIDE, P. M.</ReferenceAuthors>
            <ReferenceJournal>Environmental Conservation, 24 (1): 64-75, 1997</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Biogenic gas production from major Amazon reservoirs, Brazil
            </ReferenceTitle>
            <ReferenceAuthors>
              ROSA, L. P. ; SANTOS, M. A. ; MATVIENKO, B. ; SIKAR, E. ; LOURENÇO, R. S. M. ;
              MENEZES, C. F. S.
            </ReferenceAuthors>
            <ReferenceJournal>Hydrological Processes, 17, 1433-1450, 2003</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Greenhouse gas emissions from hydroelectric reservoirs in tropical regions
            </ReferenceTitle>
            <ReferenceAuthors>
              ROSA, L. P. ; SANTOS, M. A. ; SIKAR, B. M. ; SANTOS, E. O. ; SIKAR, E.
            </ReferenceAuthors>
            <ReferenceJournal>Climatic Change, 66:9-21, 2004, Netherlands</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Measurements of greenhouse gas emission in Samuel, Tucuruí and Balbina dams - Brazil
            </ReferenceTitle>
            <ReferenceAuthors>
              ROSA, L. P. ; SANTOS, M. A. ; TUNDISI, J. G. ; SIKAR, B. M.
            </ReferenceAuthors>
            <ReferenceJournal>
              In: Hydropower Plants and Greenhouse Gas Emissions, Rosa, L. P. & Santos, M. A.
              (eds.), COPPE publication, Rio de Janeiro, 1997
            </ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Emissões de gases de efeito estufa de reservatórios hidrelétricos
            </ReferenceTitle>
            <ReferenceAuthors>
              ROSA, L. P. ; SIKAR, B. M. ; SANTOS, M. A. ; MONTEIRO, J. L. ; SIKAR, E. ; SILVA, M.
              B. ; SANTOS, E. O. ; JUNIOR, A. P. B.
            </ReferenceAuthors>
            <ReferenceJournal>Publicação ANEEL, Brasília, 2002</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Gross greenhouse gas emissions from Brazilian hydro reservoirs
            </ReferenceTitle>
            <ReferenceAuthors>
              SANTOS, M. A. ; SIKAR, B. M. ; ROSA, L. P. ; SIKAR, E. ; SANTOS, E. O.
            </ReferenceAuthors>
            <ReferenceJournal>
              In: Greenhouse Gas Emission - Fluxes and Processes, Springer, Berlin, 2005
            </ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Gross greenhouse gas fluxes from hydro-power reservoir compared to thermo-power plants
            </ReferenceTitle>
            <ReferenceAuthors>
              SANTOS, M. A. ; ROSA, L. P. ; SIKAR, B. ; SIKAR, E. ; SANTOS, E. O.
            </ReferenceAuthors>
            <ReferenceJournal>Energy Policy, 34, 481-488, 2006</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Emissões de gases de efeito estufa do reservatório hidrelétrico de Belo Monte - fase
              de pré-enchimento do reservatório
            </ReferenceTitle>
            <ReferenceAuthors>
              SANTOS, M. A. ; SIKAR, B. M. ; MADDOCK, J. E. L. ; SANTOS, E. O. ; SILVA, M. B. ;
              ROCHA, C. H. E. A. ; JUNIOR, A. P. B. ; SIKAR, E.
            </ReferenceAuthors>
            <ReferenceJournal>
              Relatório Técnico Final COPPE/UFRJ-Eletrobrás, Rio de Janeiro, Agosto de 2004
            </ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Biogeochemical distinction of methane releases from two Amazon hydroreservoirs
            </ReferenceTitle>
            <ReferenceAuthors>LIMA, I. B. T.</ReferenceAuthors>
            <ReferenceJournal>Chemosphere, 59, 1697-1702, 2005</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Emissão de metano em reservatórios hidreléricos amazônicos através de leis de potência
            </ReferenceTitle>
            <ReferenceAuthors>LIMA, I. B. T.</ReferenceAuthors>
            <ReferenceJournal>
              Tese de Doutorado, Centro de Energia Nuclear na Agricultura - USP, Piracicaba, 2002,
              108p. (no prelo)
            </ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>Carbon flows in the Tucuruí reservoir</ReferenceTitle>
            <ReferenceAuthors>LIMA, I. B. T. ; NOVO, E. M. L. M.</ReferenceAuthors>
            <ReferenceJournal>
              In: Proceedings of International Workshop on Hydro Dams, Lakes and Greenhouse Gas
              Emissions, Rio de Janeiro, Brazil, COPPE-UFRJ, pp.78-84, 1999
            </ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Methane production, transport and emission in Amazon hydroelectric plants
            </ReferenceTitle>
            <ReferenceAuthors>
              LIMA, I. B. T. ; NOVO, E. M. L. M. ; BALLESTER, M. V. F. ; OMETTO, J. P.
            </ReferenceAuthors>
            <ReferenceJournal>IEEE, 2529-2531, 1998</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Role of the macrophyte community in the CH4 production and emission in the tropical
              reservoir of Tucuruí, Pará State, Brazil
            </ReferenceTitle>
            <ReferenceAuthors>
              LIMA, I. B. T. ; NOVO, E. M. L. M. ; BALLESTER, M. V. R. ; OMETTO, J. P.
            </ReferenceAuthors>
            <ReferenceJournal>Verh. Internat. Verein. Limnol., 27:1437-1440, 2000</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Methane, carbon dioxide, and nitrous oxide emissions from two Amazonian reservoirs
              during high water table
            </ReferenceTitle>
            <ReferenceAuthors>
              LIMA, I. B. T. ; VICTORIA, R. L. ; NOVO, E. M. L. M. ; FEIGL, B. J. ; BALLESTER, M. V.
              R.; OMETTO, J. P.
            </ReferenceAuthors>
            <ReferenceJournal>
              XXVIII Societas Internationalis Limnologiae Congress, Melbourn, Australia, 2001. In
              press.
            </ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Mitigation and recovery of methane emissions from tropical hydroelectric dams
            </ReferenceTitle>
            <ReferenceAuthors>
              BAMBACE, L. A. W. ; RAMOS, F. M. ; LIMA, I. B. T. ; ROSA R. R.
            </ReferenceAuthors>
            <ReferenceJournal>
              Energy, 32, 1038-1046, 2007 - www.elsevier.com/locate/energy
            </ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Extreme event dynamics in methane ebullition fluxes from tropical reservoirs
            </ReferenceTitle>
            <ReferenceAuthors>
              RAMOS, F. M. ; LIMA, I. B. T. ; ROSA, R. R. ; MAZZI, E. A. ; CARVALHO, J. C. ; RASERA,
              M. F. F. L. ; OMETTO, J. P. H. B. ; ASSIREU, A. T. ; STECH, J. L.
            </ReferenceAuthors>
            <ReferenceJournal>
              Geophysical research letters, 33 (21), CiteID L21404, 2006
            </ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Methane emissions from lakes and floodplains in Pantanal, Brazil
            </ReferenceTitle>
            <ReferenceAuthors>MARANI, L. ; ALVALÁ, P. C.</ReferenceAuthors>
            <ReferenceJournal>Atmospheric Environment, 41, 1627-1633, 2007</ReferenceJournal>
          </ReferenceItem>

          <CategoryTitle>Estudos sobre Reservatórios Internacionais</CategoryTitle>

          <ReferenceItem>
            <ReferenceTitle>
              A comparison of the carbon balances of a natural lake (L. O. rtra.sket) and a
              hydroelectric reservoir (L.Skinnmuddselet) in northern Sweden
            </ReferenceTitle>
            <ReferenceAuthors>
              ABERG, JAN ; BERGSTROM, ANN-K. ; ALGESTEN, G. ; DERBACK, G. ; JANSSON, M.
            </ReferenceAuthors>
            <ReferenceJournal>Water Research, 38, 531-538, 2004</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              CH4 e CO2 emissions and carbon imbalance in a 10-years old tropical reservoir
              (Petit-Saut, French Guiana)
            </ReferenceTitle>
            <ReferenceAuthors>
              ABRIL, G. ; GUÉRIN, F. ; RICHARD, S. ; DELMAS, R. ; GALY-LACAUX, C. ; TREMBLAY, A. ;
              VARFALVY, L. ; GOSSE, P. ; SANTOS, M. A. ; MATVIENKO, B.
            </ReferenceAuthors>
            <ReferenceJournal>Global Biogechemical Cycles, 19, 2005</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Emission of greenhouse gases from hydroelectric dams in the tropics: a case study in
              French Guiana
            </ReferenceTitle>
            <ReferenceAuthors>
              DELMAS, R. ; RICHARD, S. ; GALY-LACAUX, C. ; GUÉRIN, F. ; DELON, C.
            </ReferenceAuthors>
            <ReferenceJournal>
              ILEAPS - International Open Science Conference, Helsinki, Finland, 73-78, 2003
            </ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>Greenhouse gas emissions from hydroelectric reservoirs</ReferenceTitle>
            <ReferenceAuthors>ROSA, L. P. ; SHAEFFER, R.</ReferenceAuthors>
            <ReferenceJournal>Ambio, 23 (2), pp. 164-165, 1994</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Are hydroelectric dams in the Brazilian Amazon significant sources of greenhouse gases
            </ReferenceTitle>
            <ReferenceAuthors>ROSA, L. P. ; SHAEFFER, R. ; SANTOS, M. A.</ReferenceAuthors>
            <ReferenceJournal>
              Environmental Conservation, 66, n.1, 2-6, Cambridge University Press, UK, 1996
            </ReferenceJournal>
          </ReferenceItem>

          <CategoryTitle>Metodologias e Técnicas de Medição</CategoryTitle>

          <ReferenceItem>
            <ReferenceTitle>
              In situ measurements of dissolved gases (CO2 and CH4) in a wide range of
              concentrations in a tropical reservoir using an Equilibrator
            </ReferenceTitle>
            <ReferenceAuthors>ABRIL, G. ; RICHARD, S. ; GUÉRIN, F.</ReferenceAuthors>
            <ReferenceJournal>
              Science of the Total Environment 354, 246-251, 2006 -
              www.elsevier.com/locate/scitotenv
            </ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Comparison of static chamber and Boundary Layer Equation methods for measuring
              greenhouse gas emissions from large water bodies
            </ReferenceTitle>
            <ReferenceAuthors>DUCHEMIN, E. ; LUCOTTE, M. ; CANUEL, R.</ReferenceAuthors>
            <ReferenceJournal>
              Environmental Science & Technology, 33:350-357, 1999
            </ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Gas transfer velocities measured by eddy correlations and floating chambers techniques
              in tropical reservoir
            </ReferenceTitle>
            <ReferenceAuthors>
              GUÉRIN, F. ; ABRIL, G. ; SERÇA, D. ; DELON, C. ; RICHARD, S. ; DELMAS, R. ; TREMBLAY,
              A. ; VARFALVY, L.
            </ReferenceAuthors>
            <ReferenceJournal>SOLAS Newsletter, 2, 7, 2005</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Comparison of three techniques used to measure diffusive gas exchange from sheltered
              aquatic surfaces
            </ReferenceTitle>
            <ReferenceAuthors>
              MATTHEWS, C. J. D. ; ST. LOUIS, V. L. ; HESSLEIN, R. H.
            </ReferenceAuthors>
            <ReferenceJournal>Environmnet Science Technology, 37, 772-780, 2003</ReferenceJournal>
          </ReferenceItem>

          <CategoryTitle>Estudos sobre Ciclo do Carbono</CategoryTitle>

          <ReferenceItem>
            <ReferenceTitle>
              Carbon dioxide supersaturation in the surface waters of lakes
            </ReferenceTitle>
            <ReferenceAuthors>
              COLE, J. J. ; CARACO, N. F. ; KLING, G. W. ; KRATZ, T. K.
            </ReferenceAuthors>
            <ReferenceJournal>Science, 265:1568-1570, 1994</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Respiration rates in bacteria exceed phytoplankton production in unproductive aquatic
              systems
            </ReferenceTitle>
            <ReferenceAuthors>DEL GIORGIO, P. A. ; COLE, J. J. ; CIMBLERIS, A.</ReferenceAuthors>
            <ReferenceJournal>Nature 385:148-151</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Carbon in catchments: connecting terrestrial carbon losses with aquatic metabolism
            </ReferenceTitle>
            <ReferenceAuthors>COLE, J. J. ; CARACO, N. F.</ReferenceAuthors>
            <ReferenceJournal>Marine and Freshwater Research. 52:101-110, 2001</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Persistence of net heterotrophy in lakes during nutrient addition and food web
              manipulations
            </ReferenceTitle>
            <ReferenceAuthors>
              COLE, J. J. ; PACE; M. L. ; CARPENTER, S. R. ; KITCHELL, J. F.
            </ReferenceAuthors>
            <ReferenceJournal>Limnol. Oceanogr. 45(8):1718-1730, 2000</ReferenceJournal>
          </ReferenceItem>

          <CategoryTitle>Estudos sobre Metano</CategoryTitle>

          <ReferenceItem>
            <ReferenceTitle>
              Measurement of Methane Oxidation in Lakes: A Comparison of Methods
            </ReferenceTitle>
            <ReferenceAuthors>BASTVIKEN, D. ; NEJLERTSSON, J. ; TRANVIK, L.</ReferenceAuthors>
            <ReferenceJournal>
              Environmental. Science & Technology, 36, 3354-3361, 2004
            </ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>Methane Emission from Lakes</ReferenceTitle>
            <ReferenceAuthors>MAKHOV, G. A. ; BAZHIN, M.</ReferenceAuthors>
            <ReferenceJournal>Chemosphere, 38 (6), 1453-1459, 1999</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Methane bubbling from Siberian thaw lakes as a positive feedback to climate warming
            </ReferenceTitle>
            <ReferenceAuthors>
              WALTER, K. M. ; ZIMOV, S. A. ; CHANTON, J. P. ; VERBYLA, D. ; CHAPIN, F. S.
            </ReferenceAuthors>
            <ReferenceJournal>Nature Publishing Group, 443, 7, 2006</ReferenceJournal>
          </ReferenceItem>

          <CategoryTitle>Análises Comparativas e Políticas</CategoryTitle>

          <ReferenceItem>
            <ReferenceTitle>The Dam Debate And Its Discontents</ReferenceTitle>
            <ReferenceAuthors>CULLENWARD, D. ; VICTOR, D. G.</ReferenceAuthors>
            <ReferenceJournal>
              Editorial Comment , Climatic Change, 75: 81-86, 2006
            </ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>Do hydroelectric reservoirs emit greenhouse gases?</ReferenceTitle>
            <ReferenceAuthors>TREMBLAY, A. ; LAMBERT, M. ; GAGNON, L.</ReferenceAuthors>
            <ReferenceJournal>
              Environmental Management, 33, Supplement 1, S509-S517, 2004
            </ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Flooding the land, warming the Earth: greenhouse gas emissions from dams
            </ReferenceTitle>
            <ReferenceAuthors>MCCULLY, P.</ReferenceAuthors>
            <ReferenceJournal>International Rivers Network, 2002</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Tropical hydropower is a significant source of greenhouse gas emissions: response to
              the International Hydropower Association
            </ReferenceTitle>
            <ReferenceAuthors>MCCULLY, P.</ReferenceAuthors>
            <ReferenceJournal>International Rivers Network, 2004 - www.irn.org</ReferenceJournal>
          </ReferenceItem>

          <CategoryTitle>Livros e Publicações Especiais</CategoryTitle>

          <ReferenceItem>
            <ReferenceTitle>Dams and climate change</ReferenceTitle>
            <ReferenceAuthors>ROSA, L. P. ; SANTOS, M. A. (eds.)</ReferenceAuthors>
            <ReferenceJournal>
              Proceedings of International Workshop on Hydro Dams, Lakes and Greenhouse Gas
              Emissions, Rio de Janeiro, Brazil, 1999
            </ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>Hydropower plants and greenhouse gas emissions</ReferenceTitle>
            <ReferenceAuthors>ROSA, L. P. ; SANTOS, M. A. (eds.)</ReferenceAuthors>
            <ReferenceJournal>
              Proceedings of International Workshop on Greenhouse Gas Emissions from Hydroelectric
              Reservoirs, Rio de Janeiro, Brazil, 1997
            </ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>Greenhouse emissions: fluxes and processes</ReferenceTitle>
            <ReferenceAuthors>
              TREMBLAY, A. ; VARFALVY, L. ; ROEHM, C. ; GARNEAU, M.
            </ReferenceAuthors>
            <ReferenceJournal>
              Environmental Sciences Series, 732 pp. Berlin: Springer-Verlag
            </ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Greenhouse gas emissions from hydropower reservoirs and water quality
            </ReferenceTitle>
            <ReferenceAuthors>ROSA, L. P. ; SANTOS, M. A. ; TUNDISI, J. G.</ReferenceAuthors>
            <ReferenceJournal>COOPE/ UFRJ, 1st ed., 136 pp.</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>Dams and climate change</ReferenceTitle>
            <ReferenceAuthors>SANTOS, M. A. ; ROSA, L. P.</ReferenceAuthors>
            <ReferenceJournal>COOPE/ UFRJ 1st ed., 80 pp., 1999</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>Hydropower plants and greenhouse gas emissions</ReferenceTitle>
            <ReferenceAuthors>SANTOS, M. A. ; ROSA, L. P.</ReferenceAuthors>
            <ReferenceJournal>COOPE/ UFRJ 1st ed., 120 pp., 1997</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>Theoretical reservoir ecology and its applications</ReferenceTitle>
            <ReferenceAuthors>TUNDISI, J. G. ; STRASKRABA, M. (eds.)</ReferenceAuthors>
            <ReferenceJournal>
              International Institute of Ecology, Backhuys, The Netherlands, 1999
            </ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>Limnological analyses</ReferenceTitle>
            <ReferenceAuthors>WETZEL, R. G. ; LIKENS, G.</ReferenceAuthors>
            <ReferenceJournal>Springer-Verlag, 1992</ReferenceJournal>
          </ReferenceItem>

          <CategoryTitle>Estudos sobre Sedimentos e Interface Água-Sedimento</CategoryTitle>

          <ReferenceItem>
            <ReferenceTitle>
              Methane, carbon dioxide and nitrogen gases in the surficial sediments of two Chilean
              reservoirs - diffusive fluxes at the sediment water interface
            </ReferenceTitle>
            <ReferenceAuthors>ADAMS, D. D.</ReferenceAuthors>
            <ReferenceJournal>
              Dams and Climate Change, Luiz P. Rosa and Marco A. dos Santos, eds. ; Proceedings of
              International Workshop on Hydrodams, Lakes and Greenhouse Gas Emissions, COPPE-UFRJ,
              Rio de Janeiro, Brazil, pp. 50-77, 1999
            </ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Gases in the sediments of two eutrophic Chilean reservoirs: potential sediment oxygen
              demand and sediment-water flux of CH4 and CO2 before and after an El Niño event
            </ReferenceTitle>
            <ReferenceAuthors>ADAMS, D. D. ; VILA, I. ; PIZARRO, J. ; SALAZAR, C.</ReferenceAuthors>
            <ReferenceJournal>Verh. Internat. Verein. Limnol., 27:1376-1381, 2000</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Investigating Ebullition in a Sand Column Using Dissolved Gas Analysis and Reactive
              Transport Modeling
            </ReferenceTitle>
            <ReferenceAuthors>AMOS, R. ; YER, K.</ReferenceAuthors>
            <ReferenceJournal>
              Environmental Science Technology, 40, 5361-5367, 2006
            </ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              A headspace equilibration technique for measurement of dissolved gases in sediment
              pore water
            </ReferenceTitle>
            <ReferenceAuthors>FENDINGER, N. J. ; ADAMS, D. D.</ReferenceAuthors>
            <ReferenceJournal>Intern. J. Environ. Anal. Chem., 23:253-265, 1986</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Methane fluxes at the sediment-water interface in some boreal lakes and reservoirs
            </ReferenceTitle>
            <ReferenceAuthors>
              HUTTUNEN, J. T. ; VÄISÄNEN, T. S. ; HELLSTEN, S. K. ; MARTIKAINEN, P. J.
            </ReferenceAuthors>
            <ReferenceJournal>Boreal Environment Research, 11, 27-34, 2006</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Spatial and seasonal variation in greenhouse gas and nutrient dynamics and their
              interactions in the sediments of a boreal eutrophic lake
            </ReferenceTitle>
            <ReferenceAuthors>
              LIIKANEN, A. ; HUTTUNEN, J. T. ; MURTONIEMI, T. ; TANSKANEN, H. ; VÄISÄNEN, T. ;
              SILVOLA, J. ; ALM, J. ; MARTIKAINEN, P. J.
            </ReferenceAuthors>
            <ReferenceJournal>
              Biogeochemistry, 65: 83-103, 2003, Kluwer Academic Publishers
            </ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              The importance of floating peat to methane fluxes from flooded peatlands
            </ReferenceTitle>
            <ReferenceAuthors>SCOTT, K. J. ; KELLY, C. A. ; RUDD, J. W. M.</ReferenceAuthors>
            <ReferenceJournal>Biogeochemistry, 47: 187-202, 1999</ReferenceJournal>
          </ReferenceItem>

          <CategoryTitle>Estudos sobre Bactérias e Microbiologia</CategoryTitle>

          <ReferenceItem>
            <ReferenceTitle>
              Estimating production of heterotrophic bacterioplankton via incorporation of tritiated
              thymidine
            </ReferenceTitle>
            <ReferenceAuthors>BELL, R. T.</ReferenceAuthors>
            <ReferenceJournal>
              In: P.F. Kemp, B. F. Sherr, E.B. Sherr and J.J. Cole (eds) Handbook of Methods in
              Aquatic Microbial Ecology. Lewis. 1993
            </ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Planktonic bacterial respiration as a function of C:N:P ratios across temperate lakes
            </ReferenceTitle>
            <ReferenceAuthors>CIMBLERIS, A. C. P. ; KALFF, J.</ReferenceAuthors>
            <ReferenceJournal>Hydrobiologia, 384:89-100, 1998</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Influence of light intensity on methanotrophic bacterial activity in the Petit Saut
              reservoir, French Guiana
            </ReferenceTitle>
            <ReferenceAuthors>
              DUMESTRE, J. F. ; GUEZENNEC, J. ; GALY-LACAUX, C. ; DELMAS, R. ; RICHARD, S. ;
              LABROUE, L.
            </ReferenceAuthors>
            <ReferenceJournal>
              Applied and Environmental Microbiology, 65, 534 - 539, 1999
            </ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Protein content and protein synthesis rates of planktonic marine bacteria
            </ReferenceTitle>
            <ReferenceAuthors>SIMON, M. ; AZAM, F.</ReferenceAuthors>
            <ReferenceJournal>Mar. Ecol. Prog. Ser., 51:201-213, 1989</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              A simple, economical method for measuring bacterial protein synthesis rates in
              seawater using 3H-leucine
            </ReferenceTitle>
            <ReferenceAuthors>SMITH, D. C. ; AZAM, F.</ReferenceAuthors>
            <ReferenceJournal>Marine Microbial Food Webs, 6, 2:107-114, 1992</ReferenceJournal>
          </ReferenceItem>

          <CategoryTitle>Estudos sobre Lagos e Sistemas Aquáticos</CategoryTitle>

          <ReferenceItem>
            <ReferenceTitle>
              Fluxes of methane and carbon dioxide from a small productive lake to the atmosphere
            </ReferenceTitle>
            <ReferenceAuthors>
              CASPER, P. ; MABERLY, S. C. ; HALL, G. H. ; FINLAY, B. J.
            </ReferenceAuthors>
            <ReferenceJournal>Biogeochemistry, 49:1-19, 2000</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Methane and oxygen dynamics in a shallow floodplain lake: the significance of periodic
              stratification
            </ReferenceTitle>
            <ReferenceAuthors>FORD, P. W. ; BOON, P. I. ; LEE, K.</ReferenceAuthors>
            <ReferenceJournal>Hydrobiologia, 485: 97-110, 2002</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Contribution of winter to the annual CH4 emission from a eutrophied boreal lake
            </ReferenceTitle>
            <ReferenceAuthors>
              HUTTUNEN, J. T. ; ALM, J. ; SAARIJARVI, E. ; LAPPALAINEN, K. M. ; SILVOLA, J. ;
              MARTIKAINEN, P. J.
            </ReferenceAuthors>
            <ReferenceJournal>Chemosphere, 50, 247-250, 2003</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Fluxes of methane, carbon dioxide and nitrous oxide in boreal lakes and potential
              anthropogenic effects on the aquatic greenhouse gas emissions
            </ReferenceTitle>
            <ReferenceAuthors>
              HUTTUNEN, J. T. ; ALM, J. ;, LIIKANEN, A. ; JUUTINEN, S. ; LARMOLA, T. ; HAMMAR, T. ;
              SILVOLA, J. ; MARTIKAINEN, P. J.
            </ReferenceAuthors>
            <ReferenceJournal>Chemosphere, 52, 609-621, 2003</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Exchange of CO2, CH4 and N2O between the atmosphere and two northern boreal ponds with
              catchments dominated by peatlands or forests
            </ReferenceTitle>
            <ReferenceAuthors>
              HUTTUNEN, J. T. ; VÄISÄNEN, T. S. ; HEIKKINEN, S. ; NYKÄNEN, H. ; NENONEN, O. ;
              MARTIKAINEN, P. J.
            </ReferenceAuthors>
            <ReferenceJournal>Plant and Soil, 242, 137-146</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Fluxes of CH4, CO2 and N2O in hydroelectric reservoirs Lokka and Porttipahta in the
              northern boreal zone in Finland
            </ReferenceTitle>
            <ReferenceAuthors>
              HUTTUNEN, J. T. ; VÄISÄNEN, T. S. ; HELLSTEN, S. K. ; HEIKKINEN, S. ; NYKÄNEN, H. ;
              JUNGNER, H. ; NISKANEN, A. ; VIRTANEN, M. O. ; LINDQVIST, O. V. ; NENONEN, O. ;
              MARTIKAINEN, P. J.
            </ReferenceAuthors>
            <ReferenceJournal>Global Biogeochemical Cycles, 16, 1003, 2002</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Sediment respiration and lake trophic state are important predictors of large CO2
              evasion from small boreal lakes
            </ReferenceTitle>
            <ReferenceAuthors>
              KORTELAINEN, P. ; RANTAKARI, M. ; HUTTUNEN, J. T. ; MATTSSON, T. ; ALM, J. ; JUUTINEN,
              S. ; LARMOLA, T. ; SILVOLA, J. ; MARTIKAINEN, P. J.
            </ReferenceAuthors>
            <ReferenceJournal>Global Change Biology, 12, 1554-1567, 2006</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Interannual variation and climatic regulation of the CO2 emission from large boreal
              lakes
            </ReferenceTitle>
            <ReferenceAuthors>RANTAKARI, M. ; KORTELAINEN, P.</ReferenceAuthors>
            <ReferenceJournal>Global Change Biology, 11, 1368-1380, 2005</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              A carbon budget of a small humic lake: an example of the importance of lakes for
              organic matter cycling in boreal catchments
            </ReferenceTitle>
            <ReferenceAuthors>
              SOBEK, S. ; SODERBACK, B. ; KARLSSON, S. ; ANDERSSON, E. ; BRUNBERG, A. K.
            </ReferenceAuthors>
            <ReferenceJournal>Ambio, 35 (8), 469-475, 2006</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Reservoir surface as source of greenhouse gases to the atmosphere: a global estimate
            </ReferenceTitle>
            <ReferenceAuthors>
              ST-LOUIS, V. ; KELLY, C. A. ; DUCHEMIN, E. ; RUDD, J. W. ; ROSENBERG, D. M.
            </ReferenceAuthors>
            <ReferenceJournal>Bioscience, 50, 9:766-775, 2000</ReferenceJournal>
          </ReferenceItem>

          <CategoryTitle>Estudos sobre Peatlands e Zonas Úmidas</CategoryTitle>

          <ReferenceItem>
            <ReferenceTitle>
              Carbon cycling in Australian wetlands: the importance of methane
            </ReferenceTitle>
            <ReferenceAuthors>BOON P. I.</ReferenceAuthors>
            <ReferenceJournal>Verh. Internat. Verein. Limnol., 27:37-50, 2000</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Methane emissions from natural peatlands on the northern boreal zone on Finland,
              Fennoscandia
            </ReferenceTitle>
            <ReferenceAuthors>
              HUTTUNEN, J. T. ; NYKÄNEN, H. ; TURUNEN, J. ; MARTIKAINEN, P. J.
            </ReferenceAuthors>
            <ReferenceJournal>Atmospheric Environment 37, 147-151, 2003</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Fluxes of nitrous oxide on natural peatlands in Vuotos, an area projected for a
              hydroelectric reservoir in northern Finland
            </ReferenceTitle>
            <ReferenceAuthors>
              HUTTUNEN, J. T. ; NYKÄNEN, H. ; TURUNEN, J. ; NENONEN, O. ; MARTIKAINEN, P. J.
            </ReferenceAuthors>
            <ReferenceJournal>SUO, 53, 87-96, 2002</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Long-term effects of boreal reservoirs on the landscape-atmosphere N2O exchange
            </ReferenceTitle>
            <ReferenceAuthors>HUTTUNEN, J. T. ; MARTIKAINEN, P. J.</ReferenceAuthors>
            <ReferenceJournal>
              Verhandlungen der Internationalen Vereinigung für Theoretische und Angewandte
              Limnologie, 29, 607-611, 2005
            </ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Long-term effects of nortern reservoirs on the landscape-scale CH4 and N2O exchanges
            </ReferenceTitle>
            <ReferenceAuthors>HUTTUNEN, J. T. ; MARTIKAINEN, P. J.</ReferenceAuthors>
            <ReferenceJournal>
              Report Series in Aerosol Science No. 81A. Yliopistopaino, Helsinki, 197-201, 2005
            </ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Long-term net methane release from finish hydro reservoirs
            </ReferenceTitle>
            <ReferenceAuthors>HUTTUNEN, J. T. ; MARTIKAINEN, P. J.</ReferenceAuthors>
            <ReferenceJournal>
              Global Warming and Hydroeletric Reservoirs, op. cit., pp. 125-135, 2005
            </ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Effect of temperature on production of CH4 and CO2 from peat in a natural and flooded
              boreal forest wetland
            </ReferenceTitle>
            <ReferenceAuthors>
              MCKENZIE, C. ; SCHIFF, S. ; ARAVENA, R. ; KELLY, C. ; ST. LOUIS, V.
            </ReferenceAuthors>
            <ReferenceJournal>Climatic change, 40: 247-266, 1998</ReferenceJournal>
          </ReferenceItem>

          <CategoryTitle>Estudos Experimentais e de Campo</CategoryTitle>

          <ReferenceItem>
            <ReferenceTitle>
              Experimenting with hydroelectric reservoirs: researchers created reservoirs in Canada
              to explore the impacts of hydroelectric developments on greenhouse gas and
              methylmercury production
            </ReferenceTitle>
            <ReferenceAuthors>
              BODALY, R. A. ; BEATY, K. G. ; HENDZEL, L. ; MAJEWSKI, A. R. ; PATERSON, M. J. ;
              ROLFHUS, K. R. ; PENN, A. F. ; ST. LOUIS, V. L. ; HALL, B. ; MATTHEWS, C. J. D. ;
              CHEREWYK, K. ; MAILMAN, M. ; PHURLEY, J. ; CHIFF, S. S. ; VENKITESWARAN, J. J.
            </ReferenceAuthors>
            <ReferenceJournal>Environmental Science & Technology, 347-352, 2004</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Increases in fluxes of greenhouse gases and methyl mercury following flooding of an
              experimental reservoir
            </ReferenceTitle>
            <ReferenceAuthors>
              KELLY, C. A. ; RUDD, W. M. ; BODALY, R. A. ; ROULET, N. P. ; ST. LOUIS, V. L. ; HEYES,
              A. ; MOORE, T. R. ; SCHIFF, S. ; ARAVENA, R. ; SCOTT, K. J. ; DYCK; B. ; HARRIS, R. ;
              WARNER, B. ; EDWARDS, G.
            </ReferenceAuthors>
            <ReferenceJournal>Environment Science Technology, 31, 1334-1344, 1997</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Carbon Dioxide and Methane production in small reservoirs flooding upland boreal
              forest
            </ReferenceTitle>
            <ReferenceAuthors>
              MATTHEWS, C. J. D. ; JOYCE, E. M. ; ST. LOUIS, V. L. ; SCHIFF, S. L. ; VENKITESWARAN,
              J. J. ; HALL, B. D. ; BODALY, R. A. ; BEATY, K. G.
            </ReferenceAuthors>
            <ReferenceJournal>Ecosystems, 8: 267-285, 2005</ReferenceJournal>
          </ReferenceItem>

          <CategoryTitle>Estudos sobre Óxido Nitroso (N2O)</CategoryTitle>

          <ReferenceItem>
            <ReferenceTitle>
              Nitrous oxide emissions to the atmosphere from an artificially oxygenated lake
            </ReferenceTitle>
            <ReferenceAuthors>MEYER, M. ; GÄCHTER, R. ; WEHRLI, B.</ReferenceAuthors>
            <ReferenceJournal>Limnol. Oceanogr., 41:548-553, 1996</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Emission of CO2, CH4 and N2O from lakeshore soils in an Antarctic dry valley
            </ReferenceTitle>
            <ReferenceAuthors>
              GREGORICH, E. G. ; HOPKINS, D. W. ; ELBERLING, B. ; SPARROW, A. D. ; NOVIS, P. ;
              GREENFIELD, L. G. ; ROCHETTE, P.
            </ReferenceAuthors>
            <ReferenceJournal>Soil Biology & Biochemistry, 38, 3120-3129, 2006</ReferenceJournal>
          </ReferenceItem>

          <CategoryTitle>Estudos sobre Transferência de Gases</CategoryTitle>

          <ReferenceItem>
            <ReferenceTitle>
              Aquatic cycling and hydrosphere to troposphere transport of reduced gases - A review
            </ReferenceTitle>
            <ReferenceAuthors>ADAMS, D. D.</ReferenceAuthors>
            <ReferenceJournal>
              In: D. D. Adams, S. P. Seitzinger and P. M. Crill, Mitteilungen (Communications) No.
              25, International Association of Theoretical and Applied Limnology (SIL). Publisher:
              E. Schweizerbart'sche Verlagsbuchhandlungen, Stuttgart, Germany, pp. 1-13, 1996
            </ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Gas transfer velocities of CO2 and CH4 in a tropical reservoir and its river
              downstream
            </ReferenceTitle>
            <ReferenceAuthors>
              GUÉRIN, F. ; ABRIL, G. ; SERÇA, D. ; DELON, C. ; RICHARD, S. ; DELMAS, R. ; TREMBLAY,
              A. ; VARFALVY, L.
            </ReferenceAuthors>
            <ReferenceJournal>Journal of Marine Systems, 66, 161-172, 2006</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Methane oxidation: isotopic enrichment factors in freshwater boreal reservoirs
            </ReferenceTitle>
            <ReferenceAuthors>VENKITESWARAN, J. J. ; SCHIFF, S. L.</ReferenceAuthors>
            <ReferenceJournal>Applied Geochemistry, 20, 683-690, 2005</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>Gas exchange in ecosystems: framework and case studies</ReferenceTitle>
            <ReferenceAuthors>
              WADA, E. ; LEE, J. A. ; KIMURA, M. ; KOIKE, I. ; REEBURGH, W. S. ; TUNDISI, J. G. ;
              YOSHINARI, T. ; YOSHIOKA, T. ; VAN VUUREN, M. M. I.
            </ReferenceAuthors>
            <ReferenceJournal>Jpn. J. Limnol., 52, 4:263-281, 1991</ReferenceJournal>
          </ReferenceItem>

          <CategoryTitle>Estudos sobre Matéria Orgânica e Carbono</CategoryTitle>

          <ReferenceItem>
            <ReferenceTitle>
              Sources and transfers of particulate organic matter in a tropical reservoir ( Petit
              Saut, French Guiana): a multitracers analysis using d13C, C/N ratio and pigments
            </ReferenceTitle>
            <ReferenceAuthors>DEJUNET, A. ; ABRIL, G. ; GUÉRIN, F. ; WIT, R.</ReferenceAuthors>
            <ReferenceJournal>Submitted December 2006</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Production of carbon dioxide and methane by flooded tropical soils during anoxic
              incubations: Implication for atmospheric emissions from a hydroelectric reservoir
              (Petit Saut, French Guiana)
            </ReferenceTitle>
            <ReferenceAuthors>GUÉRIN, F. ; ABRIL, G. ; DEJUNET, A. ; DELMAS, R.</ReferenceAuthors>
            <ReferenceJournal>Under preparation</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Methane and carbon emissions from tropical reservoirs: significance of downstream
              rivers
            </ReferenceTitle>
            <ReferenceAuthors>
              GUÉRIN, F. ; ABRIL, G. ; RICHARD, S. ; BURBAN, B. ; REYNOUARD, C. ; SEYLER, P. ;
              DELMAS, R.
            </ReferenceAuthors>
            <ReferenceJournal>Geophysical Research Letters, 33, L21407, 2006</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Hydrologic sources of carbon cycling uncertainty throughout the terrestrial-aquatic
              continuum
            </ReferenceTitle>
            <ReferenceAuthors>JENERETTE, G. D. ; LAL, R.</ReferenceAuthors>
            <ReferenceJournal>Global Change Biology, 11, 1873-1882, 2005</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Contribution of tropical ecosystems to the global budgets of trace gases, especially
              CH4, H2, CO, and N2O
            </ReferenceTitle>
            <ReferenceAuthors>SEILER, W. ; CONRAD, R.</ReferenceAuthors>
            <ReferenceJournal>
              In: R.E. Dickenson (ed.), The Geophysiology of Amazonia, Vegetation and Climate
              Interactions. John-Wiley, NY, 1987
            </ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>Atmospheric methane - tropical sources</ReferenceTitle>
            <ReferenceAuthors>STREET-PERROTT, F. A.</ReferenceAuthors>
            <ReferenceJournal>Nature, 355:23-24, 1992</ReferenceJournal>
          </ReferenceItem>

          <CategoryTitle>Estudos sobre Energia e Políticas Energéticas</CategoryTitle>

          <ReferenceItem>
            <ReferenceTitle>
              Greenhouse gas emissions from hydropower: The state of research in 1996
            </ReferenceTitle>
            <ReferenceAuthors>GAGNON, L. ; VATE, VAN DE J. F.</ReferenceAuthors>
            <ReferenceJournal>Energy Policy, 25,(I),7-13, 1997</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Greenhouse Gas Emissions from Energy Systems: Comparision and Overview
            </ReferenceTitle>
            <ReferenceAuthors>DONES, R. ; HECK, T. ; HIRSCHBERG, S.</ReferenceAuthors>
            <ReferenceJournal>
              In PSI Annual Report, Annex IV, Paul Scherrer Institut, Villigen, Switzerland, 27-40,
              2003
            </ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Greenhouse gas emissions from building and operating electric power plants in the
              upper Colorado river basin
            </ReferenceTitle>
            <ReferenceAuthors>PACCA, S. ; HORVATH, A.</ReferenceAuthors>
            <ReferenceJournal>Environment Science Technology, 36, 3194-3200, 2002</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Global warming potentials: the case of emissions from dams
            </ReferenceTitle>
            <ReferenceAuthors>ROSA, L. P. ; SHAEFFER, R.</ReferenceAuthors>
            <ReferenceJournal>Energy Policy, 23 (2), pp. 149-158, 1995</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Methane and Carbon Dioxide emissions of hydroelectric power plants in the Amazon
              compared to thermoelectric equivalents
            </ReferenceTitle>
            <ReferenceAuthors>ROSA, L. P. ; SHAEFFER, R. ; SANTOS, M. A.</ReferenceAuthors>
            <ReferenceJournal>
              Unpublished report, Energy Planning Program, COPPE/UFRJ, August, 1994 (manuscript, 48
              pp.)
            </ReferenceJournal>
          </ReferenceItem>

          <CategoryTitle>Estudos sobre Florestas Tropicais</CategoryTitle>

          <ReferenceItem>
            <ReferenceTitle>
              The effect of termite biomass and anthropogenic on the CH4 budgets of tropical forests
              in Cameroon and Borneo
            </ReferenceTitle>
            <ReferenceAuthors>
              MACDONALD, J. A. ; JEEVA, D. ; EGGLETON, P. ; DAVIES, R. ; BIGNELL, D. E. ; FOWLER, D.
              ; LAWTON, J. ; MARYATI, M.
            </ReferenceAuthors>
            <ReferenceJournal>Global change Biology, 5, 869-879, 1999</ReferenceJournal>
          </ReferenceItem>

          <CategoryTitle>Estudos sobre Reservatórios Boreal</CategoryTitle>

          <ReferenceItem>
            <ReferenceTitle>
              Emission of CO2 from hydroelectric reservoirs in northern Sweden
            </ReferenceTitle>
            <ReferenceAuthors>
              BERGSTRÖM, ANN-K. ; ALGESTEN, G. ; SOBEK, S. ; TRANVIK, L. ; JANSSON, M.
            </ReferenceAuthors>
            <ReferenceJournal>Arch. Hydrobiol., 159 1 25-42, 2004</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Production of greenhouse gases CH4 and CO2 by hydroelectric reservoirs of the boreal
              region
            </ReferenceTitle>
            <ReferenceAuthors>DUCHEMIN, E. ; LUCOTTE, M. ; CANUEL, R.</ReferenceAuthors>
            <ReferenceJournal>
              Global Biogeochemical Cycles, vol 9, no 4, p. 529-540, 1995
            </ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              First assessment of methane and carbon dioxide emissions from shallow and deep zones
              of boreal reservoirs upon ice break-up
            </ReferenceTitle>
            <ReferenceAuthors>
              DUCHEMIN, E. ; LUCOTTE, M. ; CANUEL, R. ; SOUMIS, N.
            </ReferenceAuthors>
            <ReferenceJournal>
              Lakes & Reservoirs: Research and Management, 11: 9-19, 2006
            </ReferenceJournal>
          </ReferenceItem>

          <CategoryTitle>Estudos sobre Reservatórios Tropicais</CategoryTitle>

          <ReferenceItem>
            <ReferenceTitle>
              Long term greenhouse gas emissions from hydroelectric reservoirs in tropical forest
              regions
            </ReferenceTitle>
            <ReferenceAuthors>
              GALY-LACAUX, C. ; DELMAS, R. ; KOUADIO, G. ; RICHARD, S. ; GOSSE, P.
            </ReferenceAuthors>
            <ReferenceJournal>Global Biogeochemical Cycles, 13, 503-517, 1999</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Emission de Méthane et consommation d'oxygène dans le retenue de Petit Saut en Guyane
            </ReferenceTitle>
            <ReferenceAuthors>
              GALY-LACAUX, C. ; JAMBERT, C. ; DELMAS, R. ; DUMESTRE, J. F. ; LABROUE, L. ; CERDAN,
              P. ; RICHARD, S.
            </ReferenceAuthors>
            <ReferenceJournal>Comptes Rendus de I</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Evolution of physico-chemical water quality and methane emissions in the tropical
              hydroelectric reservoir of Petit Saut (French Guiana)
            </ReferenceTitle>
            <ReferenceAuthors>
              RICHARD, S. ; GALY-LACAUX, C. ; ARNOUX, A. ; CERDAN, P. ; DELMAS, R. ; DUMESTRE, J. F.
              ; GOSSE, P. ; HOREAU, V. ; LABROUE, L. ; SISSAKIAN, C.
            </ReferenceAuthors>
            <ReferenceJournal>
              Verhandlungen der Internationalen Vereinigung für Theoretische und Angewandte
              Limnologie, 27, 1454-1458, 2000
            </ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Impact of methane oxidation in tropical reservoirs on greenhouse gas fluxes and water
              quality
            </ReferenceTitle>
            <ReferenceAuthors>
              RICHARD, S. ; GOSSE, P. ; GRÉGOIRE, A. ; DELMAS, R. ; GALY LACAUX, C.
            </ReferenceAuthors>
            <ReferenceJournal>In: A. Tremblay et. al. op. cit., 329-560</ReferenceJournal>
          </ReferenceItem>

          <CategoryTitle>Estudos sobre Rios e Sistemas Fluviais</CategoryTitle>

          <ReferenceItem>
            <ReferenceTitle>
              Evolution and relationship between 3 dissolved gases (oxygen, methane, and carbon
              dioxide) over a 10-year period (1994-2003) in a river downstream of a new
              intertropical dam
            </ReferenceTitle>
            <ReferenceAuthors>
              GOSSE, P. ; ABRIL, G. ; GUÉRIN, F. ; RICHARD, S. ; DELMAS, R.
            </ReferenceAuthors>
            <ReferenceJournal>
              Verhandlungen der Internationalen Vereinigung für Theoretische und Angewandte
              Limnologie, 29, 594-600, 2005
            </ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Evolution and relationships of greenhouse gases and dissolved oxygen during 1994-2003
              in a river downstream of a tropical reservoir
            </ReferenceTitle>
            <ReferenceAuthors>
              GOSSE, P. ; ABRIL, G. ; GUERIN, F. ; RICHARD, S. ; DELMAS, R.
            </ReferenceAuthors>
            <ReferenceJournal>
              Verhandlungen der Internationalen Vereinigung für Theoretische und Angewandte
              Limnologie, 29, 594-600, 2005
            </ReferenceJournal>
          </ReferenceItem>

          <CategoryTitle>Estudos sobre Gases e Emissões</CategoryTitle>

          <ReferenceItem>
            <ReferenceTitle>
              Gaseuos emission and oxygen consumption in hydroelectric dams. A case study in French
              Guiana
            </ReferenceTitle>
            <ReferenceAuthors>
              GALY-LACAUX, C. ; DELMAS, R. ; DUMESTRE, J. F. ; LABROUE, L. ; GOSSE, P.
            </ReferenceAuthors>
            <ReferenceJournal>Global Biogeochemical Cycles, 11, 471-483, 1997</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Long term greenhouse gas emissions from the hydroelectric reservoir of Petit Saut
              (French Guiana) and potencial impacts
            </ReferenceTitle>
            <ReferenceAuthors>
              DELMAS, R. ; RICHARD, S. ; GUÉRIN, F. ; ABRIL, G. ; GALY-LACAUX, C. ; DELON, C ;
              GRÉGOIRE, A.
            </ReferenceAuthors>
            <ReferenceJournal>
              In: Greenhouse gases emissions from natural environments and hydroelectric reservoirs:
              fluxes and processes, A. Tremblay, L. Varfalvy, C. Roehm and M. Garneau (Eds)
              Springer-Verlag, 293-312
            </ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Emission of greenhouse gases from the tropical hydroelectric reservoir of Petit Saut
              (French Guiana) compared with emissions from thermal alternatives
            </ReferenceTitle>
            <ReferenceAuthors>DELMAS, R. ; GALY-LACAUX, C. ; RICHARD, S.</ReferenceAuthors>
            <ReferenceJournal>Global Biogeochemical Cycles, 15, 993-1003, 2001</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Comparison of greenhouse gas emissions from an old tropical reservoir with those from
              other reservoirs worldwide
            </ReferenceTitle>
            <ReferenceAuthors>
              DUCHEMIN, E. ; LUCOTTE, M. ; CANUEL, R. ; QUEIROZ, A. G. ; ALMEIDA, D. C. ; PEREIRA,
              H. C. ; DEZINCOURT, J.
            </ReferenceAuthors>
            <ReferenceJournal>Verh. Internat. Verein. Limnol., 27:1391-1395, 2000</ReferenceJournal>
          </ReferenceItem>

          <CategoryTitle>Estudos sobre Metodologias de Inventário</CategoryTitle>

          <ReferenceItem>
            <ReferenceTitle>
              CH4 emissions from flooded land: Basis for future methodological development
            </ReferenceTitle>
            <ReferenceAuthors>
              DUCHEMIN, E. ; HUTTUNEN, J. T. ; TREMBLAY, A. ; DELMAS, R. ; MENEZES, C. F. S.
            </ReferenceAuthors>
            <ReferenceJournal>IGES, Kanagawa, Japan, pp. Ap3.1 - Ap3.8</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Possible approach for estimating CO2 emissions from lands converted to permanently
              flooded land: Basis for future methodological development
            </ReferenceTitle>
            <ReferenceAuthors>
              DUCHEMIN, E. ; HUTTUNEN, J. T. ; TREMBLAY, A. ; DELMAS, R. ; MENEZES, C. F. S.
            </ReferenceAuthors>
            <ReferenceJournal>IGES, Kanagawa, Japan, pp. Ap2.1 - Ap2.9</ReferenceJournal>
          </ReferenceItem>

          <CategoryTitle>Estudos sobre Carbono e Balanços</CategoryTitle>

          <ReferenceItem>
            <ReferenceTitle>Carbon budget in tropical reservoirs</ReferenceTitle>
            <ReferenceAuthors>
              SANTOS, M. A. ; MATVIENKO, B. ; SANTOS, E. O. ; ROSA, L. P. ; ALMEIDA, C. H .E. ;
              SILVA, M. B. ; BENTES JR, A. P. ; SIKAR, E. ; PATCHINEELAM, S. R.
            </ReferenceAuthors>
            <ReferenceJournal>
              Global Warming and Hydroelectric Reservoirs, op. cit., 95-100, 2005
            </ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>Gas release in the filing stage</ReferenceTitle>
            <ReferenceAuthors>
              SANTOS, M. A. ; MATVIENKO, B. ; SIKAR, E. ; ROSA, L. P. ; FILLIPO, R. ; CIMBLERIS, A.
            </ReferenceAuthors>
            <ReferenceJournal>
              Verhandlungen der Internationalen Vereinigung für Theoretische und Angewandte
              Limnologie, 27, 1415-1419, 2000
            </ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>Gas release from a reservoir in the filling stage</ReferenceTitle>
            <ReferenceAuthors>
              SIKAR, B. M. ; SIKAR, E. ; ROSA, L. P. ; SANTOS, M. A. ; FILIPPO, R. ; CIMBLERIS, A.
              C. P.
            </ReferenceAuthors>
            <ReferenceJournal>Verh. Internat. Verein. Limnol., 27:1-5, 2000</ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Greenhouse gases and initial findings on the carbon circulation in two reservoirs and
              their watersheds
            </ReferenceTitle>
            <ReferenceAuthors>
              SIKAR, E. ; SANTOS, M. A. ; MATVIENKO, B. ; SILVA, M. B. ; ROCHA, C. H. E. D. ;
              SANTOS, E. O. ; BENTES JR, A. P. ; ROSA, L. P.
            </ReferenceAuthors>
            <ReferenceJournal>
              Verhandlungen der Internationalen Vereinigung für Theoretische und Angewandte
              Limnologie, 29, 573-576, 2005
            </ReferenceJournal>
          </ReferenceItem>

          <CategoryTitle>Estudos sobre Integração e Gestão</CategoryTitle>

          <ReferenceItem>
            <ReferenceTitle>
              Integration of research and management in optimizing multiple uses of reservoirs: the
              experience in South America and Brazilian case studies
            </ReferenceTitle>
            <ReferenceAuthors>TUNDISI, J. G. ; MATSUMURA,T.</ReferenceAuthors>
            <ReferenceJournal>Hydrobiologia, 500: 231-242, 2003</ReferenceJournal>
          </ReferenceItem>

          <CategoryTitle>Estudos sobre Incertezas e Revisões</CategoryTitle>

          <ReferenceItem>
            <ReferenceTitle>
              Certainty and uncertainty in the science of greenhouse gas emissions from
              hydroelectric reservoirs
            </ReferenceTitle>
            <ReferenceAuthors>ROSA, L. P. ; SANTOS, M. A.</ReferenceAuthors>
            <ReferenceJournal>
              Thematic Review II.2 prepared as an input to the World Commission on Dams, Cape Town,
              2000
            </ReferenceJournal>
          </ReferenceItem>

          <ReferenceItem>
            <ReferenceTitle>
              Scientific errors in the Fearnside comments on Greenhouse Gas Emissions (GHG) from
              hydroelectric dams and response to his political claiming
            </ReferenceTitle>
            <ReferenceAuthors>
              ROSA, L. P. ; SANTOS, M. A. ; MATVIENKO, B. ; SIKAR, E. ; SANTOS, E. O.
            </ReferenceAuthors>
            <ReferenceJournal>Climatic Change, 75: 91-102, 2006</ReferenceJournal>
          </ReferenceItem>

          <CategoryTitle>Estudos sobre Regiões Boreais</CategoryTitle>

          <ReferenceItem>
            <ReferenceTitle>
              The issue of greenhouse gases from hydroeletric reservoirs: from boreal to tropical
              regions
            </ReferenceTitle>
            <ReferenceAuthors>
              TREMBLAY, A. ; VARFALVY, L. ; ROEHM, C. ; GARNEAU, M.
            </ReferenceAuthors>
            <ReferenceJournal></ReferenceJournal>
          </ReferenceItem>

          <CategoryTitle>Estudos sobre Reservatórios e Gases de Efeito Estufa</CategoryTitle>

          <ReferenceItem>
            <ReferenceTitle>Reservoirs and Greenhouse Gases</ReferenceTitle>
            <ReferenceAuthors>
              ADAMS, D. D. ; DELMAS, R. ; LE, M. ; VARFALVY L. ; NOVO, E. M. L. M. ; GOSSE P. ;
              BOON, P.
            </ReferenceAuthors>
            <ReferenceJournal>
              Reservoirs and Greenhouse Gases, special session 42 at Societas Internationalis
              Limnologiae, Monash University, Melbourne, Australia, 2001
            </ReferenceJournal>
          </ReferenceItem>
        </Section>
      </MainContent>
    </FurnasPesquisasCorrelatasContainer>
  );
}

export default FurnasPesquisasCorrelatasPage;
