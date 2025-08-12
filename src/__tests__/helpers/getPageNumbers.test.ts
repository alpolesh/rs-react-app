import { getPageNumbers } from '@src/helpers/helpers';

describe('getPageNumbers', () => {
  it('returns all pages when totalPages <= maxVisible', () => {
    expect(getPageNumbers(1, 3)).toEqual([1, 2, 3]);
    expect(getPageNumbers(2, 5)).toEqual([1, 2, 3, 4, 5]);
  });

  it('shows first, last, and dots correctly when currentPage is in the middle', () => {
    expect(getPageNumbers(5, 10)).toEqual([
      1,
      'dots',
      3,
      4,
      5,
      6,
      7,
      'dots',
      10,
    ]);
  });

  it('wors correctly if totalPages > maxVisible', () => {
    expect(getPageNumbers(2, 7, 4)).toEqual([1, 2, 3, 4, 'dots', 7]);
  });
});
