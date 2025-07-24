import type { Game } from '@src/types/game';
import ErrorResults from '@components/results/ErrorResults';

interface DetailedViewProps {
  selectedGame: Game | null;
  loadGameError: string | null;
}

function formatKey(key: string) {
  return key.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
}

function DetailedView({ selectedGame, loadGameError }: DetailedViewProps) {
  if (!selectedGame) return null;

  const entries = Object.entries(selectedGame)
    .filter(([key]) => key !== 'id')
    .map(([key, value]) => ({
      label: formatKey(key),
      value,
      key,
    }));

  if (loadGameError) {
    return <ErrorResults error={loadGameError} />;
  }

  return (
    <div className="lg:w-1/2 bg-white rounded-xl shadow-md p-6 mx-auto mt-8 space-y-6 w-full">
      <h3 className="text-xl text-center font-semibold text-gray-800">
        Detailed view
      </h3>
      {entries.map(({ key, label, value }) => (
        <div key={key}>
          <strong className="text-gray-800">{label}</strong>
          <p className="text-gray-600">{value}</p>
        </div>
      ))}
    </div>
  );
}

export default DetailedView;
