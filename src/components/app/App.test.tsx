import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { http, HttpResponse, delay } from 'msw';
import App from '@components/app/App';
import { renderWithStore } from '@src/__tests__/helpers/test-utils/mockStore';
import { BrowserRouter } from 'react-router';

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  vi.restoreAllMocks();
  localStorage.clear();
});
afterAll(() => server.close());

describe('App Integration Tests', () => {
  it('handles search term from localStorage on initial load', async () => {
    const mockedSearchTerm = 'Zelda';
    vi.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue(
      JSON.stringify(mockedSearchTerm)
    );

    server.use(
      http.get('https://zelda.fanapis.com/api/games', ({ request }) => {
        const url = new URL(request.url);
        const name = url.searchParams.get('name');
        if (name === mockedSearchTerm) {
          return HttpResponse.json({
            data: [{ id: '1', name: mockedSearchTerm, description: 'desc' }],
          });
        }
      })
    );

    renderWithStore(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(mockedSearchTerm)).toBeInTheDocument();
    });
  });

  it('displays loading spinner during API calls', async () => {
    server.use(
      http.get('https://zelda.fanapis.com/api/games', async () => {
        await delay(150);
        return HttpResponse.json({ data: [{ id: '1', name: 'Slow Game' }] });
      })
    );

    const user = userEvent.setup();
    renderWithStore(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const input = screen.getByPlaceholderText(/search/i);
    const searchButton = screen.getByRole('button', { name: /search/i });
    await user.type(input, 'slow');
    user.click(searchButton);

    await waitFor(() => {
      expect(screen.getByRole('status')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
      expect(screen.getByText('Slow Game')).toBeInTheDocument();
    });
  });

  it('updates state and renders results on success', async () => {
    server.use(
      http.get('https://zelda.fanapis.com/api/games', () => {
        return HttpResponse.json({
          data: [
            { id: '1', name: 'Zelda', description: 'Adventure' },
            { id: '2', name: 'Link', description: 'Hero' },
          ],
        });
      })
    );

    const user = userEvent.setup();
    renderWithStore(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const input = screen.getByPlaceholderText(/search/i);
    const searchButton = screen.getByRole('button', { name: /search/i });
    await user.type(input, 'any_search');
    await user.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText(/Zelda/)).toBeInTheDocument();
      expect(screen.getByText(/Link/)).toBeInTheDocument();
    });
  });

  it('displays error message when API call fails', async () => {
    server.use(
      http.get('https://zelda.fanapis.com/api/games', () => {
        return new HttpResponse(
          JSON.stringify({ message: 'error has occurred' }),
          {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      })
    );

    const user = userEvent.setup();
    renderWithStore(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const input = screen.getByPlaceholderText(/search/i);
    const searchButton = screen.getByRole('button', { name: /search/i });
    await user.type(input, 'error_case');
    await user.click(searchButton);

    await waitFor(() =>
      expect(screen.getByText(/error has occurred/i)).toBeInTheDocument()
    );
  });

  it('saves new search term to localStorage after search', async () => {
    server.use(
      http.get('https://zelda.fanapis.com/api/games', () => {
        return HttpResponse.json({ data: [] });
      })
    );

    vi.spyOn(window.localStorage.__proto__, 'setItem').mockReturnValue(vi.fn());
    const user = userEvent.setup();
    renderWithStore(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const input = screen.getByPlaceholderText(/search/i);
    const button = screen.getByRole('button', { name: /search/i });

    await user.type(input, 'Wind Waker');
    await user.click(button);

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'searchTerm',
        JSON.stringify('Wind Waker')
      );
    });
  });

  it('should use cached data on the second identical search', async () => {
    vi.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue(
      JSON.stringify('zelda')
    );

    server.use(
      http.get('https://zelda.fanapis.com/api/games', () => {
        return HttpResponse.json({
          data: [{ id: '1', name: 'Test Game: The Legend of Zelda' }],
        });
      })
    );

    const fetchSpy = vi.spyOn(global, 'fetch');
    const user = userEvent.setup();

    renderWithStore(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const input = screen.getByPlaceholderText(/search/i);
    const searchButton = screen.getByRole('button', { name: /search/i });
    await user.clear(input);
    await user.type(input, 'zelda');
    await user.click(searchButton);

    await screen.findByText(/Test Game: The Legend of Zelda/i);
    expect(fetchSpy).toHaveBeenCalledTimes(1);

    await user.click(searchButton);

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledTimes(1);
    });
  });
});
