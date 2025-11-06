import axios from "axios";
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from "axios";

// Instância do axios configurada
let axiosInstance: AxiosInstance | null = null;
let loadingContext: {
  showLoading: (message?: string) => void;
  hideLoading: () => void;
} | null = null;

// Configurar a instância do axios
export const createAxiosInstance = (context?: {
  showLoading: (message?: string) => void;
  hideLoading: () => void;
}) => {
  loadingContext = context || null;

  const API_BASE =
    import.meta.env.VITE_API_URL ||
    `http://localhost:${import.meta.env.VITE_SERVER_PORT ?? "3001"}`;

  axiosInstance = axios.create({
    baseURL: API_BASE,
    timeout: 30000,
  });

  // Interceptor de requisição
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Mostrar loading global apenas se não tiver sido desabilitado no config
      if (config.showGlobalLoading !== false && loadingContext) {
        loadingContext.showLoading();
      }
      return config;
    },
    (error) => {
      if (loadingContext) {
        loadingContext.hideLoading();
      }
      return Promise.reject(error);
    },
  );

  // Interceptor de resposta
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      if (loadingContext) {
        loadingContext.hideLoading();
      }
      return response;
    },
    (error) => {
      if (loadingContext) {
        loadingContext.hideLoading();
      }
      return Promise.reject(error);
    },
  );

  return axiosInstance;
};

// Obter a instância configurada
export const getAxiosInstance = (): AxiosInstance => {
  if (!axiosInstance) {
    const API_BASE =
      import.meta.env.VITE_API_URL ||
      `http://localhost:${import.meta.env.VITE_SERVER_PORT ?? "3001"}`;
    axiosInstance = axios.create({
      baseURL: API_BASE,
      timeout: 30000,
    });
  }
  return axiosInstance;
};

// Atualizar o contexto de loading
export const updateLoadingContext = (context: {
  showLoading: (message?: string) => void;
  hideLoading: () => void;
}) => {
  loadingContext = context;
  // Recriar a instância com o novo contexto
  return createAxiosInstance(context);
};

// Extender tipos do Axios para incluir showGlobalLoading
declare module "axios" {
  export interface InternalAxiosRequestConfig {
    showGlobalLoading?: boolean;
  }
}
