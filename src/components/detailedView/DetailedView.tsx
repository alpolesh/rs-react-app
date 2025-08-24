import getErrorMessage from '@src/helpers/getErrorMessage';
import useCustomSearchParams from '@src/hooks/useCustomSearchParams';
import { useGetGameByIdQuery } from '@src/store/api/gamesApi';
import ErrorResults from '@components/results/ErrorResults';
import DetailedCard from '@components/detailedView/DetailedCard';
import CloseIcon from '@src/icons/close.svg?react';
import { useTranslations } from 'next-intl';

function formatKey(key: string) {
  return key.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
}

function DetailedView() {
  const t = useTranslations('DetailedView');
  const [selectedGameIdParam, setSelectedGameIdToExistedParams] =
    useCustomSearchParams('gameid');

  const {
    data: selectedGame,
    error: selectedGameError,
    isFetching: isGameFetching,
    refetch: refetchSelectedGame,
  } = useGetGameByIdQuery(selectedGameIdParam, {
    skip: !selectedGameIdParam,
  });

  if (!selectedGame) return null;

  const entries = Object.entries(selectedGame)
    .filter(([key]) => key !== 'id')
    .map(([key, value]) => ({
      label: formatKey(key),
      value,
      key,
    }));

  const handleCloseClick = () => {
    setSelectedGameIdToExistedParams('');
  };

  if (selectedGameError) {
    return (
      <DetailedCard isGameFetching={isGameFetching}>
        <ErrorResults error={getErrorMessage(selectedGameError)} />
      </DetailedCard>
    );
  }

  return (
    <DetailedCard isGameFetching={isGameFetching}>
      <button
        onClick={handleCloseClick}
        className="absolute top-4 !p-[5px] right-4 bg-black"
        aria-label="Close detailed view"
      >
        <CloseIcon className="w-6 h-6" />
      </button>

      <button
        onClick={refetchSelectedGame}
        className="absolute top-4 !p-[5px] left-4 bg-purple-600"
        aria-label="Refetch game details"
      >
        {t('refetchButton')}
      </button>

      <h3 className="text-xl text-center font-semibold text-gray-800">
        {t('title')}
      </h3>
      {entries.map(({ key, label, value }) => (
        <div key={key}>
          <strong className="text-gray-800">{label}</strong>
          <p className="text-gray-600">{value}</p>
        </div>
      ))}
    </DetailedCard>
  );
}

export default DetailedView;
