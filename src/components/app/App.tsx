import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import SearchBar from '@components/searchbar/Searchbar';
import Results from '@components/results/Results';
import Spinner from '@components/spinner/Spinner';
import DetailedView from '@components/detailedView/DetailedView';
import {
  calculateWaitTime,
  getItemFromLocalStorage,
  setItemToLocalStorage,
} from '@src/helpers';
import type { Game, SelectedGameId } from '@src/types/game';
import './App.css';

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
  const [loadResultsError, setLoadResultsError] = useState<Error>(null);

  const [selectedGameId, setSelectedGameId] = useState<SelectedGameId>(null);
  const selectedGameIdParam = searchParams.get('gameid') || null;
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [loadGameError, setLoadGameError] = useState<Error>(null);

  const handleSearch = (term: string) => {
    loadData(term);
  };

  const loadData = (term: string) => {
    setIsLoading(true);
    setLoadResultsError(null);

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
        setLoadResultsError(error.message);
      })
      .finally(() => {
        const waitTime = calculateWaitTime(minSpinnerTime, startTime);
        setTimeout(() => {
          setIsLoading(false);
        }, waitTime);
      });
  };

  const loadSelectedGame = (gameId: string) => {
    setIsLoading(true);
    setLoadGameError(null);

    const minSpinnerTime = 500;
    const startTime = Date.now();

    fetch(`https://zelda.fanapis.com/api/games/${gameId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setSelectedGame(data.data);
      })
      .catch((error) => {
        setLoadGameError(error.message);
      })
      .finally(() => {
        const waitTime = calculateWaitTime(minSpinnerTime, startTime);
        setTimeout(() => {
          setIsLoading(false);
        }, waitTime);
      });
  };

  const handleChangePage = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', page.toString());
    setSearchParams(newParams);
  };

  const handleChangeGameId = (gameId: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('gameid', gameId);
    setSearchParams(newParams);
  };

  useEffect(() => {
    loadData(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    setCurrentPage(pageParam);
  }, [pageParam]);

  useEffect(() => {
    setSelectedGameId(selectedGameIdParam);
  }, [selectedGameIdParam]);

  useEffect(() => {
    if (selectedGameId) {
      loadSelectedGame(selectedGameId);
    }
  }, [selectedGameId]);

  return (
    <div className="app-container flex items-center gap-4 mx-auto px-4 py-4">
      {isLoading && <Spinner />}
      <div className="flex-1">
        <SearchBar onSearch={handleSearch} searchTerm={searchTerm} />
        <Results
          results={results}
          error={loadResultsError}
          currentPage={currentPage}
          onChangePage={handleChangePage}
          onChangeGameId={handleChangeGameId}
        />
      </div>

      {selectedGameId && (
        <DetailedView
          selectedGame={selectedGame}
          loadGameError={loadGameError}
        />
      )}
    </div>
  );
}

export default App;
