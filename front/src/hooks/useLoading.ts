import { useContext } from "react";
import { LoadingContext } from "../contexts/loadingContextTypes";

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading deve ser usado dentro de um LoadingProvider");
  }
  return context;
};
