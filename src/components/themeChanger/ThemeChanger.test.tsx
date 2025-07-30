import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeChanger from '@components/themeChanger/ThemeChanger';
import { ThemeContext } from '@src/context/themeContext/ThemeContext';
import type { Theme } from '@src/types/context/themeContext';

describe('ThemeChanger', () => {
  const renderWithTheme = (theme: Theme, setTheme = vi.fn()) => {
    return render(
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <ThemeChanger />
      </ThemeContext.Provider>
    );
  };

  it('should render select with current theme', () => {
    renderWithTheme('light');
    const select = screen.getByLabelText(/theme/i) as HTMLSelectElement;

    expect(select.value).toBe('light');
  });

  it('should call setTheme when theme is changed', async () => {
    const user = userEvent.setup();
    const setTheme = vi.fn();
    renderWithTheme('light', setTheme);

    const select = screen.getByLabelText(/theme/i);
    await user.selectOptions(select, 'dark');

    expect(setTheme).toHaveBeenCalledWith('dark');
  });

  it('select shows dark as selected value if current theme is dark', () => {
    renderWithTheme('dark');
    const select = screen.getByLabelText(/theme/i) as HTMLSelectElement;

    expect(select.value).toBe('dark');
  });
});
