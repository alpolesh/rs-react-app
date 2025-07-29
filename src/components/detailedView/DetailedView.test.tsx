import { render, screen } from '@testing-library/react';
import DetailedView from './DetailedView';
import type { Game } from '@src/types/game';

const mockGame: Game = {
  id: '123',
  name: 'The Legend of Zelda',
  released_date: '1986-02-21',
  developer: 'Nintendo',
  description: 'The first Zelda game.',
  publisher: 'Nintendo',
};

describe('DetailedView', () => {
  it('renders nothing if selectedGame is null', () => {
    const { container } = render(
      <DetailedView
        selectedGame={null}
        loadGameError={null}
        resetSelectedGameId={vi.fn()}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders error if loadGameError is provided', () => {
    render(
      <DetailedView
        selectedGame={mockGame}
        loadGameError="Failed to load"
        resetSelectedGameId={vi.fn()}
      />
    );
    expect(screen.getByText(/Failed to load/i)).toBeInTheDocument();
  });

  it('renders game details if selectedGame is provided and no error', () => {
    render(
      <DetailedView
        selectedGame={mockGame}
        loadGameError={null}
        resetSelectedGameId={vi.fn()}
      />
    );

    expect(screen.queryByText('Id')).not.toBeInTheDocument();
    expect(screen.getByText('The Legend of Zelda')).toBeInTheDocument();
    expect(screen.getByText('1986-02-21')).toBeInTheDocument();
  });
});
