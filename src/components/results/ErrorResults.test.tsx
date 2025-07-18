import ErrorResults from '@src/components/results/ErrorResults';
import { render, screen } from '@testing-library/react';

describe('ErrorResults', () => {
  it('should render props error', () => {
    render(<ErrorResults error="Specific error" />);
    const errorMessage = screen.getByText('Specific error');
    expect(errorMessage).toBeInTheDocument();
  });

  it('should render default error message', () => {
    render(<ErrorResults error="" />);
    const errorMessage = screen.getByText('Something went wrong');
    expect(errorMessage).toBeInTheDocument();
  });
});
