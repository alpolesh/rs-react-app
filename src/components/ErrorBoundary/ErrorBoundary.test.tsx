import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary';
import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('ErrorBoundary', () => {
  vi.mock('@components/ErrorBoundary/ErrorFallback', () => ({
    default: () => <div data-testid="error-fallback" />,
  }));
  const ThrowError = () => {
    throw new Error('Boom');
  };

  it('does not throw error upstream', () => {
    expect(() =>
      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      )
    ).not.toThrow();
  });

  it('renders errorFallback if error occurs', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('error-fallback')).toBeInTheDocument();
  });

  it('logs error to console when child throws', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(consoleErrorSpy).toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });
});
