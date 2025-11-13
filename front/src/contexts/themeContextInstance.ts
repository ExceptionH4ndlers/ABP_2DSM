import { createContext } from "react";
import type { ThemeContextType } from "./themeContextTypes";

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
