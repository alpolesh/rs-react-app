import { useEffect, useState, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router';
import SearchBar from '@components/searchbar/Searchbar';
import Results from '@components/results/Results';
import Spinner from '@components/spinner/Spinner';
import DetailedView from '@components/detailedView/DetailedView';
import { calculateWaitTime } from '@src/helpers';
import { fetchGamesByName, fetchGameById } from '@src/api/games';
import useLocalStorage from '@src/hooks/useLocalStorage';
import useCustomSearchParams from '@src/hooks/useCustomSearchParams';
import type { Game } from '@src/types/game';
import './App.css';
import ThemeChanger from '@components/themeChanger/ThemeChanger';

type SearchTerm = string;
type Results = Game[];
type IsLoading = boolean;
type Error = string | null;

function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedGameIdParam, setSelectedGameIdToExistedParams] =
    useCustomSearchParams('gameid');
  const [searchTerm, setSearchTerm] = useLocalStorage<SearchTerm>(
    'searchTerm',
    ''
  );
  const [results, setResults] = useState<Results>([]);
  const [isLoading, setIsLoading] = useState<IsLoading>(false);
  const [loadResultsError, setLoadResultsError] = useState<Error>(null);

  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [loadGameError, setLoadGameError] = useState<Error>(null);

  const setParamToExistedParams = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);
    setSearchParams(newParams);
  };

  const handleSearch = (term: string) => {
    loadData(term);
    setSearchTerm(term);
    setParamToExistedParams('page', '1');
  };

  const loadData = useCallback((term: string) => {
    setIsLoading(true);
    setLoadResultsError(null);

    const minSpinnerTime = 500;
    const startTime = Date.now();

    fetchGamesByName(term)
      .then((data) => {
        setResults(data);
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
  }, []);

  const loadSelectedGame = (gameId: string) => {
    setIsLoading(true);
    setLoadGameError(null);

    const minSpinnerTime = 500;
    const startTime = Date.now();

    fetchGameById(gameId)
      .then((data) => {
        setSelectedGame(data);
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

  const handleChangeGameId = (gameId: string) => {
    setSelectedGameIdToExistedParams(gameId);
  };

  useEffect(() => {
    loadData(searchTerm);
  }, [searchTerm, loadData]);

  useEffect(() => {
    if (selectedGameIdParam) {
      loadSelectedGame(selectedGameIdParam);
    }
  }, [selectedGameIdParam]);

  return (
    <>
      {isLoading && <Spinner />}
      <div className="min-h-screen flex flex-col px-4 py-4">
        <div className="flex items-center">
          <Link to="/about">
            <button className="bg-green-500 text-white px-4 py-2 rounded shadow">
              About
            </button>
          </Link>
          <SearchBar onSearch={handleSearch} searchTerm={searchTerm} />
          <ThemeChanger />
        </div>

        <div className="flex flex-1 gap-4 pb-16">
          <div className="flex-1">
            <Results
              results={results}
              error={loadResultsError}
              onChangeGameId={handleChangeGameId}
            />
          </div>

          {selectedGameIdParam && (
            <DetailedView
              selectedGame={selectedGame}
              loadGameError={loadGameError}
              resetSelectedGameId={handleChangeGameId}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
