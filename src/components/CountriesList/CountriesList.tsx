import { useState } from 'react';
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

type SortBy = 'name' | 'population';
type SortDirection = 'asc' | 'desc';

export default function CountriesList({
  selectedYear,
  extraColumns,
  searchTerm,
}: Props) {
  const data = loadCo2Data();

  const [sortBy, setSortBy] = useState<SortBy>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

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

  const sortedRows = [...filteredRows].sort((a, b) => {
    const aValue: string | number =
      sortBy === 'population' ? a.populationLast : a[sortBy];
    const bValue: string | number =
      sortBy === 'population' ? b.populationLast : b[sortBy];

    if (aValue === 'N/A') return 1;
    if (bValue === 'N/A') return -1;

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }

    return sortDirection === 'asc'
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });

  return (
    <div>
      <div className="flex space-x-4 mb-4 ml-5">
        <div>
          <label className="mr-2">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
            className="border rounded px-2 py-1"
          >
            <option value="name">Name</option>
            <option value="population">Population</option>
          </select>
        </div>

        <div>
          <label className="mr-2">Direction:</label>
          <select
            value={sortDirection}
            onChange={(e) => setSortDirection(e.target.value as SortDirection)}
            className="border rounded px-2 py-1"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

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
          {sortedRows.map((row) => (
            <tr key={row.name}>
              {Object.keys(row).map((key) => (
                <TableCell key={`${row.iso_code}:${key}`} value={row[key]} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
