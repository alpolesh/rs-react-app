import { loadCo2Data } from '../../resource/co2Resource';
import TableCell from './TableCell';

interface RowData {
  name: string;
  iso_code: string;
  populationLast: number | 'N/A';
  year: number;
  population: number | 'N/A';
  co2: number | 'N/A';
  co2_per_capita: number | 'N/A';
  [key: string]: string | number | 'N/A';
}

type Props = {
  selectedYear?: number;
  extraColumns: string[];
  searchTerm: string;
};

export default function CountriesList({
  selectedYear,
  extraColumns,
  searchTerm,
}: Props) {
  const data = loadCo2Data();

  const rows: RowData[] = Object.entries(data).map(([name, country]) => {
    const latestData = [...country.data]
      .reverse()
      .find((d) => d.population !== undefined);

    const y =
      selectedYear !== undefined
        ? (country.data.find((d) => d.year === selectedYear) ??
          country.data[country.data.length - 1])
        : (latestData ?? country.data[country.data.length - 1]);

    const base: RowData = {
      name,
      populationLast: latestData?.population ?? 'N/A',
      iso_code: country.iso_code ?? 'N/A',
      year: y.year,
      population: y.population ?? 'N/A',
      co2: y.co2 ?? 'N/A',
      co2_per_capita: y.co2_per_capita ?? 'N/A',
    };

    extraColumns.forEach((col) => {
      base[col] = y[col] ?? 'N/A';
    });

    return base;
  });

  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase() || '')
  );

  return (
    <table className="border border-gray-300 border-collapse w-full">
      <thead>
        <tr>
          <th className="border border-gray-300 px-2 py-1">Name</th>
          <th className="border border-gray-300 px-2 py-1">
            Population (latest)
          </th>
          <th className="border border-gray-300 px-2 py-1">ISO Code</th>
          <th className="border border-gray-300 px-2 py-1">Year</th>
          <th className="border border-gray-300 px-2 py-1">Population</th>
          <th className="border border-gray-300 px-2 py-1">CO2</th>
          <th className="border border-gray-300 px-2 py-1">CO2 per capita</th>
          {extraColumns.map((col) => (
            <th key={col} className="border border-gray-300 px-2 py-1">
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filteredRows.map((row) => (
          <tr key={row.name}>
            {Object.keys(row).map((key) => {
              return <TableCell key={key + row[key]} value={row[key]} />;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
