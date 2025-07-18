import { render, screen } from '@testing-library/react';
import ResultItem from '@components/results/ResultItem';

describe('ResultItem', () => {
  it('should render correctly', () => {
    const name = 'Link';
    const description = 'He is a hero.';

    render(<ResultItem name={name} description={description} />);
    const item = screen.getByRole('listitem');
    expect(item).toHaveTextContent('Link: He is a hero.');
  });

  it('renders fallback text if props missing', () => {
    render(<ResultItem />);
    const item = screen.getByRole('listitem');
    expect(item).toHaveTextContent('No name: No description');
  });
});
