import useHighlightOnYearChange from '../../hooks/useHighlightOnChange';

type CellProps = {
  value: string | number | 'N/A';
  year: number;
};

function TableCell({ value, year }: CellProps) {
  const highlight = useHighlightOnYearChange(value, year);
  return (
    <td
      className={`border px-2 py-1 transition-colors duration-500 ${
        highlight ? 'bg-yellow-200' : ''
      }`}
    >
      {value}
    </td>
  );
}

export default TableCell;
