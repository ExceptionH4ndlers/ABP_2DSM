import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import GlobalStyle from "./styles/GlobalStyle";
import PortalPage from "./pages/PortalPage";
import BarraBrasil from "./components/BarraBrasil";
import Navigation from "./components/Navigation";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div className="w-full min-h-screen flex flex-col overflow-x-hidden">
        <BarraBrasil />
        <Navigation />
        <PortalPage />
      </div>
    </ThemeProvider>
  );
}

export default App;
