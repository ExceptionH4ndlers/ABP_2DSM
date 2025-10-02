import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import BarraBrasil from "./components/BarraBrasil";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import SimaSPAPage from "./pages/SimaSPAPage";
import FurnasSPAPage from "./pages/FurnasSPAPage";
import BalcarPage from "./pages/BalcarPage";

function AppContent() {
  const location = useLocation();
  const shouldShowNavigation = location.pathname !== "/furnas";

  return (
    <>
      <BarraBrasil />
      {shouldShowNavigation && <Navigation />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sima" element={<SimaSPAPage />} />
        <Route path="/furnas" element={<FurnasSPAPage />} />
        <Route path="/balcar" element={<BalcarPage />} />
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
