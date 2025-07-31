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

  const handleDownload = () => {
    const csvRows = [
      ['Name', 'Description', 'Game Id'],
      ...selectedItems.map(([, game]) => [
        game.name ?? '',
        game.description ?? '',
        game.gameId ?? '',
      ]),
    ];

    const csvContent = csvRows
      .map((row) =>
        row.map((field) => `"${field.replace(/"/g, '""')}"`).join(',')
      )
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const fileName = `${selectedCount}_games.csv`;
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
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
