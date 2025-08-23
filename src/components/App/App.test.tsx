import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { setupStore } from '@src/store';
import App from './App';

it('opens uncontrolled form modal when button clicked', async () => {
  const user = userEvent.setup();
  const store = setupStore();

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const buttons = screen.getAllByRole('button', { name: /open modal/i });
  await user.click(buttons[1]);

  expect(screen.getByRole('dialog')).toBeInTheDocument();
  expect(screen.getByText(/uncontrolled form/i)).toBeInTheDocument();
});

it('opens user hook form modal when button clicked', async () => {
  const user = userEvent.setup();
  const store = setupStore();

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const buttons = screen.getAllByRole('button', { name: /open modal/i });
  await user.click(buttons[0]);

  expect(screen.getByRole('dialog')).toBeInTheDocument();
  expect(screen.getByText(/react hook form/i)).toBeInTheDocument();
});
