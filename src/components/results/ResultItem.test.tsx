import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, type MockedFunction } from 'vitest';
import ResultItem from '@components/results/ResultItem';
import { renderWithStore } from '@src/__tests__/helpers/test-utils/mockStore';
import useCustomSearchParams from '@src/hooks/useCustomSearchParams';
import { useDispatch } from 'react-redux';
import * as redux from 'react-redux';

vi.mock('@src/hooks/useCustomSearchParams');
vi.mock('react-redux', async () => {
  const actual: typeof redux = await vi.importActual('react-redux');
  return {
    ...actual,
    useDispatch: vi.fn(),
  };
});

describe('ResultItem', () => {
  const mockSetSelectedGameId = vi.fn();
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
    (
      useCustomSearchParams as MockedFunction<typeof useCustomSearchParams>
    ).mockReturnValue(['', mockSetSelectedGameId]);
    (useDispatch as MockedFunction<typeof useDispatch>).mockReturnValue(
      mockDispatch
    );
  });

  it('should render correctly', () => {
    renderWithStore(
      <ResultItem gameId="1" name="Link" description="He is a hero." />,
      { savedGames: {} }
    );

    const item = screen.getByRole('listitem');
    expect(item).toHaveTextContent('Link: He is a hero.');
  });

  it('renders fallback text if props missing', () => {
    renderWithStore(<ResultItem gameId="1" />, { savedGames: {} });

    const item = screen.getByRole('listitem');
    expect(item).toHaveTextContent('No name: No description');
  });

  it('calls setSelectedGameIdToExistedParams when clicked', async () => {
    const user = userEvent.setup();
    renderWithStore(<ResultItem gameId="1" />, { savedGames: {} });

    const item = screen.getByRole('listitem');
    await user.click(item);
    expect(mockSetSelectedGameId).toHaveBeenCalledWith('1');
  });

  it('should not be checked by default if no savedGames', () => {
    renderWithStore(<ResultItem gameId="1" />, { savedGames: {} });

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('should be checked if savedGames has gameId', () => {
    renderWithStore(<ResultItem gameId="1" />, {
      savedGames: {
        '1': { gameId: '1', name: 'Some game', description: 'desc' },
      },
    });

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('should toggle checked state when checkbox is clicked', async () => {
    const user = userEvent.setup();
    renderWithStore(<ResultItem gameId="1" name="Name" description="Desc" />, {
      savedGames: {},
    });

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);
    expect(mockDispatch).toHaveBeenCalled();
  });
});
