// ThemeContext.tsx
import React, { createContext, useContext, ReactNode } from "react";
import { useColorScheme } from "nativewind";

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { colorScheme, setColorScheme } = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const toggleTheme = () => {
    setColorScheme(isDarkMode ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
