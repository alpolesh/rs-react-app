import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { setupStore } from '@src/store/index';
import UncontrolledForm from './UncontrolledForm';

type AppStore = ReturnType<typeof setupStore>;

const renderWithStore = (store: AppStore) => {
  return render(
    <Provider store={store}>
      <UncontrolledForm hide={() => {}} />
    </Provider>
  );
};

describe('UncontrolledForm', () => {
  let store: AppStore;

  beforeEach(() => {
    store = setupStore();
  });

  it('form rendering with all required fields', () => {
    renderWithStore(store);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/gender/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/terms/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/upload picture/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
  });

  it('errors when the form is empty', async () => {
    renderWithStore(store);
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/age is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
      expect(screen.getByText(/please confirm password/i)).toBeInTheDocument();
      expect(screen.getByText(/select gender/i)).toBeInTheDocument();
      expect(screen.getByText(/accept T&C/i)).toBeInTheDocument();
      expect(screen.getByText(/select a valid country/i)).toBeInTheDocument();
    });
  });

  it('show that the password is strong', async () => {
    renderWithStore(store);
    const user = userEvent.setup();

    const passwordInput = screen.getByLabelText(/^password$/i);

    await user.clear(passwordInput);
    await user.type(passwordInput, 'StrongPassword123!');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/password is strong/i)).toBeInTheDocument();
    });
  });

  it('send form data if it is valid', async () => {
    renderWithStore(store);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/age/i), '30');
    await user.type(screen.getByLabelText(/email/i), 'john.doe@example.com');
    await user.type(screen.getByLabelText(/^password$/i), 'StrongPassword123!');
    await user.type(
      screen.getByLabelText(/confirm password/i),
      'StrongPassword123!'
    );
    await user.type(screen.getByLabelText(/country/i), 'Germany');
    await user.click(screen.getByLabelText(/^male$/i));
    await user.click(screen.getByLabelText(/terms/i));
    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(store.getState().formsData.uncontrolledFormData?.data).toEqual(
        expect.objectContaining({
          name: 'John Doe',
          age: 30,
          email: 'john.doe@example.com',
          password1: 'StrongPassword123!',
          password2: 'StrongPassword123!',
          gender: 'male',
          terms: true,
          picture: undefined,
          country: 'Germany',
        })
      );
    });
  });
});
