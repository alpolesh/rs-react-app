import App from '@components/app/App';
import { BrowserRouter } from 'react-router';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

describe('App integration Tests', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.restoreAllMocks();
  });

  it('makes initial API call on component mount', async () => {
    const mockedFetch = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ data: [] }),
    } as Response);

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(mockedFetch).toHaveBeenCalled();
    });
  });

  it('handles search term from localStorage on initial load', () => {
    const mockedSearchTerm = 'Zelda';
    vi.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue(
      JSON.stringify(mockedSearchTerm)
    );
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.resolve())
    );

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(mockedSearchTerm)
    );
  });

  it('manages loading states during API calls', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: [] }),
        } as Response)
      )
    );

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();

    await waitFor(() => {
      expect(spinner).not.toBeInTheDocument();
    });
  });
});

describe('App api integration tests', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.restoreAllMocks();
  });

  it('calls API with correct parametres', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.resolve())
    );

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const input = screen.getByPlaceholderText(/search/i);
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.type(input, 'Link');
    await userEvent.click(button);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining('Link'));
    });
  });

  it('updates state and renders results on success', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              data: [
                { id: '1', name: 'Zelda', description: 'Adventure' },
                { id: '2', name: 'Link', description: 'Hero' },
              ],
            }),
        } as Response)
      )
    );

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(screen.getByText(/Zelda/)).toBeInTheDocument();
      expect(screen.getByText(/Link/)).toBeInTheDocument();
    });
  });

  it('displays error message when API call fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new Error('Network Error'))
    );

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    await waitFor(() =>
      expect(screen.getByText(/network error/i)).toBeInTheDocument()
    );
  });

  it('saves new search term to localStorage after search', async () => {
    vi.spyOn(window.localStorage.__proto__, 'setItem').mockReturnValue(vi.fn());
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: [] }),
        } as Response)
      )
    );

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const input = screen.getByPlaceholderText(/search/i);
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.clear(input);
    await userEvent.type(input, 'Wind Waker');
    await userEvent.click(button);

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'searchTerm',
        JSON.stringify('Wind Waker')
      );
    });
  });
});
