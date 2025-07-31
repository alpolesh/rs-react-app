import { screen } from '@testing-library/react';
import FlyoutBar from './FlyoutBar';
import userEvent from '@testing-library/user-event';
import { renderWithStore } from '@src/__tests__/helpers/test-utils/mockStore';

describe('FlyoutBar', () => {
  it('should render when items are selected and disappear after unselect', () => {
    const initialState = {
      game1: {
        gameId: 'game1',
        name: 'Game One',
        description: 'First game',
      },
      game2: {
        gameId: 'game2',
        name: 'Game Two',
        description: 'Second game',
      },
    };

    renderWithStore(<FlyoutBar />, {
      savedGames: initialState,
    });

    expect(screen.getByText(/2 games? selected/i)).toBeInTheDocument();
  });

  it('should empty store when unselect all is clicked', async () => {
    const user = userEvent.setup();
    const initialState = {
      game1: {
        gameId: 'game1',
        name: 'Game One',
        description: 'First game',
      },
      game2: {
        gameId: 'game2',
        name: 'Game Two',
        description: 'Second game',
      },
    };
    const { store } = renderWithStore(<FlyoutBar />, {
      savedGames: initialState,
    });
    const unselectBtn = screen.getByRole('button', { name: /unselect all/i });
    await user.click(unselectBtn);

    expect(store.getState().savedGames).toEqual({});
  });
});
