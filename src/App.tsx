import { Suspense, useState } from 'react';
import CountriesList from './components/CountriesList/CountriesList';
import Spinner from './components/Spinner/Spinner';
import YearInput from './components/YearInput/YearInput';
import AdditionalRowsModal from './components/AdditionalRowsModal/AdditionalRowsModal';
import CountrySearchbar from './components/CountrySearchbar/CountrySearchbar';

export default function App() {
  const [selectedYear, setSelectedYear] = useState<number | undefined>(
    undefined
  );
  const [showModal, setShowModal] = useState(false);
  const [extraColumns, setExtraColumns] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Suspense fallback={<Spinner />}>
      <div className="flex py-5">
        <div className="flex flex-col max-w-3xs">
          <YearInput
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
          />
          <CountrySearchbar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="ml-4 px-4 py-2 h-fit bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Customize Columns
        </button>
      </div>

      <CountriesList
        selectedYear={selectedYear}
        extraColumns={extraColumns}
        searchTerm={searchTerm}
      />

      {showModal && (
        <AdditionalRowsModal
          setShowModal={setShowModal}
          setExtraColumns={setExtraColumns}
          extraColumns={extraColumns}
        />
      )}
    </Suspense>
  );
}
