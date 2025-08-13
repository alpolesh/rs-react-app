import { useSelector } from 'react-redux';
import type { RootState } from '@src/store';
import FlyoutBar from '@components/flyoutbar/FlyoutBar';
import Spinner from '@components/spinner/Spinner';

interface ResultsWrapperProps {
  children: React.ReactNode;
  refetchGames: () => void;
  isGamesFetching: boolean;
}

function ResultsWrapper({
  children,
  refetchGames,
  isGamesFetching,
}: ResultsWrapperProps) {
  const savedGames = useSelector((state: RootState) => state.savedGames);
  return (
    <>
      {isGamesFetching && <Spinner />}
      <div className="bg-white rounded-xl shadow-md p-6 mx-auto mt-8 w-full relative">
        <button
          onClick={refetchGames}
          className="absolute top-4 !p-[5px] left-4 bg-purple-600"
          aria-label="Refetch game details"
        >
          Refetch list
        </button>

        <h3 className="text-xl text-center font-semibold text-gray-800 mb-4">
          Search Results
        </h3>
        {children}
        {Object.keys(savedGames).length > 0 && <FlyoutBar />}
      </div>
    </>
  );
}

export default ResultsWrapper;
