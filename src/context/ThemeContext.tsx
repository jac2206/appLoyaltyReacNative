import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

import { darkColors, lightColors, Colors } from '../styles/colors';
import { getItem, saveItem } from '../services/data/storage.repository';

import { STORAGE_KEYS } from '../constants/storageKeys';

type ThemeMode = 'light' | 'dark';

type ThemeContextType = {
  theme: ThemeMode;
  isDark: boolean;
  colors: Colors;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>('light');

  useEffect(() => {
    async function loadTheme() {
      const savedTheme = await getItem<ThemeMode>(STORAGE_KEYS.THEME);

      if (savedTheme) {
        setTheme(savedTheme);
      }
    }

    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme: ThemeMode = theme === 'light' ? 'dark' : 'light';

    setTheme(newTheme);

    await saveItem(STORAGE_KEYS.THEME, newTheme);
  };

  const colors = theme === 'dark' ? darkColors : lightColors;

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDark: theme === 'dark',
        colors,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme debe usarse dentro de ThemeProvider');
  }

  return context;
}
