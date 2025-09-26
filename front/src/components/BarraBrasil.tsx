// src/components/BarraBrasil.tsx
import { useEffect } from "react";
import styled from "styled-components";

const BarraBrasilContainer = styled.div`
  width: 100%;
  overflow: hidden;

  #barra-brasil {
    width: 100% !important;
    max-width: 100% !important;
    overflow: hidden !important;

    * {
      max-width: 100% !important;
      box-sizing: border-box !important;
    }
  }
`;

const BarraBrasil = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://barra.brasil.gov.br/barra.js";
    script.defer = true;
    script.type = "text/javascript";
    document.body.appendChild(script);

    return () => {
      // limpa script ao desmontar, evitando múltiplos carregamentos
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <BarraBrasilContainer>
      <div id="barra-brasil"></div>
    </BarraBrasilContainer>
  );
};

export default BarraBrasil;
