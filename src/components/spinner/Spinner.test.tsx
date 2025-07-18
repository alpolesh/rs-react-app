import { render, screen } from '@testing-library/react';
import Spinner from '@src/components/spinner/Spinner';

describe('Spinner', () => {
  it('should render', () => {
    render(<Spinner />);
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
  });

  it('has accessible aria-label', () => {
    render(<Spinner />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveAttribute('aria-label', 'Loading');
  });
});
