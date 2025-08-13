'use client';

import Link from 'next/link';

import SearchBar from '@components/searchbar/Searchbar';
import Results from '@components/results/Results';
import Spinner from '@components/spinner/Spinner';
import DetailedView from '@components/detailedView/DetailedView';
import getErrorMessage from '@src/helpers/getErrorMessage';
import useCustomSearchParams from '@src/hooks/useCustomSearchParams';
import { useGetGameByIdQuery } from '@src/store/api/gamesApi';
import './App.css';
import ThemeChanger from '@components/themeChanger/ThemeChanger';

function App() {
  const [selectedGameIdParam, setSelectedGameIdToExistedParams] =
    useCustomSearchParams('gameid');

  const handleChangeGameId = (gameId: string) => {
    setSelectedGameIdToExistedParams(gameId);
  };

  const {
    data: selectedGame,
    error: selectedGameError,
    isFetching: isGameFetching,
    refetch: refetchSelectedGame,
  } = useGetGameByIdQuery(selectedGameIdParam, {
    skip: !selectedGameIdParam,
  });

  const isLoading = isGameFetching;

  return (
    <>
      {isLoading && <Spinner />}
      <div className="min-h-screen flex flex-col px-4 py-4">
        <div className="flex items-center">
          <Link href="/about">
            <button className="bg-green-500 text-white px-4 py-2 rounded shadow">
              About
            </button>
          </Link>
          <SearchBar />
          <ThemeChanger />
        </div>

        <div className="flex flex-1 gap-4 pb-16">
          <div className="flex-1">
            <Results />
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
