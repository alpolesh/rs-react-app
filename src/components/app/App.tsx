import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import SearchBar from '@components/searchbar/Searchbar';
import Results from '@components/results/Results';
import Spinner from '@components/spinner/Spinner';
import {
  calculateWaitTime,
  getItemFromLocalStorage,
  setItemToLocalStorage,
} from '@src/helpers';
import './App.css';

interface Game {
  name: string;
  description: string;
  id: string;
}
type SearchTerm = string;
type Results = Game[];
type IsLoading = boolean;
type Error = string | null;
function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = Number(searchParams.get('page') || '1');
  const [currentPage, setCurrentPage] = useState(pageParam);
  const [searchTerm, setSearchTerm] = useState<SearchTerm>(
    getItemFromLocalStorage('searchTerm') || ''
  );
  const [results, setResults] = useState<Results>([]);
  const [isLoading, setIsLoading] = useState<IsLoading>(false);
  const [error, setError] = useState<Error>(null);

  const handleSearch = (term: string) => {
    loadData(term);
  };

  const loadData = (term: string) => {
    setIsLoading(true);
    setError(null);

    const minSpinnerTime = 500;
    const startTime = Date.now();

    fetch(`https://zelda.fanapis.com/api/games?name=${term}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setResults(data.data);
        setSearchTerm(term);

        setItemToLocalStorage('searchTerm', term);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        const waitTime = calculateWaitTime(minSpinnerTime, startTime);
        setTimeout(() => {
          setIsLoading(false);
        }, waitTime);
      });
  };

  const handleChangePage = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  useEffect(() => {
    loadData(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    setCurrentPage(pageParam);
  }, [pageParam]);

  return (
    <div className="app-container max-w-2xl mx-auto px-4 py-4">
      {isLoading && <Spinner />}
      <SearchBar onSearch={handleSearch} searchTerm={searchTerm} />
      <Results
        results={results}
        error={error}
        currentPage={currentPage}
        onChangePage={handleChangePage}
      />
    </div>
  );
}

export default App;
