import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BarraBrasil from "./components/BarraBrasil";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import SimaSPAPage from "./pages/SimaSPAPage";
import FurnasPage from "./pages/FurnasPage";
import BalcarPage from "./pages/BalcarPage";

function App() {
  return (
    <Router>
      <BarraBrasil />
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sima" element={<SimaSPAPage />} />
        <Route path="/furnas" element={<FurnasPage />} />
        <Route path="/balcar" element={<BalcarPage />} />
      </Routes>
    </Router>
  );
}

export default App;
