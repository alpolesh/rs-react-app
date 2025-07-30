import { useSelector } from 'react-redux';
import type { RootState } from '@src/store';
import useCustomSearchParams from '@src/hooks/useCustomSearchParams';
import ErrorResults from '@components/results/ErrorResults';
import ResultItem from '@components/results/ResultItem';
import Pagination from '@components/pagination/Pagination';
import FlyoutBar from '@components/flyoutbar/FlyoutBar';

interface SearchResult {
  name?: string;
  description?: string;
  id: string;
}

interface ResultsProps {
  results: SearchResult[];
  error: string | null;
  onChangeGameId: (gameId: string) => void;
}

function Results({ results, error, onChangeGameId }: ResultsProps) {
  const [pageParam, setPageParamToExistedParams] =
    useCustomSearchParams('page');
  const currentPage = Number(pageParam || '1');

  const savedGames = useSelector((state: RootState) => state.savedGames);

  const itemsPerPage = 3;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedResults = results.slice(startIndex, startIndex + itemsPerPage);

  const handleChangePage = (page: number) => {
    setPageParamToExistedParams(page.toString());
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mx-auto mt-8 w-full">
      <h3 className="text-xl text-center font-semibold text-gray-800">
        Search Results
      </h3>

      {error ? (
        <div className="text-red-600">
          <ErrorResults error={error} />
        </div>
      ) : results.length === 0 ? (
        <p className="text-gray-500 italic">No results found.</p>
      ) : (
        <>
          <ul className="space-y-2">
            {paginatedResults.map((item) => {
              return (
                <ResultItem
                  key={item.id}
                  gameId={item.id}
                  onChangeGameId={onChangeGameId}
                  name={item.name}
                  description={item.description}
                />
              );
            })}
          </ul>
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={results.length}
            currentPage={currentPage}
            handleChangePage={handleChangePage}
          />
          {Object.keys(savedGames).length > 0 && <FlyoutBar />}
        </>
      )}
    </div>
  );
}

export default Results;
