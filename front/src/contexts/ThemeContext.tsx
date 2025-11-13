import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Theme } from "./themeContextTypes";
import { ThemeContext } from "./themeContextInstance";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Verifica o tema salvo no localStorage ou define padrão como 'light'
    const saved = localStorage.getItem("theme") as Theme | null;
    return saved || "light";
  });

  // Aplica a classe 'dark' no body
  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
