import { Suspense } from 'react';
import CountriesList from './components/CountriesList/CountriesList';
import Spinner from './components/Spinner/Spinner';

export default function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <CountriesList />
    </Suspense>
  );
}
