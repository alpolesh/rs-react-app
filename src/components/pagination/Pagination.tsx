import { getPageNumbers } from '@src/helpers/helpers';

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  handleChangePage: (page: number) => void;
}

function Pagination({
  itemsPerPage,
  totalItems,
  currentPage,
  handleChangePage,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = getPageNumbers(currentPage, totalPages);
  return (
    <nav
      className="flex items-center justify-center space-x-2 mt-4"
      aria-label="Pagination"
    >
      <button
        onClick={() => handleChangePage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-black rounded-md hover:bg-yellow-500 disabled:opacity-50 disabled:pointer-events-none"
      >
        Prev
      </button>

      {pageNumbers.map((page) =>
        page === 'dots' ? (
          <span
            key={`dots-${Math.random()}`}
            className="px-3 py-1 text-gray-500"
          >
            ...
          </span>
        ) : (
          <button
            key={`page-${page}`}
            onClick={() => handleChangePage(page)}
            className={`px-3 py-1 border rounded-md ${
              page === currentPage
                ? 'bg-blue-500 border-blue-600'
                : 'bg-black hover:bg-yellow-500'
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => handleChangePage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-black rounded-md hover:bg-yellow-500 disabled:opacity-50 disabled:pointer-events-none"
      >
        Next
      </button>
    </nav>
  );
}

export default Pagination;
