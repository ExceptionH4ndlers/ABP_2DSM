import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import GlobalStyle from "./styles/GlobalStyle";
import DashboardPage from "./pages/DashboardPage";
import MapaInterativoPage from "./pages/MapaInterativoPage";
import SimaPage from "./pages/SimaPage";
import GraficoPage from "./pages/GraficoPage";
import BarraBrasil from "./components/BarraBrasil";
import MenuBar from "./components/MenuBar";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div className="w-full min-h-screen flex flex-col overflow-x-hidden">
        <Router>
          <BarraBrasil />
          <MenuBar />
          <div className="flex-1 w-full overflow-x-hidden">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/mapa" element={<MapaInterativoPage />} />
              <Route path="/sima" element={<SimaPage />} />
              <Route path="/grafico" element={<GraficoPage />} />
            </Routes>
          </div>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
