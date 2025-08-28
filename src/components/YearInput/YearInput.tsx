type Props = {
  selectedYear: number | undefined;
  setSelectedYear: (year: number | undefined) => void;
};

export default function YearInput({ selectedYear, setSelectedYear }: Props) {
  return (
    <>
      <label htmlFor="year" className="mx-5">
        Year
      </label>
      <input
        className="px-4 my-5 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ease-in-out duration-200"
        id="year"
        type="number"
        value={selectedYear ?? ''}
        onChange={(e) => {
          const val = e.target.value;
          setSelectedYear(val ? parseInt(val) : undefined);
        }}
      ></input>
    </>
  );
}
