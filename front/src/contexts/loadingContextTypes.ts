import { createContext } from "react";

export interface LoadingContextType {
  isLoading: boolean;
  loadingMessage: string | null;
  showLoading: (message?: string) => void;
  hideLoading: () => void;
  // Para operações contextuais (não globais)
  contextualLoading: {
    isActive: boolean;
    message: string | null;
    show: (message?: string) => void;
    hide: () => void;
  };
}

export const LoadingContext = createContext<LoadingContextType | undefined>(undefined);
