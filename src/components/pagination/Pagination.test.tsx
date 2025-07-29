import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from '@components/pagination/Pagination';

describe('Pagination component', () => {
  const setup = (
    itemsPerPage: number,
    totalPages: number,
    currentPage: number,
    handleChangePage = vi.fn()
  ) => {
    render(
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={totalPages}
        currentPage={currentPage}
        handleChangePage={handleChangePage}
      />
    );
    return handleChangePage;
  };

  it('renders Prev and Next buttons', () => {
    setup(3, 10, 1);

    expect(screen.getByRole('button', { name: /Prev/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Next/i })).toBeInTheDocument();
  });

  it('disables Prev button on first page', () => {
    setup(3, 10, 1);

    expect(screen.getByRole('button', { name: /Prev/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /Next/i })).not.toBeDisabled();
  });

  it('disables Next button on last page', () => {
    setup(3, 9, 3);

    expect(screen.getByRole('button', { name: /Prev/i })).not.toBeDisabled();
    expect(screen.getByRole('button', { name: /Next/i })).toBeDisabled();
  });

  it('calls handleChangePage with correct page when page button is clicked', async () => {
    const user = userEvent.setup();
    const handleChangePage = setup(3, 9, 1);

    const page2Button = screen.getByRole('button', { name: '2' });
    await user.click(page2Button);

    expect(handleChangePage).toHaveBeenCalledWith(2);
  });

  it('calls handleChangePage with currentPage - 1 on Prev button click', async () => {
    const user = userEvent.setup();
    const handleChangePage = setup(3, 9, 2);

    const prevButton = screen.getByRole('button', { name: /Prev/i });
    await user.click(prevButton);

    expect(handleChangePage).toHaveBeenCalledWith(1);
  });

  it('calls handleChangePage with currentPage + 1 on Next button click', async () => {
    const user = userEvent.setup();
    const handleChangePage = setup(3, 9, 2);

    const nextButton = screen.getByRole('button', { name: /Next/i });
    await user.click(nextButton);

    expect(handleChangePage).toHaveBeenCalledWith(3);
  });
});
