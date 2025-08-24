import { useSelector } from 'react-redux';
import type { RootState } from '@src/store';
import useCustomSearchParams from '@src/hooks/useCustomSearchParams';
import { useGetGamesByNameQuery } from '@src/store/api/gamesApi';
import getErrorMessage from '@src/helpers/getErrorMessage';
import ResultsWrapper from '@components/results/ResultsWrapper';
import ErrorResults from '@components/results/ErrorResults';
import ResultItem from '@components/results/ResultItem';
import Pagination from '@components/pagination/Pagination';
import { useTranslations } from 'next-intl';

function Results() {
  const t = useTranslations('Results');
  const [pageParam, setPageParamToExistedParams] =
    useCustomSearchParams('page');
  const currentPage = Number(pageParam || '1');

  const searchTerm = useSelector((state: RootState) => state.searchTerm);

  const {
    data: games = [],
    error: gamesError,
    isFetching: isGamesFetching,
    refetch: refetchGames,
  } = useGetGamesByNameQuery(searchTerm);

  const itemsPerPage = 3;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedResults = games.slice(startIndex, startIndex + itemsPerPage);

  const handleChangePage = (page: number) => {
    setPageParamToExistedParams(page.toString());
  };

  if (gamesError) {
    return (
      <ResultsWrapper
        refetchGames={refetchGames}
        isGamesFetching={isGamesFetching}
      >
        <div className="text-red-600">
          <ErrorResults error={getErrorMessage(gamesError)} />
        </div>
      </ResultsWrapper>
    );
  }

  if (games.length === 0) {
    return (
      <ResultsWrapper
        refetchGames={refetchGames}
        isGamesFetching={isGamesFetching}
      >
        <p className="text-gray-500 italic">{t('noResults')}</p>
      </ResultsWrapper>
    );
  }

  return (
    <ResultsWrapper
      refetchGames={refetchGames}
      isGamesFetching={isGamesFetching}
    >
      <ul className="space-y-2">
        {paginatedResults.map((item) => {
          return (
            <ResultItem
              key={item.id}
              gameId={item.id}
              name={item.name}
              description={item.description}
            />
          );
        })}
      </ul>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={games.length}
        currentPage={currentPage}
        handleChangePage={handleChangePage}
      />
    </ResultsWrapper>
  );
}

export default Results;
