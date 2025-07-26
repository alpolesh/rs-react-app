import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import AppRoutes from '@src/AppRoutes';

describe('App routing', () => {
  it('renders NotFound page for unknown route', () => {
    render(
      <MemoryRouter initialEntries={['/unknown/path']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });
});
