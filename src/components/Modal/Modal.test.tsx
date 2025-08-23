import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from './Modal';

describe('Modal', () => {
  let hideMock: () => void;

  beforeEach(() => {
    hideMock = vi.fn();
  });

  it('renders children in portal', () => {
    render(<Modal hide={hideMock}>Hello Modal</Modal>);
    expect(screen.getByText('Hello Modal')).toBeInTheDocument();
  });

  it('calls hide() when close button is clicked', async () => {
    const user = userEvent.setup();
    render(<Modal hide={hideMock}>Content</Modal>);
    const closeBtn = screen.getByRole('button', { name: /close/i });
    await user.click(closeBtn);
    expect(hideMock).toHaveBeenCalledTimes(1);
  });

  it('calls hide() when pressing Escape', async () => {
    const user = userEvent.setup();
    render(<Modal hide={hideMock}>Content</Modal>);
    await user.keyboard('{Escape}');
    expect(hideMock).toHaveBeenCalledTimes(1);
  });

  it('calls hide() when clicking outside the modal content', async () => {
    const user = userEvent.setup();
    render(<Modal hide={hideMock}>Content</Modal>);
    const overlay = screen.getByRole('dialog');
    await user.click(overlay);
    expect(hideMock).toHaveBeenCalledTimes(1);
  });

  it('focuses modal on open and restores focus on close', () => {
    const button = document.createElement('button');
    document.body.appendChild(button);
    button.focus();

    const { unmount } = render(<Modal hide={hideMock}>Content</Modal>);

    expect(screen.getByRole('dialog')).toHaveFocus();

    unmount();
    expect(button).toHaveFocus();
  });
});
