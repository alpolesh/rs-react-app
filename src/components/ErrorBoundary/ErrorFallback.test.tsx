import ErrorFallback from '@components/ErrorBoundary/ErrorFallback';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

describe('ErrorFallback', () => {
  it('should render', () => {
    render(<ErrorFallback />);
    expect(screen.getByText('Oops! Something went wrong.')).toBeInTheDocument();
  });

  it('click the reload button', async () => {
    const user = userEvent.setup();
    const spyHandleReload = vi.spyOn(ErrorFallback.prototype, 'handleReload');

    render(<ErrorFallback />);
    const button = screen.getByRole('button', { name: /reload app/i });
    await user.click(button);
    expect(spyHandleReload).toHaveBeenCalledTimes(1);
  });
});
