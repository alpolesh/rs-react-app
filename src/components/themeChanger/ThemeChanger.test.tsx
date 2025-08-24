import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeChanger from '@components/themeChanger/ThemeChanger';
import { ThemeContext } from '@src/context/themeContext/ThemeContext';
import { NextIntlClientProvider } from 'next-intl';

const mockMessages = {
  ThemeChanger: { label: 'Theme', light: 'Light', dark: 'Dark' },
};

describe('ThemeChanger', () => {
  const renderWithProviders = (theme: 'light' | 'dark', setTheme = vi.fn()) => {
    return render(
      <NextIntlClientProvider locale="en" messages={mockMessages}>
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <ThemeChanger />
        </ThemeContext.Provider>
      </NextIntlClientProvider>
    );
  };

  it('should render select with current theme', () => {
    renderWithProviders('light');
    const select = screen.getByLabelText(/theme/i) as HTMLSelectElement;

    expect(select.value).toBe('light');
  });

  it('should call setTheme when theme is changed', async () => {
    const user = userEvent.setup();
    const setTheme = vi.fn();
    renderWithProviders('light', setTheme);

    const select = screen.getByLabelText(/theme/i);
    await user.selectOptions(select, 'dark');

    expect(setTheme).toHaveBeenCalledWith('dark');
  });

  it('select shows dark as selected value if current theme is dark', () => {
    renderWithProviders('dark');
    const select = screen.getByLabelText(/theme/i) as HTMLSelectElement;

    expect(select.value).toBe('dark');
  });
});
