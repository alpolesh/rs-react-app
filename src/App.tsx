import { Suspense, useState } from 'react';
import CountriesList from './components/CountriesList/CountriesList';
import Spinner from './components/Spinner/Spinner';
import YearInput from './components/YearInput/YearInput';

export default function App() {
  const [selectedYear, setSelectedYear] = useState<number | undefined>(
    undefined
  );
  return (
    <Suspense fallback={<Spinner />}>
      <YearInput
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
      />
      <CountriesList selectedYear={selectedYear} />
    </Suspense>
  );
}
