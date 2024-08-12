import * as React from 'react';
import {themes, themeType} from './theme';

// Types
export interface ThemeContextInterface {
  theme: themeType;
  setTheme: (value: themeType) => void;
}

interface ThemeProviderInterface {
  children: React.ReactNode;
}

// Context
const ThemeContext = React.createContext({} as ThemeContextInterface);

export const ThemeProvider = ({
  children,
}: ThemeProviderInterface): JSX.Element => {
  const [theme, setTheme] = React.useState(themes.light);
  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

// useTheme hook for easy access to theme and setTheme
export const useTheme = () => {
  const state = React.useContext(ThemeContext);

  const {theme, setTheme} = state;

  const toggleTheme = (v: boolean) => {
    setTheme(v ? themes.dark : themes.light);
  };

  return {theme, toggleTheme};
};
