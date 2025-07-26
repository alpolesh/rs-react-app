import { createContext } from 'react';

export type PaginationContextType = {
  currentPage: number;
  handleChangePage: (page: number) => void;
};

export const PaginationContext = createContext<PaginationContextType>({
  currentPage: 1,
  handleChangePage: () => {
    throw new Error(
      'handleChangePage was called outside of PaginationProvider'
    );
  },
});
