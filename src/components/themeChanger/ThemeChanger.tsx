import { useContext } from 'react';
import { ThemeContext } from '@src/context/themeContext/ThemeContext';
import type { Theme } from '@src/types/context/themeContext';

function ThemeChanger() {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value as Theme);
  };
  return (
    <div>
      <label htmlFor="theme" className="mr-2 font-medium">
        Theme:
      </label>
      <select
        id="theme"
        value={theme}
        onChange={handleThemeChange}
        className="border rounded px-2 py-1"
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
}

export default ThemeChanger;
