import useHighlightOnChange from '../../hooks/useHighlightOnChange';

type CellProps = {
  value: string | number | 'N/A';
};

function TableCell({ value }: CellProps) {
  const highlight = useHighlightOnChange(value);
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
