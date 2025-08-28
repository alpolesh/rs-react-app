import { loadCo2Data } from '../../resource/co2Resource';

interface RowData {
  name: string;
  iso_code: string;
  populationLast: number | 'N/A';
  year: number | 'N/A';
  population: number | 'N/A';
  co2: number | 'N/A';
  co2_per_capita: number | 'N/A';
}

type Props = {
  selectedYear: number | undefined;
};
export default function CountriesList({ selectedYear }: Props) {
  const data = loadCo2Data();

  const rows: RowData[] = Object.entries(data).map(([name, country]) => {
    const latestPopulationData = [...country.data]
      .reverse()
      .find((d) => d.population !== undefined);

    const populationLast = latestPopulationData?.population ?? 'N/A';

    const latestYearData = [...country.data]
      .reverse()
      .find((d) => d.year !== undefined);

    const yearData = selectedYear
      ? country.data.find((d) => d.year === selectedYear)
      : latestYearData;

    return {
      name,
      iso_code: country.iso_code ?? 'N/A',
      populationLast,
      year: yearData?.year ?? 'N/A',
      population: yearData?.population ?? 'N/A',
      co2: yearData?.co2 ?? 'N/A',
      co2_per_capita: yearData?.co2_per_capita ?? 'N/A',
    };
  });

  return (
    <table className="border border-gray-300 border-collapse w-full">
      <thead>
        <tr>
          <th className="border border-gray-300 px-2 py-1">Name</th>
          <th className="border border-gray-300 px-2 py-1">Population</th>
          <th className="border border-gray-300 px-2 py-1">ISO Code</th>
          <th className="border border-gray-300 px-2 py-1">Year</th>
          <th className="border border-gray-300 px-2 py-1">Population</th>
          <th className="border border-gray-300 px-2 py-1">CO2</th>
          <th className="border border-gray-300 px-2 py-1">CO2 per capita</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.name}>
            <td className="border border-gray-300 px-2 py-1">{row.name}</td>
            <td className="border border-gray-300 px-2 py-1">
              {row.populationLast}
            </td>
            <td className="border border-gray-300 px-2 py-1">{row.iso_code}</td>
            <td className="border border-gray-300 px-2 py-1">{row.year}</td>
            <td className="border border-gray-300 px-2 py-1">
              {row.population}
            </td>
            <td className="border border-gray-300 px-2 py-1">{row.co2}</td>
            <td className="border border-gray-300 px-2 py-1">
              {row.co2_per_capita}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
