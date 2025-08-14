import Searchbar from '@components/searchbar/Searchbar';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import searchTermReducer from '@src/store/slices/searchTermSlice';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock('@src/hooks/useLocalStorage', () => ({
  default: () => [vi.fn(), vi.fn()],
}));

function renderWithStore(ui: React.ReactElement) {
  const store = configureStore({
    reducer: { searchTerm: searchTermReducer },
    preloadedState: { searchTerm: '' },
  });

  return render(<Provider store={store}>{ui}</Provider>);
}

describe('Searchbar rendering tests', () => {
  it('should render the search bar', () => {
    renderWithStore(<Searchbar />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('displays previously saved search term from store on mount', () => {
    const store = configureStore({
      reducer: { searchTerm: searchTermReducer },
      preloadedState: { searchTerm: 'Zelda' },
    });
    render(
      <Provider store={store}>
        <Searchbar />
      </Provider>
    );
    expect(screen.getByRole('textbox')).toHaveValue('Zelda');
  });

  it('shows empty input when no saved term exists', () => {
    renderWithStore(<Searchbar />);
    expect(screen.getByRole('textbox')).toHaveValue('');
  });
});

describe('Searchbar user interaction tests', () => {
  it('should update input value when typing', async () => {
    const user = userEvent.setup();
    renderWithStore(<Searchbar />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'Zelda');
    expect(input).toHaveValue('Zelda');
  });

  it('saves search term to store when search button is clicked', async () => {
    const user = userEvent.setup();
    renderWithStore(<Searchbar />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');
    await user.type(input, 'Zelda');
    await user.click(button);
    expect(screen.getByRole('textbox')).toHaveValue('Zelda');
  });

  it('trims whitespace from search input before saving', async () => {
    const user = userEvent.setup();
    renderWithStore(<Searchbar />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');
    await user.type(input, '  Zelda  ');
    await user.click(button);
    expect(screen.getByRole('textbox')).toHaveValue('Zelda');
  });
});
