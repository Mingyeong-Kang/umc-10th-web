import { createContext, useContext, useState, useEffect } from "react";

type DarkModeContextType = {
  dark: boolean;
  toggleDark: () => void;
};

const DarkModeContext = createContext<DarkModeContextType | null>(null);

export function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false);

  const toggleDark = () => setDark(prev => !prev);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <DarkModeContext.Provider value={{ dark, toggleDark }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (!context) throw new Error("DarkModeProvider 안에서 써야함");
  return context;
}