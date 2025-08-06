export const getItemFromLocalStorage = (key: string) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const setItemToLocalStorage = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getPageNumbers = (
  currentPage: number,
  totalPages: number,
  maxVisible = 5
) => {
  const pages: (number | 'dots')[] = [];

  if (totalPages <= maxVisible) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return pages;
  }

  pages.push(1);

  const start = Math.max(currentPage - 2, 2);
  const end = Math.min(currentPage + 2, totalPages - 1);

  if (start > 2) pages.push('dots');

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < totalPages - 1) pages.push('dots');

  pages.push(totalPages);

  return pages;
};
