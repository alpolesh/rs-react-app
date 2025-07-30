import Results from '@components/results/Results';
import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { renderWithStore } from '@src/__tests__/helpers/test-utils/mockStore';

describe('Results rendering tests', () => {
  it('renders correct number of items when data is provided', () => {
    const mockResults = [
      { name: 'test', description: 'test', id: '1' },
      { id: '2' },
    ];

    renderWithStore(
      <MemoryRouter>
        <Results results={mockResults} error="" onChangeGameId={() => {}} />
      </MemoryRouter>,
      {
        savedGames: {},
      }
    );

    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(mockResults.length);
  });

  it('displays "no results" message when data array is empty', () => {
    renderWithStore(
      <MemoryRouter>
        <Results results={[]} error="" onChangeGameId={() => {}} />
      </MemoryRouter>,
      {
        savedGames: {},
      }
    );
    const message = screen.getByText(/no results/i);
    expect(message).toBeInTheDocument();
  });
});

describe('Data display tests', () => {
  it('correctly displays item names and descriptions', () => {
    const mockResults = [
      { name: 'test', description: 'test', id: '1' },
      { name: 'test2', description: 'test2', id: '2' },
    ];
    renderWithStore(
      <MemoryRouter>
        <Results results={mockResults} error="" onChangeGameId={() => {}} />
      </MemoryRouter>,
      {
        savedGames: {},
      }
    );
    const items = screen.getAllByRole('listitem');
    expect(items[0]).toHaveTextContent('test: test');
    expect(items[1]).toHaveTextContent('test2: test2');
  });

  it('handles missing or undefined data gracefully', () => {
    const mockResults = [{ id: '1' }, { id: '2' }];
    renderWithStore(
      <MemoryRouter>
        <Results results={mockResults} error="" onChangeGameId={() => {}} />
      </MemoryRouter>,
      {
        savedGames: {},
      }
    );
    const items = screen.getAllByRole('listitem');
    expect(items[0]).toHaveTextContent('No name: No description');
    expect(items[1]).toHaveTextContent('No name: No description');
  });
});

describe('Error handling tests', () => {
  it('displays error message when API call fails', () => {
    const mockError = 'API call failed';
    renderWithStore(
      <MemoryRouter>
        <Results results={[]} error={mockError} onChangeGameId={() => {}} />
      </MemoryRouter>,
      {
        savedGames: {},
      }
    );
    const errorMessage = screen.getByText(mockError);
    expect(errorMessage).toBeInTheDocument();
  });
});
