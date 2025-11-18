import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Configuração para rodar dentro de container Docker
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // permite acesso externo (ex: http://localhost:3002)
    port: 5173, // porta padrão Vite
    strictPort: true, // falha caso a porta já esteja em uso
    watch: {
      usePolling: true, // garante hot reload no bind mount
    },
    proxy: {
      // Proxy apenas para rotas de API, não para rotas do frontend
      // Usa bypass para não fazer proxy nas rotas do frontend
      "/sima": {
        target: "http://localhost:3001",
        changeOrigin: true,
        bypass(req) {
          const url = req.url || "";
          // Rotas do frontend que não devem fazer proxy
          const frontendRoutes = ["/sima", "/sima/", "/sima/publicacoes"];
          // Rotas de API que devem fazer proxy
          const apiRoutes = [
            "/sima/all",
            "/sima/estacao",
            "/sima/meta",
            "/sima/query",
            "/sima/simaoffline",
            "/sima/health",
          ];

          // Se for rota do frontend, não faz proxy
          if (frontendRoutes.some((route) => url === route || url.startsWith(route + "/"))) {
            return url;
          }
          // Se for rota de API, faz proxy
          if (apiRoutes.some((route) => url.startsWith(route))) {
            return null;
          }
          // Por padrão, não faz proxy (deixa o React Router tratar)
          return url;
        },
      },
      "/furnas": {
        target: "http://localhost:3001",
        changeOrigin: true,
        bypass(req) {
          const url = req.url || "";
          // Rotas do frontend que não devem fazer proxy
          const frontendRoutes = [
            "/furnas",
            "/furnas/",
            "/furnas/panorama",
            "/furnas/metodologia",
            "/furnas/resultados",
            "/furnas/participantes",
            "/furnas/pesquisas",
            "/furnas/publicacoes",
          ];
          // Rotas de API que devem fazer proxy
          const apiRoutes = [
            "/furnas/sitio",
            "/furnas/reservatorio",
            "/furnas/instituicao",
            "/furnas/campanha",
            "/furnas/tabelacampo",
            "/furnas/dadostimeseries",
            "/furnas/dadosrepresa",
            "/furnas/carbono",
            "/furnas/bolhas",
            "/furnas/bioticocoluna",
            "/furnas/bioticosuperficie",
            "/furnas/abioticocoluna",
            "/furnas/abioticosuperficie",
            "/furnas/dupladessorcaoagua",
            "/furnas/campanhaportabela",
            "/furnas/meta",
            "/furnas/query",
            "/furnas/health",
          ];

          // Se for rota do frontend, não faz proxy
          if (frontendRoutes.some((route) => url === route || url.startsWith(route + "/"))) {
            return url;
          }
          // Se for rota de API, faz proxy
          if (apiRoutes.some((route) => url.startsWith(route))) {
            return null;
          }
          // Por padrão, não faz proxy (deixa o React Router tratar)
          return url;
        },
      },
      "/balcar": {
        target: "http://localhost:3001",
        changeOrigin: true,
        bypass(req) {
          const url = req.url || "";
          // Rotas do frontend que não devem fazer proxy
          const frontendRoutes = [
            "/balcar",
            "/balcar/",
            "/balcar/descricao",
            "/balcar/publicacoes",
          ];
          // Rotas de API que devem fazer proxy
          const apiRoutes = [
            "/balcar/sitio",
            "/balcar/reservatorio",
            "/balcar/instituicao",
            "/balcar/campanha",
            "/balcar/tabelacampo",
            "/balcar/fluxoinpe",
            "/balcar/meta",
            "/balcar/query",
            "/balcar/health",
          ];

          // Se for rota do frontend, não faz proxy
          if (frontendRoutes.some((route) => url === route || url.startsWith(route + "/"))) {
            return url;
          }
          // Se for rota de API, faz proxy
          if (apiRoutes.some((route) => url.startsWith(route))) {
            return null;
          }
          // Por padrão, não faz proxy (deixa o React Router tratar)
          return url;
        },
      },
      "/filters": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
  preview: {
    host: true,
    port: 5173,
  },
});
