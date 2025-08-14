import { render, screen } from '@testing-library/react';
import { vi, type MockedFunction } from 'vitest';
import DetailedView from './DetailedView';
import { useGetGameByIdQuery } from '@src/store/api/gamesApi';
import useCustomSearchParams from '@src/hooks/useCustomSearchParams';
import type { Game } from '@src/types/game';

vi.mock('@src/hooks/useCustomSearchParams');
vi.mock('@src/store/api/gamesApi');

const mockGame: Game = {
  id: '123',
  name: 'The Legend of Zelda',
  released_date: '1986-02-21',
  developer: 'Nintendo',
  description: 'The first Zelda game.',
  publisher: 'Nintendo',
};

describe('DetailedView', () => {
  const mockSetSearchParam: MockedFunction<(id: string) => void> = vi.fn();
  type GetGameByIdQueryResult = ReturnType<typeof useGetGameByIdQuery>;
  const mockRefetch: GetGameByIdQueryResult['refetch'] = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
    (
      useCustomSearchParams as MockedFunction<typeof useCustomSearchParams>
    ).mockReturnValue(['123', mockSetSearchParam]);
  });

  it('renders nothing if no selectedGame', () => {
    (
      useGetGameByIdQuery as MockedFunction<typeof useGetGameByIdQuery>
    ).mockReturnValue({
      data: undefined,
      error: undefined,
      isFetching: false,
      refetch: mockRefetch,
    });

    const { container } = render(<DetailedView />);
    expect(container.firstChild).toBeNull();
  });

  it('renders error if query returns an error', () => {
    (
      useGetGameByIdQuery as MockedFunction<typeof useGetGameByIdQuery>
    ).mockReturnValue({
      data: mockGame,
      error: { status: 404, data: 'Failed to load' },
      isFetching: false,
      refetch: mockRefetch,
    });

    render(<DetailedView />);
    expect(screen.getByText(/Failed to load/i)).toBeInTheDocument();
  });

  it('renders game details if data is available', () => {
    (
      useGetGameByIdQuery as MockedFunction<typeof useGetGameByIdQuery>
    ).mockReturnValue({
      data: mockGame,
      error: undefined,
      isFetching: false,
      refetch: mockRefetch,
    });

    render(<DetailedView />);

    expect(screen.queryByText('Id')).not.toBeInTheDocument();
    expect(screen.getByText(/The Legend Of Zelda/i)).toBeInTheDocument();
    expect(screen.getByText('1986-02-21')).toBeInTheDocument();
  });
});
