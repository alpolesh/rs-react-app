import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@src/store';
import {
  setSavedGame,
  deleteSavedGame,
} from '@src/store/slices/savedGamesSlice';

interface ResultItemProps {
  gameId: string;
  onChangeGameId: (gameId: string) => void;
  name?: string;
  description?: string;
}

function ResultItem({
  gameId,
  onChangeGameId,
  name = 'No name',
  description = 'No description',
}: ResultItemProps) {
  const dispatch = useDispatch();
  const isChecked = useSelector(
    (state: RootState) => !!state.savedGames[gameId]
  );

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (isChecked) {
      dispatch(deleteSavedGame(gameId));
    } else {
      dispatch(
        setSavedGame({
          gameId,
          details: { name, description, gameId },
        })
      );
    }
  };
  return (
    <li
      className="flex items-start gap-2 border border-gray-200 rounded-lg p-3 hover:shadow-sm transition cursor-pointer"
      onClick={() => onChangeGameId(gameId)}
    >
      <input
        type="checkbox"
        className="mt-1 accent-indigo-600 cursor-pointer"
        checked={isChecked}
        onClick={(e) => e.stopPropagation()}
        onChange={handleCheckboxChange}
      />
      <div>
        <strong className="text-gray-800">{name}</strong>
        <span className="text-gray-600">: {description}</span>
      </div>
    </li>
  );
}

export default ResultItem;
