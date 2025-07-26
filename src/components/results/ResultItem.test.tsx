import { render, screen } from '@testing-library/react';
import ResultItem from '@components/results/ResultItem';

describe('ResultItem', () => {
  it('should render correctly', () => {
    const name = 'Link';
    const description = 'He is a hero.';
    const gameId = '1';
    const onChangeGameId = vi.fn<(gameId: string) => void>();

    render(
      <ResultItem
        name={name}
        description={description}
        gameId={gameId}
        onChangeGameId={onChangeGameId}
      />
    );
    const item = screen.getByRole('listitem');
    expect(item).toHaveTextContent('Link: He is a hero.');
  });

  it('renders fallback text if props missing', () => {
    const gameId = '1';
    const onChangeGameId = vi.fn<(gameId: string) => void>();

    render(<ResultItem gameId={gameId} onChangeGameId={onChangeGameId} />);
    const item = screen.getByRole('listitem');
    expect(item).toHaveTextContent('No name: No description');
  });
});
