import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@src/store';
import { deleteSavedGame } from '@src/store/slices/savedGamesSlice';

function FlyoutBar() {
  const savedGames = useSelector((state: RootState) => state.savedGames);
  const dispatch = useDispatch();

  const selectedItems = Object.entries(savedGames);
  const selectedCount = selectedItems.length;

  const handleUnselectAll = () => {
    selectedItems.forEach(([key]) => {
      dispatch(deleteSavedGame(key));
    });
  };

  const handleDownload = async () => {
    const gamesArray = selectedItems.map(([, game]) => game);

    const res = await fetch('/api/games-csv', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ games: gamesArray }),
    });

    if (!res.ok) {
      console.error('Failed to download CSV');
      return;
    }

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedCount}_games.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-indigo-600 text-white shadow-lg py-3 px-6 flex justify-between items-center z-50">
      <span className="text-sm font-medium">
        {selectedCount} game{selectedCount > 1 ? 's' : ''} selected
      </span>
      <div className="space-x-2">
        <button
          onClick={handleUnselectAll}
          className="bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-semibold px-4 py-2 rounded"
        >
          Unselect all
        </button>
        <button
          onClick={handleDownload}
          className="bg-green-500 text-white hover:bg-green-700 text-sm font-semibold px-4 py-2 rounded"
        >
          Download
        </button>
      </div>
    </div>
  );
}

export default FlyoutBar;
