interface ResultItemProps {
  name?: string;
  description?: string;
}

function ResultItem({
  name = 'No name',
  description = 'No description',
}: ResultItemProps) {
  return (
    <li className="border border-gray-200 rounded-lg p-3 hover:shadow-sm transition">
      <strong className="text-gray-800">{name}</strong>
      <span className="text-gray-600">: {description}</span>
    </li>
  );
}

export default ResultItem;
