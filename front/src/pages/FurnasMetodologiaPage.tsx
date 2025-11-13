import { useState } from "react";
import styled, { css } from "styled-components";
import { BookOpen } from "lucide-react";
import FurnasSidebar from "../components/FurnasSidebar";

const FurnasMetodologiaContainer = styled.div`
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

const SectionText = styled.p`
  font-size: 1rem;
  color: #000000;
  line-height: 1.7;
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }

  ${({ theme }) => theme.media.lg} {
    font-size: 1.1rem;
  }
`;

const StyledLink = styled.a`
  color: #196d95;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
    color: #0f4c6b;
  }
`;

function FurnasMetodologiaPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  return (
    <FurnasMetodologiaContainer>
      <FurnasSidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        activeItem="metodologia"
      />

      <MainContent $collapsed={sidebarCollapsed}>
        {/* Seção Metodologia */}
        <Section>
          <SectionTitle>
            <BookOpen size={40} />
            Metodologia
          </SectionTitle>
          <SectionSubtitle>
            Metodologias e procedimentos utilizados no projeto Balanço de Carbono
          </SectionSubtitle>

          <SectionText>
            O projeto será composto por quatro sub-projetos a serem desenvolvidos em paralelo:
          </SectionText>

          <SectionText>
            <strong>1. Aquisição de dados micrometeorológicos e limnológicos em tempo real</strong>
          </SectionText>

          <SectionText>
            O Sistema Integrado de Monitoração Ambiental - SIMA - é um conjunto de hardware e
            software desenhado para a coleta de dados e a monitoração em tempo real de sistemas
            hidrológicos. Para a coleta dos dados, o SIMA faz uso de um sistema autônomo fundeado,
            constituído de um toróide, onde são instalados sensores, eletrônica de armazenamento,
            bateria, painel solar e antena de transmissão. Os dados coletados em intervalo de tempo
            pré-programado são transmitidos via satélite, em tempo quase real, para um usuário que
            pode estar situado até 2500 km distante do ponto de coleta. A associação destas
            componentes fornece uma poderosa ferramenta que pode ser empregada no gerenciamento e
            controle ambiental de recursos hídricos. Esse sistema foi desenvolvido a partir de uma
            parceria entre a Universidade do Vale do Paraíba e o INPE. A partir de 1995, o projeto
            foi transferido para a Neuron Engenharia Ltda. Através de uma parceria com a Diretoria
            de Hidrografia e Navegação (DHN) a Neuron construiu um protótipo do SIMA, que ficou
            fundeado em águas do litoral do Rio de Janeiro durante um ano e os dados coletados foram
            disponibilizados pelo Programa Nacional de Bóia. Os dados coletados neste período foram
            comparados com dados in situ, o que confirmou o bom desempenho do sistema.
          </SectionText>

          <SectionText>
            A seleção de variáveis ambientais a ser medida levou em conta os seguintes aspectos:
          </SectionText>

          <SectionText>
            • sua relevância para a caracterização dos ambientes aquáticos
            <br />
            • sua relevância como indicador de impacto ambiental (são variáveis que respondem de
            forma consistente às alterações no funcionamento do sistema aquático)
            <br />
            • sua relevância no processo de emissão de gases de efeito estufa
            <br />• a viabilidade técnica de obtenção de medidas a partir de plataformas automáticas
          </SectionText>

          <SectionText>
            Com base nesses critérios, o sistema de medição automática permitirá monitorar as
            seguintes variáveis ambientais:
          </SectionText>

          <SectionText>
            <strong>Água:</strong> temperatura da água, pH e turbidez, oxigênio e CO2 dissolvidos,
            condutividade, nitrato, amônia, profundidade relativa.
          </SectionText>

          <SectionText>
            <strong>Atmosfera:</strong> temperatura do ar, pressão atmosférica, radiação solar,
            direção e intensidade do vento, direção e intensidade da corrente, profundidade
            relativa.
          </SectionText>

          <SectionText>
            Essas variáveis são medidas por meio de um kit de sensores integrado às plataformas. O
            INPE estará trabalhando de forma coordenada com a equipe de engenharia da Neuron para a
            especificação dos sensores, integração do sistema e testes preliminares de desempenho.
            Estas atividades serão desenvolvidas nas dependências do laboratório de mecânica e
            eletrônica do programa Processos da Hidrosfera da{" "}
            <StyledLink href="http://www.obt.inpe.br/" target="_blank" rel="noopener noreferrer">
              Coordenação Geral de Observação da Terra (OBT)
            </StyledLink>{" "}
            do INPE. No total serão construídas 3 plataformas, sendo necessária também a aquisição
            de 2 kits sobressalentes empregados na manutenção do sistema e para eventuais trocas.
          </SectionText>

          <SectionText>
            Por tratar-se de sistema sofisticado, a plataforma deverá ser levada do INPE para o
            local de estudo, através de transporte e embalagem adequados. Devido ao peso da
            plataforma, o transporte da margem do reservatório até o ponto de ancoragem necessita de
            uma embarcação suficientemente grande, a qual deverá ser alugada com a devida
            antecedência.
          </SectionText>

          <SectionText>
            A estratégia de distribuição das plataformas considera a segurança do experimento e o
            período total de amostragem. As plataformas deverão ser ancoradas em local seguro, de
            preferência próximo à barragem. A análise de séries temporais requer um grande número de
            dados numa mesma série, bem como a ausência de pontos faltantes (missing values). Com
            isso, uma plataforma deverá ser instalada permanentemente durante os seis anos do
            projeto em um dos reservatórios, ao mesmo tempo que a outras duas plataformas serão
            operadas anualmente nos outros reservatórios em estudo. Sugere-se a instalação da
            plataforma permanente em um reservatório mais antigo, como a UHE Furnas, pois em
            reservatórios recém formados as flutuações das variáveis não representam a dinâmica do
            reservatório a longo termo. Durante a execução do projeto serão realizadas visitas às
            plataformas para operações de manutenção do sistema e para o acoplamento por uma semana
            de um analisador de gases traço. Com isso deverá ser possível estabelecer, do ponto de
            vista físico e biológico, a relação entre os processos que ocorrem na interface
            água-atmosfera e os fluxos de gases de efeito estufa avaliados (Lima, 2002).
          </SectionText>

          <SectionText>
            Tendo em vista que a integração da primeira plataforma levará cerca de seis meses, esta
            deverá ser lançada na UHE Furnas em Julho de 2003. Na primeira campanha de campo após o
            lançamento, prevista para Outubro de 2003, deverão ser coletadas amostras para
            calibração e será efetuado o primeiro acoplamento do sensor de gases. Em Janeiro de 2004
            deverão ser lançadas outras duas plataforma na UHE Serra da Mesa e na UHE Manso. Em
            Janeiro de 2005 estas plataformas serão transferidas para as UHEs Itumbiara e Corumbá.
            Em 2006 as plataformas operarão nas UHEs Marimbondo e Porto Colômbia e, em 2007, nas
            UHEs L.C.B. de Carvalho e Mascarenhas de Moraes. No início de 2008 uma plataforma será
            transferida para a UHE Funil e a outra será operada em outro ponto de diferente
            profundidade na UHE Furnas, onde já existe uma plataforma fixa próximo à barragem. De
            2004 a 2008 deverão ser realizadas em cada ano três campanhas de campo por plataforma,
            nas fases de enchente (Janeiro), cheia (Julho) e vazante (Outubro), para instalação da
            plataforma, manutenção preventiva e calibração dos sensores, bem como para o acoplamento
            por uma semana do sensor de gases. No final do segundo semestre de 2008 deverá também
            ser realizada outra campanha de campo, quando os sistemas deverão ser desligados e
            desinstalados.
          </SectionText>

          <SectionText>
            As campanhas de campo do INPE nos meses de Janeiro para instalação, transposição,
            manutenção, calibração e coleta de dados serão realizadas por cinco pesquisadores e nas
            campanhas nos meses de Julho e Outubro serão necessários dois pesquisadores (com exceção
            da última campanha em 2008, quando haverá a finalização do experimento, necessitando de
            5 pesquisadores). Para realizar as campanhas de campo serão adquiridas passagens de
            ida-volta do aeroporto de São José dos Campos com destino às cidades mais próximas dos
            reservatórios em estudo.
          </SectionText>

          <SectionText>
            <strong>
              2. Estimativa de Fluxos de CO2, CH4 e N2O na interface água-atmosfera e coluna d'água
            </strong>
          </SectionText>

          <SectionText>
            Enquanto a combustão de carvão, óleo combustível ou gás natural em plantas térmicas se
            produz principalmente gás carbônico (CO2) através da combustão química, nos
            reservatórios de hidrelétricas a principal fonte do gás é a decomposição bacteriana
            (aeróbica e anaeróbica) de material orgânico autóctone e alóctone, que produz
            basicamente CO2, CH4 e N2O. O programa de coletas de amostras de gás emitido na
            interface água-atmosfera, tanto sob a forma de bolhas como por difusão, será montado em
            função do tipo de região do reservatório estudado e por faixa de profundidade da área
            escolhida. As amostras serão coletadas em campo em diversas regiões dos reservatórios
            empregando-se funis de captação de bolhas que emanam do fundo do lago e câmaras de
            difusão que captam o transporte vertical dos gases por difusão. Também deverão ser
            mensurados perfis de concentração de metano na coluna d'água. Cada campanha demandará em
            média 07 dias de trabalho, sendo o primeiro e o último dia dedicados à deslocamentos e
            montagem/desmontagem de material.
          </SectionText>

          <SectionText>
            Para as amostragens serão realizadas duas saídas por dia para o reservatório, uma
            prevista para a manhã e outra à tarde. Deverão ser colocados conjuntos de funis em
            diferentes profundidades de regiões significativas dos reservatórios estudados, sendo
            que o conjunto instalado permanecerá por cerca de 24 horas em equilíbrio com a água. Ao
            final da instalação dos funis se procederá à medição dos parâmetros físico-químicos da
            água e as experiências de medição da difusão dos gases e dos perfis de concentração de
            CH4 na coluna d'água. Basicamente, serão dispostos os conjuntos de amostragem em locais
            significativos dos reservatórios estudados, sendo:
          </SectionText>

          <SectionText>
            • <strong>região próximo à barragem,</strong> em diferentes profundidades (procura-se
            nesta região do reservatório, determinar um padrão de emissão para regiões muito
            profundas e onde presume-se que foram previamente desmatadas);
            <br />• <strong>região abrigada do reservatório,</strong> em algum braço de antigo rio e
            em diferentes profundidades, onde presumidamente havia vegetação que não foi previamente
            desmatada (procura-se nesta região do reservatório, determinar um padrão de emissão para
            regiões mais rasas e de intensa atividade biológica);
            <br />• <strong>região abrigada do reservatório</strong> em diferentes profundidades, em
            algum braço de rio na região oposta à amostragem anterior (procura-se nesta região do
            reservatório, determinar similaridades ou diferenças no padrão de emissão anteriormente
            encontrado);
            <br />• <strong>região à montante do reservatório,</strong> onde pode ocorrer presença
            de macrófitas aquáticas (procura-se determinar um padrão de emissão para áreas onde a
            presença de maior carga orgânica possa influenciar nas taxas de emissão, como também
            avaliar o padrão de emissão existente anteriormente à construção do reservatório);
            <br />• <strong>região à jusante</strong> (procura-se determinar um padrão de emissão
            para a água captada em profundidade e turbinada).
          </SectionText>

          <SectionText>
            Quanto à análise, o melhor método de análise quantitativa da concentração dos gases
            contidas nas amostras coletadas, será o transporte das amostras em recipientes
            apropriados e análise posterior em laboratórios por cromatografia de fase gasosa.
          </SectionText>

          <SectionText>
            <strong>Elementos da amostragem:</strong>
          </SectionText>

          <SectionText>
            • Serão quantificados os componentes (metano, dióxido de carbono, nitrogênio, oxigênio e
            óxido nitroso) e serão calculados as taxas de emissão para cada tipo de área, expressas
            em kg/km²/dia.
            <br />
            • Para cada reservatório estudado serão combinadas estas taxas de emissão com a
            proporção de cada área equivalente amostrada e serão então calculadas taxas de emissão
            total para cada represa.
            <br />• Proceder-se-á também a medição in situ de fluxos de gases através de analisador
            de gases traço portátil.
          </SectionText>

          <SectionText>
            <strong>3. Ciclo do Carbono na coluna d'água</strong>
          </SectionText>

          <SectionText>
            Nos ambientes aquáticos, a maior parte do carbono está presente nas formas inorgânica e
            orgânica dissolvidas. O carbono orgânico particulado representa algo próximo de 10% do
            carbono orgânico total e os organismos vivos (biomassa) são responsáveis por uma pequena
            parte da fração particulada. O carbono orgânico particulado referente ao material
            detrítico (necromassa) é, na maioria dos casos, rapidamente mineralizado, contribuindo,
            portanto, para o pool de carbono dissolvido. Assim como a predominância de carbono
            dissolvido em relação a outras formas de carbono é definida por atividades biológicas
            (intensas taxas de decomposição facilitadas por elevadas temperaturas), os fluxos de
            entrada (absorção) e de saída (emissão) de carbono inorgânico para a atmosfera também
            são regulados por processos biogênicos. O balanço entre esses dois fluxos é determinado
            pela magnitude das taxas de respiração e produtividade primária/secundária. A
            produtividade primária é responsável por converter carbono inorgânico (CO2) em carbono
            orgânico particulado (formação de biomassa). Todavia, essa mesma produção primária,
            através de processos de excreção simultâneos à fotossíntese, transfere carbono orgânico
            dissolvido intra-celular para o meio. A produtividade secundária é desempenhada por
            bactérias heterotróficas capazes de metabolizar o carbono orgânico dissolvido e, dessa
            forma, incorporando-o na estrutura trófica. Todo essa engrenagem ecológica de
            transformações do carbono gerando biomassa tem, evidentemente, um alto custo energético.
            As taxas de respiração, com a formação de CO2, expressam esse gasto. A análise das
            eficiências ecológicas, expressas através da proporção entre produção e respiração,
            permite identificar a rota principal do carbono e a atribuição ecológica do sistema. Se
            o sistema está predominantemente funcionando como incorporador de carbono (produção
            maior que respiração) é tido como autotrófico. Por outro lado, se o sistema funciona
            como exportador de carbono (respiração maior que produção) é considerado heterotrófico.
            Esta identificação do atributo ecológico dos ecossistemas aquáticos – autotrófico ou
            heterotrófico – é, ainda, um grande desafio para as ciências aquáticas. Neste contexto,
            a avaliação desses dois processos biológicos, associada à definição da matriz energética
            – parâmetros físicos e químicos – é fundamental para a compreensão e construção do
            modelo do ciclo do carbono e suas implicações nas emissões observadas.
          </SectionText>

          <SectionText>
            <strong>Com base nesse escopo, serão obtidos os seguinte dados:</strong>
          </SectionText>

          <SectionText>
            <strong>Estoques Biológicos de Carbono</strong>
            <br />
            • A biomassa fitoplanctônica será obtida através da análise em microscópio invertido e
            as densidades serão transformadas em biomassa através da identificação do biovolume
            celular.
            <br />• A biomassa bacteriana será obtida através da análise em microscópio de
            fluorescência e as densidades serão transformadas em biomassa através de analisador de
            imagem.
          </SectionText>

          <SectionText>
            <strong>Processos de Transferência de Carbono</strong>
            <br />
            • Produção primária fitoplanctônica será estimada através da incorporação de carbono
            radioativo (14C) de acordo com o procedimento apresentado em Wetzel & Likens (1992).
            <br />
            • Carbono orgânico excretado pelo fitoplâncton será obtido através do borbulhamento em
            meio ácido da amostra previamente filtrada para a avaliação da incorporação intracelular
            do 14C.
            <br />
            • A produção bacteriana será investigada através da incorporação de leucina tritiada
            [3H] pelo método da centrifugação desenvolvido por Smith e Azam (1992). As taxas de
            incorporação serão calculadas conforme adaptação do método de Bell (1993), originalmente
            estabelecido para medir a incorporação de timidina, e convertidas diretamente para
            produção de carbono de acordo com Simon e Azam (1989).
            <br />• A respiração planctônica – fitoplanctônica e bacteriana – será realizada
            simultaneamente utilizando-se um respirômetro Micro-Oxymax e mensurando-se o consumo de
            oxigênio dissolvido por espectrofotometria de acordo com procedimento descrito em Roland
            et al. (1999). A separação de plâncton para as medidas das taxas respiratórias será
            realizada segundo Cimbleris e Kalff (1998).
          </SectionText>

          <SectionText>
            <strong>Parâmetros ambientais</strong>
            <br />
            Tais como concentrações de carbono inorgânico dissolvido (DIC), carbono orgânico
            dissolvido (DOC), carbono orgânico particulado (POC), nitrogênio total, fósforo total,
            concentração de clorofila-a; 13C de CO2 e CH4 dissolvidos e 13C 15N do POC, visando
            diferenciar o material alóctone e autóctone, serão determinados de acordo com métodos
            específicos. Variáveis limnológicas – pH, oxigênio dissolvido, condutividade elétrica,
            turbidez e temperatura – serão medidas em campo.
          </SectionText>

          <SectionText>
            <strong>Quantificação da entrada de material alóctone</strong>
            <br />
            Os principais tributários de cada reservatório serão identificados, e escolhidos pontos
            de amostragem para a realização de medidas das concentrações (mg/L) de DOC e POC. A
            carga orgânica será então estimada por meio da medição das áreas de drenagem referentes
            aos pontos de amostragem, e da utilização das vazões médias diárias registradas em
            estações fluviométricas existentes nas bacias contribuintes ao reservatório. O trabalho
            será desenvolvido utilizando-se de cartas geográficas na escala de 1:50.000, onde se
            fará a localização dos pontos de amostragem, visando a delimitação e medição das
            respectivas áreas de drenagem. As vazões médias diárias, observadas nos mesmos dias em
            que foram realizadas as coletas, serão obtidas nas estações fluviométricas, cujas áreas
            de drenagem também devem ser conhecidas. Em seguida, estima-se uma descarga específica
            (litros por segundo por quilometro quadrado) a ser multiplicada pela área de drenagem
            dos pontos de amostragem. Concentrações de DOC e POC também serão avaliadas
            imediatamente a jusante de cada reservatório.
          </SectionText>

          <SectionText>
            <strong>
              4. Estimativa de Fluxos de CO2, CH4 e nitrogênio (N2) na interface água-sedimento
            </strong>
          </SectionText>

          <SectionText>
            Uma grande parte dos gases de efeito estufa é originada da decomposição da matéria
            orgânica presente nos sedimentos anóxicos, os quais portanto constituem-se em componente
            fundamental nas transformações de carbono e nitrogênio nos ambientes aquáticos. Os
            sedimentos serão coletados (Adams, 1994) em locais equivalentes aos pontos onde serão
            efetuadas as coletas na coluna d'água e superfície, e analisados os seguintes gases na
            água intersticial: CO2, CH4, N2, oxigênio (O2) e argônio (Ar). As amostras, mantidas no
            interior do coletor, são preservadas em sacos preenchidos com gás hélio (Fendinger &
            Adams, 1986), e em intervalos de 1 a 2 cm, transferidas para um sistema de seringas
            adaptadas ao coletor. Essas seringas são, então, estocadas em sacos com hélio e mantidas
            em gelo, sendo as análises dos gases processadas, por meio de cromatografia gasosa, em
            um período de 24 a 48 horas após as coletas. As medidas de oxigênio e argônio são
            utilizadas como indicadores de contaminação atmosférica das amostras. O argônio é
            utilizado ainda para aumentar a acurácia das medidas de N2. Serão quantificados os
            fluxos difusivos de CO2, CH4, N2 nos sedimentos e na interface água-sedimento, de modo a
            avaliar a perda desses gases para a coluna d'água e o seu potencial de desoxigenação e
            denitrificação das águas hipolimnéticas, bem como o seu fluxo para a atmosfera.
          </SectionText>

          <SectionText>
            A composição isotópica do carbono e nitrogênio, presentes nos sedimentos, também será
            avaliada.
          </SectionText>
        </Section>
      </MainContent>
    </FurnasMetodologiaContainer>
  );
}

export default FurnasMetodologiaPage;
