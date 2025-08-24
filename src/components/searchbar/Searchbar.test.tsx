import Searchbar from '@components/searchbar/Searchbar';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import searchTermReducer from '@src/store/slices/searchTermSlice';
import { NextIntlClientProvider } from 'next-intl';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock('@src/hooks/useLocalStorage', () => ({
  default: () => [vi.fn(), vi.fn()],
}));

const messages = {
  Searchbar: {
    searchButton: 'Поиск',
  },
};

function renderWithStoreAndIntl(ui: React.ReactElement) {
  const store = configureStore({
    reducer: { searchTerm: searchTermReducer },
    preloadedState: { searchTerm: '' },
  });

  return render(
    <Provider store={store}>
      <NextIntlClientProvider locale="ru" messages={messages}>
        {ui}
      </NextIntlClientProvider>
    </Provider>
  );
}

describe('Searchbar rendering tests', () => {
  it('should render the search bar', () => {
    renderWithStoreAndIntl(<Searchbar />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('displays previously saved search term from store on mount', () => {
    const store = configureStore({
      reducer: { searchTerm: searchTermReducer },
      preloadedState: { searchTerm: 'Zelda' },
    });
    renderWithStoreAndIntl(
      <Provider store={store}>
        <Searchbar />
      </Provider>
    );
    expect(screen.getByRole('textbox')).toHaveValue('Zelda');
  });

  it('shows empty input when no saved term exists', () => {
    renderWithStoreAndIntl(<Searchbar />);
    expect(screen.getByRole('textbox')).toHaveValue('');
  });
});

describe('Searchbar user interaction tests', () => {
  it('should update input value when typing', async () => {
    const user = userEvent.setup();
    renderWithStoreAndIntl(<Searchbar />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'Zelda');
    expect(input).toHaveValue('Zelda');
  });

  it('saves search term to store when search button is clicked', async () => {
    const user = userEvent.setup();
    renderWithStoreAndIntl(<Searchbar />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');
    await user.type(input, 'Zelda');
    await user.click(button);
    expect(screen.getByRole('textbox')).toHaveValue('Zelda');
  });

  it('trims whitespace from search input before saving', async () => {
    const user = userEvent.setup();
    renderWithStoreAndIntl(<Searchbar />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');
    await user.type(input, '  Zelda  ');
    await user.click(button);
    expect(screen.getByRole('textbox')).toHaveValue('Zelda');
  });
});
