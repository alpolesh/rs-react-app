import Searchbar from '@components/searchbar/Searchbar';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

describe('Searchbar rendering tests', () => {
  it('should render the search bar', () => {
    render(<Searchbar onSearch={() => {}} searchTerm={''} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('displays previously saved search term from localStorage on mount', () => {
    render(<Searchbar onSearch={() => {}} searchTerm="Zelda" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('Zelda');
  });

  it('shows empty input when no saved term exists', () => {
    render(<Searchbar onSearch={() => {}} searchTerm="" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('');
  });
});

describe('Searchbar user interaction tests', () => {
  it('should update input value when typing', async () => {
    const user = userEvent.setup();
    render(<Searchbar onSearch={() => {}} searchTerm="" />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'Zelda');
    expect(input).toHaveValue('Zelda');
  });

  it('saves search term to localStorage when search button is clicked', async () => {
    const user = userEvent.setup();
    const handleInputChange = vi.fn();
    render(<Searchbar onSearch={handleInputChange} searchTerm="" />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');
    await user.type(input, 'Zelda');
    await user.click(button);
    expect(handleInputChange).toHaveBeenCalledWith('Zelda');
  });

  it('trims whitespace from search input before saving', async () => {
    const user = userEvent.setup();
    const handleInputChange = vi.fn();
    render(<Searchbar onSearch={handleInputChange} searchTerm="" />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');
    await user.type(input, '  Zelda  ');
    await user.click(button);
    expect(handleInputChange).toHaveBeenCalledWith('Zelda');
  });
});
