import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { dark_theme, ITheme, light_theme } from '../styles/themes';
import { useColorScheme } from 'react-native';

interface IThemeContext {
  theme: ITheme;
  setTheme: Dispatch<SetStateAction<ITheme>>;
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeContext = createContext({} as IThemeContext);

export const ThemeContextProvider = (props: ThemeProviderProps) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(
    colorScheme === 'light' ? light_theme : dark_theme
  );

  useEffect(() => {
    setTheme(colorScheme === 'light' ? light_theme : dark_theme);
  }, [colorScheme]);

  const toggleTheme = () => {
    setTheme(theme === light_theme ? dark_theme : light_theme);
  };

  const value = {
    theme,
    setTheme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
  );
};
