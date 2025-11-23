import { AnimatePresence } from "framer-motion";
import { lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import PageTransition from "./components/PageTransition";
import BarraBrasil from "./components/BarraBrasil";
import Navigation from "./components/Navigation";
import LoadingModal from "./components/LoadingModal";
import SuspenseWrapper from "./components/SuspenseWrapper";
import { useLoading } from "./hooks/useLoading";
import { updateLoadingContext } from "./api/axiosConfig";
import { ThemeProvider } from "./contexts/ThemeContext";

// Lazy loading de todas as páginas
const HomePage = lazy(() => import("./pages/HomePage"));
const SimaSPAPage = lazy(() => import("./pages/SimaSPAPage"));
const SimaGraficosPage = lazy(() => import("./pages/SimaGraficosPage"));
const SimaPublicacoesPage = lazy(() => import("./pages/SimaPublicacoesPage"));
const FurnasSPAPage = lazy(() => import("./pages/FurnasSPAPage"));
const FurnasPanoramaPage = lazy(() => import("./pages/FurnasPanoramaPage"));
const FurnasMetodologiaPage = lazy(() => import("./pages/FurnasMetodologiaPage"));
const FurnasResultadosPage = lazy(() => import("./pages/FurnasResultadosPage"));
const FurnasParticipantesPage = lazy(() => import("./pages/FurnasParticipantesPage"));
const FurnasPesquisasCorrelatasPage = lazy(() => import("./pages/FurnasPesquisasCorrelatasPage"));
const FurnasPublicacoesPage = lazy(() => import("./pages/FurnasPublicacoesPage"));
const BalcarPage = lazy(() => import("./pages/BalcarSPAPage"));
const BalcarDescricaoPage = lazy(() => import("./pages/BalcarDescricaoPage"));
const BalcarPublicacoesPage = lazy(() => import("./pages/BalcarPublicacoesPage"));

function AppContent() {
  const location = useLocation();
  const { isLoading, loadingMessage, showLoading, hideLoading } = useLoading();

  // Configurar axios com o contexto de loading
  useEffect(() => {
    updateLoadingContext({ showLoading, hideLoading });
  }, [showLoading, hideLoading]);

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
      <LoadingModal isOpen={isLoading} message={loadingMessage} />
      <AnimatePresence mode="wait">
        <PageTransition key={location.pathname} direction="right" duration={0.5}>
          <SuspenseWrapper>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/sima" element={<SimaSPAPage />} />
              <Route path="/sima/graficos" element={<SimaGraficosPage />} />
              <Route path="/sima/publicacoes" element={<SimaPublicacoesPage />} />
              <Route path="/furnas" element={<FurnasSPAPage />} />
              <Route path="/furnas/panorama" element={<FurnasPanoramaPage />} />
              <Route path="/furnas/metodologia" element={<FurnasMetodologiaPage />} />
              <Route path="/furnas/resultados" element={<FurnasResultadosPage />} />
              <Route path="/furnas/participantes" element={<FurnasParticipantesPage />} />
              <Route path="/furnas/pesquisas" element={<FurnasPesquisasCorrelatasPage />} />
              <Route path="/furnas/publicacoes" element={<FurnasPublicacoesPage />} />
              <Route path="/balcar" element={<BalcarPage />} />
              <Route path="/balcar/descricao" element={<BalcarDescricaoPage />} />
              <Route path="/balcar/publicacoes" element={<BalcarPublicacoesPage />} />
            </Routes>
          </SuspenseWrapper>
        </PageTransition>
      </AnimatePresence>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
