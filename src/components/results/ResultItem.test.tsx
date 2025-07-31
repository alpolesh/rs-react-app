import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ResultItem from '@components/results/ResultItem';
import { renderWithStore } from '@src/__tests__/helpers/test-utils/mockStore';

describe('ResultItem', () => {
  it('should render correctly', () => {
    const name = 'Link';
    const description = 'He is a hero.';
    const gameId = '1';
    const onChangeGameId = vi.fn<(gameId: string) => void>();

    renderWithStore(
      <ResultItem
        name={name}
        description={description}
        gameId={gameId}
        onChangeGameId={onChangeGameId}
      />,
      {
        savedGames: {},
      }
    );

    const item = screen.getByRole('listitem');
    expect(item).toHaveTextContent('Link: He is a hero.');
  });

  it('renders fallback text if props missing', () => {
    const gameId = '1';
    const onChangeGameId = vi.fn<(gameId: string) => void>();

    renderWithStore(
      <ResultItem gameId={gameId} onChangeGameId={onChangeGameId} />,
      {
        savedGames: {},
      }
    );
    const item = screen.getByRole('listitem');
    expect(item).toHaveTextContent('No name: No description');
  });

  it('calls onChangeGameId when clicked', async () => {
    const user = userEvent.setup();
    const gameId = '1';
    const onChangeGameId = vi.fn<(gameId: string) => void>();

    renderWithStore(
      <ResultItem gameId={gameId} onChangeGameId={onChangeGameId} />,
      {
        savedGames: {},
      }
    );
    const item = screen.getByRole('listitem');
    await user.click(item);
    expect(onChangeGameId).toHaveBeenCalledWith(gameId);
  });

  it('should not be checked by default if no savedGames', () => {
    const gameId = '1';
    const onChangeGameId = vi.fn();

    renderWithStore(
      <ResultItem gameId={gameId} onChangeGameId={onChangeGameId} />,
      {
        savedGames: {},
      }
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('should be checked if savedGames', () => {
    const gameId = '1';
    const onChangeGameId = vi.fn();

    renderWithStore(
      <ResultItem gameId={gameId} onChangeGameId={onChangeGameId} />,
      {
        savedGames: {
          [gameId]: {
            gameId,
            name: 'Some game',
            description: 'desc',
          },
        },
      }
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('should toggle checked state when checkbox is clicked', async () => {
    const user = userEvent.setup();
    const gameId = '1';
    const onChangeGameId = vi.fn();

    renderWithStore(
      <ResultItem
        gameId={gameId}
        onChangeGameId={onChangeGameId}
        name="Name"
        description="Desc"
      />,
      {
        savedGames: {},
      }
    );

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});
