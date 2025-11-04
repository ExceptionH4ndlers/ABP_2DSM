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
      "/sima": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
      "/furnas": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
      "/balcar": {
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
