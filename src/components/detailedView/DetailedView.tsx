import type { Game } from '@src/types/game';
import ErrorResults from '@components/results/ErrorResults';
import DetailedCard from '@components/detailedView/DetailedCard';
import CloseIcon from '@src/icons/close.svg?react';

interface DetailedViewProps {
  selectedGame?: Game;
  loadGameError?: string;
  resetSelectedGameId: (gameId: string) => void;
  refetchSelectedGame: () => void;
}

function formatKey(key: string) {
  return key.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
}

function DetailedView({
  selectedGame,
  loadGameError,
  resetSelectedGameId,
  refetchSelectedGame,
}: DetailedViewProps) {
  if (!selectedGame) return null;

  const entries = Object.entries(selectedGame)
    .filter(([key]) => key !== 'id')
    .map(([key, value]) => ({
      label: formatKey(key),
      value,
      key,
    }));

  const handleCloseClick = () => {
    resetSelectedGameId('');
  };

  if (loadGameError) {
    return (
      <DetailedCard>
        <ErrorResults error={loadGameError} />
      </DetailedCard>
    );
  }

  return (
    <DetailedCard>
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
        Refetch game
      </button>

      <h3 className="text-xl text-center font-semibold text-gray-800">
        Detailed view
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
