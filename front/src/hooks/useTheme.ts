import { useContext } from "react";
import { ThemeContext } from "../contexts/themeContext";

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme deve ser usado dentro de ThemeProvider");
  return ctx;
};
