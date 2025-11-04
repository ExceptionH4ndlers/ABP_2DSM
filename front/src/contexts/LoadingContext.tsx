import React, { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";

interface LoadingContextType {
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

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading deve ser usado dentro de um LoadingProvider");
  }
  return context;
};

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState<string | null>(null);
  const [contextualIsLoading, setContextualIsLoading] = useState(false);
  const [contextualMessage, setContextualMessage] = useState<string | null>(null);

  const showLoading = useCallback((message?: string) => {
    setIsLoading(true);
    setLoadingMessage(message || null);
  }, []);

  const hideLoading = useCallback(() => {
    setIsLoading(false);
    setLoadingMessage(null);
  }, []);

  const showContextualLoading = useCallback((message?: string) => {
    setContextualIsLoading(true);
    setContextualMessage(message || null);
  }, []);

  const hideContextualLoading = useCallback(() => {
    setContextualIsLoading(false);
    setContextualMessage(null);
  }, []);

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        loadingMessage,
        showLoading,
        hideLoading,
        contextualLoading: {
          isActive: contextualIsLoading,
          message: contextualMessage,
          show: showContextualLoading,
          hide: hideContextualLoading,
        },
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};
