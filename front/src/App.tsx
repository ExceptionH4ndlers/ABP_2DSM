import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import BarraBrasil from "./components/BarraBrasil";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import SimaSPAPage from "./pages/SimaSPAPage";
import FurnasSPAPage from "./pages/FurnasSPAPage";
import FurnasPanoramaPage from "./pages/FurnasPanoramaPage";
import FurnasMetodologiaPage from "./pages/FurnasMetodologiaPage";
import FurnasResultadosPage from "./pages/FurnasResultadosPage";
import FurnasParticipantesPage from "./pages/FurnasParticipantesPage";
import FurnasPesquisasCorrelatasPage from "./pages/FurnasPesquisasCorrelatasPage";
import FurnasPublicacoesPage from "./pages/FurnasPublicacoesPage";
import BalcarPage from "./pages/BalcarSPAPage";
import BalcarDescricaoPage from "./pages/BalcarDescricaoPage";

function AppContent() {
  const location = useLocation();
  const shouldShowNavigation =
    location.pathname !== "/furnas" &&
    location.pathname !== "/furnas/panorama" &&
    location.pathname !== "/furnas/metodologia" &&
    location.pathname !== "/furnas/resultados" &&
    location.pathname !== "/furnas/participantes" &&
    location.pathname !== "/furnas/pesquisas" &&
    location.pathname !== "/furnas/publicacoes";

  return (
    <>
      <BarraBrasil />
      {shouldShowNavigation && <Navigation />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sima" element={<SimaSPAPage />} />
        <Route path="/furnas" element={<FurnasSPAPage />} />
        <Route path="/furnas/panorama" element={<FurnasPanoramaPage />} />
        <Route path="/furnas/metodologia" element={<FurnasMetodologiaPage />} />
        <Route path="/furnas/resultados" element={<FurnasResultadosPage />} />
        <Route path="/furnas/participantes" element={<FurnasParticipantesPage />} />
        <Route path="/furnas/pesquisas" element={<FurnasPesquisasCorrelatasPage />} />
        <Route path="/furnas/publicacoes" element={<FurnasPublicacoesPage />} />
        <Route path="/balcar" element={<BalcarPage />} />
        <Route path="/balcar/descricao" element={<BalcarDescricaoPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
