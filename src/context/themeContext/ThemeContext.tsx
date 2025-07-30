import { createContext } from 'react';
import type { ThemeContextValue } from '@src/types/context/themeContext';

export const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  setTheme: () => {},
});
