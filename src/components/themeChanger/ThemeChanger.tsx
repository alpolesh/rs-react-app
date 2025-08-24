'use client';

import { useContext } from 'react';
import { ThemeContext } from '@src/context/themeContext/ThemeContext';
import type { Theme } from '@src/types/context/themeContext';
import { useTranslations } from 'next-intl';

function ThemeChanger() {
  const t = useTranslations('ThemeSwitcher');
  const { theme, setTheme } = useContext(ThemeContext);

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value as Theme);
  };
  return (
    <div className="flex gap-2">
      <label htmlFor="theme" className="font-medium">
        {t('label')}
      </label>
      <select
        id="theme"
        value={theme}
        onChange={handleThemeChange}
        className="border rounded px-2 py-1 w-full"
      >
        <option value="light">{t('options.light')}</option>
        <option value="dark">{t('options.dark')}</option>
      </select>
    </div>
  );
}

export default ThemeChanger;
