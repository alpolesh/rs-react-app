import { useSearchParams, Link } from 'react-router';
import SearchBar from '@components/searchbar/Searchbar';
import Results from '@components/results/Results';
import Spinner from '@components/spinner/Spinner';
import DetailedView from '@components/detailedView/DetailedView';
import getErrorMessage from '@src/helpers/getErrorMessage';
import useLocalStorage from '@src/hooks/useLocalStorage';
import useCustomSearchParams from '@src/hooks/useCustomSearchParams';
import {
  useGetGamesByNameQuery,
  useGetGameByIdQuery,
} from '@src/store/api/gamesApi';
import './App.css';
import ThemeChanger from '@components/themeChanger/ThemeChanger';

type SearchTerm = string;

function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedGameIdParam, setSelectedGameIdToExistedParams] =
    useCustomSearchParams('gameid');
  const [searchTerm, setSearchTerm] = useLocalStorage<SearchTerm>(
    'searchTerm',
    ''
  );

  const setParamToExistedParams = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);
    setSearchParams(newParams);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setParamToExistedParams('page', '1');
  };

  const handleChangeGameId = (gameId: string) => {
    setSelectedGameIdToExistedParams(gameId);
  };

  const {
    data: games = [],
    error: gamesError,
    isFetching: isGamesFetching,
    refetch: refetchGames,
  } = useGetGamesByNameQuery(searchTerm);

  const {
    data: selectedGame,
    error: selectedGameError,
    isFetching: isGameFetching,
    refetch: refetchSelectedGame,
  } = useGetGameByIdQuery(selectedGameIdParam, {
    skip: !selectedGameIdParam,
  });

  const isLoading = isGamesFetching || isGameFetching;

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
              results={games}
              error={getErrorMessage(gamesError)}
              onChangeGameId={handleChangeGameId}
              refetchGames={refetchGames}
            />
          </div>

          {selectedGameIdParam && (
            <DetailedView
              selectedGame={selectedGame}
              loadGameError={getErrorMessage(selectedGameError)}
              resetSelectedGameId={handleChangeGameId}
              refetchSelectedGame={refetchSelectedGame}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
