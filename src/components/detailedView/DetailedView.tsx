import type { Game } from '@src/types/game';
import ErrorResults from '@components/results/ErrorResults';

interface DetailedViewProps {
  selectedGame: Game | undefined;
  loadGameError: string | undefined;
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

  return (
    <div className="lg:w-1/2 bg-white rounded-xl shadow-md p-6 mx-auto mt-8 space-y-6 w-full h-fit relative">
      {loadGameError ? (
        <ErrorResults error={loadGameError} />
      ) : (
        <>
          <button
            onClick={handleCloseClick}
            className="absolute top-4 !p-[5px] right-4 bg-black"
            aria-label="Close detailed view"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
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
        </>
      )}
    </div>
  );
}

export default DetailedView;
