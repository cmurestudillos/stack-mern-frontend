import React, { createContext, useContext, useEffect, useState } from 'react';
import lightThemeUrl from 'primereact/resources/themes/lara-light-indigo/theme.css?url';
import darkThemeUrl from 'primereact/resources/themes/lara-dark-indigo/theme.css?url';

const THEME_KEY = 'app-dark-mode';

const ThemeContext = createContext(null);

const applyTheme = isDark => {
  const link = document.getElementById('theme-css');
  if (link) {
    link.href = isDark ? darkThemeUrl : lightThemeUrl;
  }
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => localStorage.getItem(THEME_KEY) === 'true');

  useEffect(() => {
    applyTheme(isDark);
  }, [isDark]);

  const toggleDarkMode = () => {
    setIsDark(prev => {
      const next = !prev;
      localStorage.setItem(THEME_KEY, String(next));
      return next;
    });
  };

  return <ThemeContext.Provider value={{ isDark, toggleDarkMode }}>{children}</ThemeContext.Provider>;
};

export const useAppTheme = () => useContext(ThemeContext);
