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
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
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
            Visão geral do projeto Balanço de Carbono
          </SectionSubtitle>
          <SectionText>
            Esta seção será desenvolvida com conteúdo específico sobre o panorama do projeto.
          </SectionText>
        </Section>
      </MainContent>
    </FurnasPanoramaContainer>
  );
}

export default FurnasPanoramaPage;
