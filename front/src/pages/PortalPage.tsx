import styled from "styled-components";
import HeroSection from "../components/sections/HeroSection";
import SimaSection from "../components/sections/SimaSection";
import BalancoCarbonoSection from "../components/sections/BalancoCarbonoSection";
import BalcarSection from "../components/sections/BalcarSection";
import DashboardSection from "../components/sections/DashboardSection";
import MapasSection from "../components/sections/MapasSection";
import GraficosSection from "../components/sections/GraficosSection";
import Footer from "../components/Footer";

const PortalContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
`;

function PortalPage() {
  return (
    <PortalContainer>
      <HeroSection />
      <SimaSection />
      <BalancoCarbonoSection />
      <BalcarSection />
      <DashboardSection />
      <MapasSection />
      <GraficosSection />
      <Footer />
    </PortalContainer>
  );
}

export default PortalPage;
