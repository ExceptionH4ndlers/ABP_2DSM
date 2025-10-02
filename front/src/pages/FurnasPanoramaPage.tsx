import { useState } from "react";
import styled from "styled-components";
import { Target } from "lucide-react";
import FurnasSidebar from "../components/FurnasSidebar";

const FurnasPanoramaContainer = styled.div`
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

const SectionText = styled.p`
  font-size: 1.1rem;
  color: #000000;
  line-height: 1.7;
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
`;

const SingleImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: block;
`;

const ImagesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  margin: 0 auto;
`;

const ContentImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: contain;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: block;
`;

const ImageCaption = styled.p`
  font-size: 0.9rem;
  color: #7f8c8d;
  text-align: center;
  margin-top: 1rem;
  font-style: italic;
  line-height: 1.5;
`;

function FurnasPanoramaPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  return (
    <FurnasPanoramaContainer>
      <FurnasSidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        activeItem="panorama"
      />

      <MainContent $collapsed={sidebarCollapsed}>
        {/* Seção Panorama */}
        <Section>
          <SectionTitle>
            <Target size={40} />
            Panorama
          </SectionTitle>
          <SectionSubtitle>
            AS MUDANÇAS CLIMÁTICAS GLOBAIS E OS RESERVATÓRIOS DE HIDRELÉTRICAS
          </SectionSubtitle>
          
          <SectionText>
            <strong>• Comissão Mundial de Barragens (WCD):</strong> quando geração hidrelétrica é inferior a 0,1 W por m² de área de reservatório, as emissões podem exceder àquelas originadas de termelétricas;
          </SectionText>

          <SectionText>
            <strong>• Emissões parecem variar:</strong> em função da profundidade e densidade da biomassa alagada;
          </SectionText>

          <SectionText>
            <strong>• O ciclo do carbono:</strong> deve ser avaliado antes e após a instalação da formação do reservatório. Estudos devem abordar as interações com as bacias de drenagem;
          </SectionText>

          <SectionText>
            <strong>• Convenção Quadro das Nações Unidas sobre Mudança do Clima (UNFCCC):</strong> Compromisso de elaborar e atualizar periodicamente inventários nacionais de emissões antrópicas por fontes e das remoções por sumidouro;
          </SectionText>

          <ImageContainer>
            <SingleImage 
              src="/img/furnas/panoram/f_l_C_cycle.jpg" 
              alt="Vista esquemática mostrando os processos lentos e rápidos do ciclo de carbono"
            />
          </ImageContainer>
          
          <ImageCaption>
            Vista esquemática mostrando os processos lentos e rápidos do ciclo de carbono. 
            Aqui é mostrado como ocorre a velocidade de trocas de carbono entre reservatórios, 
            afetando todo o ciclo.
          </ImageCaption>

          <SectionText>
            Os reservatórios de carbono têm tamanhos muito diferentes e sua importância também é relacionada aos tempos de permanência. Sendo assim, um reservatório menor pode ter uma importância maior que um reservatório maior. Por exemplo, o biota possui 0,1% do carbono aproximadamente na Terra, mas é naturalmente responsável pela grande maioria de fluxos.
          </SectionText>

          <SectionText>
            Porém, como as atividades humanas queimam combustíveis fósseis, liberando grandes quantias de carbono, que levou milhões de anos para ser despejada na atmosfera em questão de minutos.
          </SectionText>

          <ImageContainer>
            <SingleImage 
              src="/img/furnas/panoram/Increasing.jpg" 
              alt="Indicadores da influência humana na atmosfera desde a era industrial"
            />
          </ImageContainer>
          
          <ImageCaption>
            Indicadores da influência humana na atmosfera desde a era industrial.
          </ImageCaption>

          <SectionText>
            As mudanças climáticas têm sido um dos temas de relevância mundial na última década. O Painel Intergovernamental sobre Mudança do Clima (IPCC), criado em 1988 pelo Programa das Nações Unidas para o Meio Ambiente e pela Organização Meteorológica Mundial, é formado por cientistas de diversas nacionalidades, e vem realizando estudos sobre a alteração do clima planetário, suas conseqüências e a influência das atividades antrópicas em tais alterações.
          </SectionText>

          <SectionText>
            Os documentos que compõem o Terceiro Relatório de Avaliação do IPCC ("Climate Change 2001"), confirmam que o aquecimento global nos últimos 50 anos é conseqüência do aumento das concentrações de gases de efeito estufa (GEE), originado principalmente da queima de combustíveis fósseis. Como resultado, é prevista a ocorrência de eventos climáticos extremos e são esperados impactos na circulação e no volume (elevação do nível) dos oceanos, nos regimes pluviométricos, na agricultura e na estrutura e produtividade dos ecossistemas, com perda da biodiversidade e alterações nos ciclos do carbono e nutrientes.
          </SectionText>

          <SectionText>
            Existe ainda muita controvérsia quanto à quantidade de GEE que é trocada entre o sistema Atmosfera-Terra, devida, em suma, às incertezas de natureza metodológica e do conhecimento incompleto sobre o acoplamento entre diferentes componentes dos sistemas. Estudos realizados na última década têm demonstrado que a cadeia alimentar de muitos ambientes aquáticos não é sustentada pelos organismos produtores (fitoplâncton), mas pelos organismos decompositores (bactérias) e pela entrada de matéria orgânica proveniente da bacia de drenagem (material alóctone).
          </SectionText>

          <SectionText>
            Considerando tal premissa, conclui-se que a fotossíntese não é a fonte principal de carbono desses ambientes, mas sim o ambiente circundante. E se a produção primária, baseada na fotossíntese, é menor que a atividade respiratória das bactérias, então tais sistemas não contribuem para a fixação do carbono atmosférico. Pelo contrário, tornam-se fontes emissoras de gás carbônico. Essa abordagem do funcionamento dos sistemas aquáticos é relativamente nova e muitos estudos e equipamentos ainda estão sendo desenvolvidos para a avaliação das taxas de respiração bacteriana em comparação com a produção fotossintética.
          </SectionText>

          <SectionText>
            No rastro desse novo enfoque limnológico, passou-se a questionar a geração de energia hidrelétrica como fonte "limpa", já que os reservatórios incorporam grandes quantidades da biomassa vegetal que cobria a bacia de acumulação. Cogitou-se que a decomposição dessa imensa fonte de carbono seria responsável por emissões de gases de efeito estufa em níveis equivalentes aos de termelétricas de mesma potência.
          </SectionText>

          <SectionText>
            De fato, pesquisas recentes sobre a produção e emissão de GEE em reservatórios têm demonstrado que estes sistemas apresentam emissões consideráveis, particularmente de metano (CH₄), gás carbônico (CO₂) e óxido nitroso (N₂O). Neste sentido, o Brasil vem realizando inventários nacionais sobre as emissões de GEE (www.mct.gov.br). Com relação à geração hidrelétrica, inicialmente, foram consideradas apenas as emissões de CH₄ dos reservatórios, as quais estão vinculadas ao desflorestamento e mudanças no uso da terra.
          </SectionText>

          <SectionText>
            FURNAS, por meio de contrato com a COPPE, contribuiu de maneira significativa para este inventário e a compreensão das emissões em reservatórios, realizando medições no reservatório de Serra da Mesa ainda na fase de enchimento. Neste estudo, foram medidas não só as emissões de CH₄, como também as emissões de gás carbônico dissolvido, incluindo a medição da concentração de gases dissolvidos em diferentes profundidades. Os resultados confirmaram que as emissões de gás carbônico eram cerca de dez vezes superior ao das emissões de metano, e que grandes concentrações de ambos os gases estavam retidas no hipolímnio, como produto da decomposição anaeróbia da vegetação alagada.
          </SectionText>

          <SectionText>
            Outra contribuição importante deste trabalho foi a utilização da curva cota-área do reservatório para o cálculo da emissão de metano, já que foi observado que não se registravam emissões em profundidades superiores a 40 metros. Desta forma os cálculos ficaram mais precisos que a extrapolação pura e simples para toda a área do espelho d'água.
          </SectionText>

          <SectionText>
            Além da COPPE, outras instituições brasileiras de pesquisa têm se direcionado ao estudo das emissões de GEE por reservatórios, a destacar o INPE-CENA (Lima & Novo, 1999; Lima, 2002) e o INPA (Fearnside, 2002). Devido à discrepância entre os valores médios de fluxos que têm sido obtidos pelas diferentes instituições, resultante, em suma, da diversidade metodológica de coleta dos dados e da natureza muitas vezes não linear dos processos de emissão, percebe-se a necessidade da realização de estudos que propiciem o aperfeiçoamento e padronização de métodos.
          </SectionText>

          <SectionText>
            O estado-da-arte indica que, em casos onde a geração hidrelétrica é inferior à 0,1 W por metro quadrado de área de reservatório, existe a possibilidade das emissões de GEE serem superiores àquelas que seriam originadas de uma termelétrica gerando uma quantidade de energia equivalente (Rosa & dos Santos, 2000).
          </SectionText>

          <SectionText>
            A Comissão Mundial sobre Barragens (www.dams.org) tem ressaltado que apesar da constatação da emissão de GEE, é preciso considerar o modo com que o sistema anterior à construção da barragem se comportava quanto às trocas de GHG com a atmosfera. Sendo assim, torna-se necessário o cálculo de um balanço de quanto o reservatório irá emitir no seu curso de vida, e quanto o sistema anterior emitiria naturalmente neste mesmo período.
          </SectionText>

          <SectionText>
            Neste sentido, o presente projeto tem por principais questões a serem investigadas:
          </SectionText>

          <SectionText>
            <strong>1 – Qual o balanço das emissões de GEE por reservatórios?</strong><br/>
            <strong>2 – Energia hidrelétrica contribui para o incremento do efeito estufa?</strong><br/>
            <strong>3 – Quais as diferenças nos métodos de estimativa de fluxo de GEE?</strong><br/>
            <strong>4 – Até que ponto dependemos da resolução temporal e espacial dos processos para o desenvolvimento de modelos adequados de compreensão e previsão?</strong>
          </SectionText>

          <SectionText>
            O projeto envolverá o Departamento de Meio Ambiente (DMA.T) de FURNAS Centrais Elétricas S.A, o Instituto Alberto Luiz Coimbra de Pós-Graduação e Pesquisa de Engenharia – COPPE/UFRJ, o Instituto Nacional de Pesquisas Espaciais – INPE, a Universidade Federal de Juiz de Fora – UFJF, o Instituto Internacional de Ecologia – IEE e um consultor estrangeiro, especialista em avaliar emissões originadas do sedimento, com experiência no Chile, Europa, África, Nova Zelândia, Canadá e Japão.
          </SectionText>

          <SectionText>
            Esse intercâmbio permitirá a transferência da tecnologia de medição das emissões provenientes do sedimento e o desenvolvimento de modelos para a avaliação das emissões de gases em reservatórios construídos em ambientes de Cerrado. Cada especialista tratará de desenvolver aspectos relacionados ao ciclo do Carbono e à quantificação das emissões pelos reservatórios.
          </SectionText>

          <SectionText>
            Este projeto está dimensionado para ser desenvolvido por seis anos, período em que serão realizadas medições em todos os reservatórios da empresa. Os estudos serão desenvolvidos em dois reservatórios por ano de forma a que todos sejam incluídos no projeto, na ordem:
          </SectionText>

          <SectionText>
            <strong>1º ano:</strong> UHE Serra da Mesa e APM Manso;<br/>
            <strong>2º ano:</strong> UHE Itumbiara e UHE Corumbá;<br/>
            <strong>3º ano:</strong> UHE Marimbondo e UHE Porto Colômbia;<br/>
            <strong>4º ano:</strong> UHE L.C.B. de Carvalho e UHE Mascarenhas de Morais; UHE Furnas;<br/>
            <strong>5º ano:</strong> UHE Funil e APM Manso;<br/>
            <strong>6º ano:</strong> desenvolvimento de modelos e elaboração de relatório final.
          </SectionText>

          <SectionText>
            A emissões de carbono pelo APM Manso deverão ser remensuradas no quinto ano para que seja avaliado o efeito do tempo sobre as taxas obtidas naquele reservatório ainda em fase de estabilização.
          </SectionText>

          <SectionText>
            Serão elaborados os seguintes documentos:
          </SectionText>

          <SectionText>
            <strong>• relatórios de andamento,</strong> apresentando os resultados obtidos nas duas primeiras viagens de campo de cada grupo de reservatórios, a serem apresentados nos meses de julho e outubro;<br/>
            <strong>• relatórios anuais</strong> concluindo sobre as emissões e os fatores predominantes do ciclo de carbono de cada reservatório; a serem apresentados no mês de março de cada ano;<br/>
            <strong>• relatório síntese</strong> apresentando as conclusões gerais do projeto: o balanço do carbono nos reservatórios de FURNAS Centrais Elétricas S.A.
          </SectionText>

          <SectionText>
            O diagrama abaixo sintetiza o conjunto de atividades a serem desenvolvidas em cada reservatório.
          </SectionText>

          <ImagesGrid>
            <ImageWrapper>
              <ContentImage 
                src="/img/furnas/panoram/schematic_c_b.jpg" 
                alt="Diagrama esquemático do balanço de carbono nos reservatórios"
              />
              <ImageCaption>
                Diagrama esquemático do balanço de carbono nos reservatórios - ilustração de RICO REIS
              </ImageCaption>
            </ImageWrapper>

            <ImageWrapper>
              <ContentImage 
                src="/img/furnas/panoram/gh.jpg" 
                alt="O Efeito Estufa"
              />
              <ImageCaption>
                O Efeito Estufa - Fonte: Econergy Brasil
              </ImageCaption>
            </ImageWrapper>
          </ImagesGrid>
        </Section>
      </MainContent>
    </FurnasPanoramaContainer>
  );
}

export default FurnasPanoramaPage;
