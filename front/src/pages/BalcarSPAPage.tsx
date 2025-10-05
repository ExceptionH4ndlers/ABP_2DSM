import styled from "styled-components";
import { MapPin, Database, Building2, Archive, DollarSign, Users } from "lucide-react";
import logoBalcar from "../../img/logoBalcar.png";
import logoInpe from "../../img/balcar/logoInpe.png";
import logoIie from "../../img/balcar/logoIie.png";
import logoUfjf from "../../img/balcar/logoUfjf.png";
import logoCoppe from "../../img/balcar/logoCoppe.png";
import logoFurnas from "../../img/balcar/logoFurnas.png";

const BalcarSPAContainer = styled.div`
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
  font-size: 2.2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const SectionSubtitle = styled.p`
  font-size: 1.1rem;
  color: #64748b;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const Placeholder = styled.div`
  border: 2px dashed #cbd5e1;
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  color: #64748b;
`;

const HeroLogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
`;

const HeroLogo = styled.img`
  height: 120px;
  object-fit: contain;
  filter: drop-shadow(0 2px 8px rgba(0,0,0,0.08));
`;

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 0.75rem 0;
`;

const SectionText = styled.p`
  font-size: 1.05rem;
  color: #475569;
  line-height: 1.75;
  margin: 0 0 1rem 0;
`;

const BulletList = styled.ul`
  margin: 0.5rem 0 1.25rem 1.25rem;
  color: #475569;
  line-height: 1.6;
`;

const GroupTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin: 1rem 0 0.75rem 0;
`;

const TeamGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const TeamGrid = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 1.25rem 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 0.75rem 1rem;
`;

const PersonItem = styled.li`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 0.75rem 1rem;
`;

const PersonName = styled.span`
  color: #111827;
  font-weight: 600;
`;

const NameLink = styled.a`
  color: #111827;
  font-weight: 600;
  text-decoration: none;
  &:hover { text-decoration: underline; }
`;

const PersonMeta = styled.div`
  color: #6b7280;
  font-size: 0.9rem;
  margin-top: 0.25rem;
`;

const InstitutionTag = styled.span`
  font-weight: 600;
  color: #374151;
`;

// removed unused styled blocks related to the old "Sobre a Base de Dados" section


const SupportGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1.25rem;
  align-items: center;
`;

const SupportCard = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SupportLogo = styled.img`
  max-height: 56px;
  max-width: 100%;
  object-fit: contain;
  filter: saturate(1.05) contrast(1.02);
`;

function BalcarSPAPage() {
  return (
    <BalcarSPAContainer>
      <MainContent>
        <Section id="home">
          <HeroContainer>
            <HeroLogoWrapper>
              <HeroLogo src={logoBalcar} alt="BALCAR" />
            </HeroLogoWrapper>
            <HeroTitle>BALCAR</HeroTitle>
            <SectionSubtitle>
              Projeto Balanço de Carbono nos Reservatórios de FURNAS Centrais Elétricas S.A.
            </SectionSubtitle>
          </HeroContainer>
        </Section>

        <Section id="portal">
          <SectionTitle>
            <Database size={20} /> Portal
          </SectionTitle>
          <SectionText>
            Este portal constitui a interface de acesso aos dados do Projeto Balanço de Carbono nos
            Reservatórios de FURNAS Centrais Elétricas S.A. A base de dados é formada por coletas
            in situ de equipes que tinham como objetivo obter dados para:
          </SectionText>
          <BulletList>
            <li>
              determinar as emissões de gases de efeito estufa: gás carbônico, metano e óxido
              nitroso, dos reservatórios das hidrelétricas;
            </li>
            <li>
              identificar as rotas do ciclo do carbono nesses reservatórios e os fatores ambientais
              envolvidos;
            </li>
            <li>
              avaliar a influência dos fatores morfológicos, morfométricos, biogeoquímicos e
              operacionais dos reservatórios na emissão de gases de efeito estufa;
            </li>
            <li>
              determinar o padrão de emissão existente, anteriormente à construção de
              reservatórios;
            </li>
            <li>
              elaborar um modelo espacial e temporal de emissão de gases para reservatórios
              implantados em ambientes de cerrado.
            </li>
          </BulletList>
          <SectionText>
            A interface de acesso permite personalizar consultas aos dados para o download,
            visualização em tabelas dinâmicas e visualizar a distribuição espacial dos dados em mapa
            interativo do Google Maps.
          </SectionText>
        </Section>

        <Section id="dados-armazenados">
          <SectionTitle>
            <Archive size={20} /> Dados Armazenados
          </SectionTitle>
          <SectionText>
            Os dados são formados por coletas realizadas em 79 campanhas com datas e localidades
            (reservatórios) distintos com o objetivo de coletar parâmetros na interface água-sedimento,
            coluna d'água e interface água-atmosfera. Mais detalhes sobre a base de dados podem ser
            encontrados em "descrição".
          </SectionText>
          <SectionText>
            Cada instituição participante tinha como objetivo estudar uma componente, e por consequência
            fazer leituras de parâmetros relacionados:
          </SectionText>
          <BulletList>
            <li>
              <strong>IIE:</strong> estimativas de fluxos de gases de efeito estufa e das concentrações
              de carbono e nutrientes na interface água-sedimento;
            </li>
            <li>
              <strong>INPE:</strong> fluxos de gases metano (CH₄) e dióxido de carbono (CO₂) na interface
              água-atmosfera;
            </li>
            <li>
              <strong>UFJF:</strong> determinação da produção primária, metabolismo bacteriano e
              concentrações de nutrientes na coluna d'água;
            </li>
            <li>
              <strong>UFRJ/COPPE:</strong> estimativa de fluxos de gases de efeito estufa na interface
              água-atmosfera e determinação do aporte e das taxas de sedimentação de carbono.
            </li>
          </BulletList>
        </Section>

        <Section id="fomento">
          <SectionTitle>
            <DollarSign size={20} /> Fomento
          </SectionTitle>
          <SectionText>
            Os recursos utilizados para a coleta da base de dados foram fornecidos por FURNAS Centrais
            Elétricas S.A. no âmbito da lei 9.991/2000, que estabelece um investimento mínimo anual de
            1% de seu lucro líquido, das companhias geradoras de eletricidade, em pesquisa e
            desenvolvimento no setor elétrico. Os procedimentos para os projetos são determinados pela
            Agência Nacional de Energia Elétrica (ANEEL).
          </SectionText>
        </Section>

        <Section id="equipe">
          <SectionTitle>
            <Users size={20} /> Equipe
          </SectionTitle>
          <TeamGroup>
            <GroupTitle>Coordenação Geral</GroupTitle>
            <TeamGrid>
              <PersonItem>
                <NameLink href="http://lattes.cnpq.br/5535667070825818" target="_blank" rel="noopener noreferrer">André Carlos Prates Cimbleris</NameLink>
                <PersonMeta>Coordenação Geral</PersonMeta>
              </PersonItem>
            </TeamGrid>
          </TeamGroup>

          <TeamGroup>
            <GroupTitle>Coordenação por Instituição</GroupTitle>
            <TeamGrid>
              <PersonItem>
                <NameLink href="http://lattes.cnpq.br/4775535537651746" target="_blank" rel="noopener noreferrer">Donato Seiji Abe</NameLink>
                <PersonMeta><InstitutionTag>IIE</InstitutionTag></PersonMeta>
              </PersonItem>
              <PersonItem>
                <NameLink href="http://lattes.cnpq.br/2691497637313274" target="_blank" rel="noopener noreferrer">José Luiz Stech</NameLink>
                <PersonMeta><InstitutionTag>INPE</InstitutionTag></PersonMeta>
              </PersonItem>
              <PersonItem>
                <NameLink href="http://lattes.cnpq.br/0567809153346429" target="_blank" rel="noopener noreferrer">Fábio Roland</NameLink>
                <PersonMeta><InstitutionTag>UFJF</InstitutionTag></PersonMeta>
              </PersonItem>
              <PersonItem>
                <NameLink href="http://lattes.cnpq.br/4155308755013168" target="_blank" rel="noopener noreferrer">Marco Aurélio dos Santos</NameLink>
                <PersonMeta><InstitutionTag>UFRJ/COPPE</InstitutionTag></PersonMeta>
              </PersonItem>
            </TeamGrid>
          </TeamGroup>

          <TeamGroup>
            <GroupTitle>Responsáveis pelas Coletas e Análises</GroupTitle>
            <TeamGrid>
              <PersonItem>
                <NameLink href="http://lattes.cnpq.br/8150880476098677" target="_blank" rel="noopener noreferrer">Arcilan Trevenzoli Assireu</NameLink>
                <PersonMeta><InstitutionTag>INPE</InstitutionTag></PersonMeta>
              </PersonItem>
              <PersonItem>
                <NameLink href="http://lattes.cnpq.br/5987354282647527" target="_blank" rel="noopener noreferrer">Bohdan Matvienko Sikar</NameLink>
                <PersonMeta><InstitutionTag>UFRJ/COPPE</InstitutionTag></PersonMeta>
              </PersonItem>
              <PersonItem>
                <NameLink href="http://lattes.cnpq.br/7663009286545108" target="_blank" rel="noopener noreferrer">Corina Verónica Sidagis Galli</NameLink>
                <PersonMeta><InstitutionTag>IIE</InstitutionTag></PersonMeta>
              </PersonItem>
              <PersonItem>
                <NameLink href="http://lattes.cnpq.br/1002426943626438" target="_blank" rel="noopener noreferrer">Ednaldo Oliveira dos Santos</NameLink>
                <PersonMeta><InstitutionTag>UFRJ/COPPE</InstitutionTag></PersonMeta>
              </PersonItem>
              <PersonItem>
                <NameLink href="http://lattes.cnpq.br/2838003403761263" target="_blank" rel="noopener noreferrer">Elizabeth Matvienko Sikar</NameLink>
                <PersonMeta><InstitutionTag>UFRJ/COPPE</InstitutionTag></PersonMeta>
              </PersonItem>
              <PersonItem>
                <NameLink href="http://lattes.cnpq.br/7510713692919710" target="_blank" rel="noopener noreferrer">Felipe Siqueira Pacheco</NameLink>
                <PersonMeta><InstitutionTag>UFJF</InstitutionTag></PersonMeta>
              </PersonItem>
              <PersonItem>
                <NameLink href="http://lattes.cnpq.br/1341263338653176" target="_blank" rel="noopener noreferrer">Ivan Bergier Tavares de Lima</NameLink>
                <PersonMeta><InstitutionTag>INPE</InstitutionTag></PersonMeta>
              </PersonItem>
              <PersonItem>
                <NameLink href="http://lattes.cnpq.br/7301878639558446" target="_blank" rel="noopener noreferrer">Luciano Marani</NameLink>
                <PersonMeta><InstitutionTag>INPE</InstitutionTag></PersonMeta>
              </PersonItem>
              <PersonItem>
                <NameLink href="http://lattes.cnpq.br/7511312374795216" target="_blank" rel="noopener noreferrer">Nathan Oliveira Barros</NameLink>
                <PersonMeta><InstitutionTag>UFJF</InstitutionTag></PersonMeta>
              </PersonItem>
              <PersonItem>
                <NameLink href="http://lattes.cnpq.br/0578519055132957" target="_blank" rel="noopener noreferrer">Plínio Carlos Alvalá</NameLink>
                <PersonMeta><InstitutionTag>INPE</InstitutionTag></PersonMeta>
              </PersonItem>
            </TeamGrid>
          </TeamGroup>

          <TeamGroup>
            <GroupTitle>Gerente de Rede do Portal</GroupTitle>
            <TeamGrid>
              <PersonItem>
                <PersonName>João Benedito Diehl</PersonName>
                <PersonMeta>Gerente de Rede</PersonMeta>
              </PersonItem>
            </TeamGrid>
          </TeamGroup>
        </Section>

        

        

        <Section id="apoio">
          <SectionTitle>
            <Building2 size={20} /> Apoio Institucional
          </SectionTitle>
          <SectionSubtitle>
            Instituições parceiras e financiadoras.
          </SectionSubtitle>
          <SupportGrid>
            <SupportCard>
              <a href="https://www.furnas.com.br/" target="_blank" rel="noopener noreferrer">
                <SupportLogo src={logoFurnas} alt="Furnas Centrais Elétricas" />
              </a>
            </SupportCard>
            <SupportCard>
              <a href="https://coppe.ufrj.br/" target="_blank" rel="noopener noreferrer">
                <SupportLogo src={logoCoppe} alt="COPPE/UFRJ" />
              </a>
            </SupportCard>
            <SupportCard>
              <a href="https://www2.ufjf.br/ufjf/" target="_blank" rel="noopener noreferrer">
                <SupportLogo src={logoUfjf} alt="UFJF" />
              </a>
            </SupportCard>
            <SupportCard>
              <a href="https://www.iie.com.br/" target="_blank" rel="noopener noreferrer">
                <SupportLogo src={logoIie} alt="IIEGA" />
              </a>
            </SupportCard>
            <SupportCard>
              <a href="https://www.gov.br/inpe/pt-br" target="_blank" rel="noopener noreferrer">
                <SupportLogo src={logoInpe} alt="INPE" />
              </a>
            </SupportCard>
          </SupportGrid>
        </Section>

        <Section id="mapa">
          <SectionTitle>
            <MapPin size={20} /> Mapa Interativo
          </SectionTitle>
          <SectionSubtitle>
            Visualização geográfica de campanhas, sítios e medições.
          </SectionSubtitle>
          <Placeholder>Mapa interativo — integrar componente de mapa.</Placeholder>
        </Section>

        <Section id="dados">
          <SectionTitle>
            <Database size={20} /> Banco de Dados
          </SectionTitle>
          <SectionSubtitle>
            Consulta a registros e exportação de dados do BALCAR.
          </SectionSubtitle>
          <Placeholder>Tabela/consulta — integrar API e CSV export.</Placeholder>
        </Section>
      </MainContent>
    </BalcarSPAContainer>
  );
}

export default BalcarSPAPage;
