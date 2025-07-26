import { render, screen } from '@testing-library/react';
import About from '@components/about/About';

describe('About', () => {
  it('should render', () => {
    render(<About />);
    expect(screen.getByText(/About/i)).toBeInTheDocument();
  });
});
