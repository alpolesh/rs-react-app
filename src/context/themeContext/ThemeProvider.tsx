'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import { ThemeContext } from './ThemeContext';
import type { Theme } from '@src/types/context/themeContext';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`${theme === 'dark' ? 'theme-dark' : ''} w-full`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
