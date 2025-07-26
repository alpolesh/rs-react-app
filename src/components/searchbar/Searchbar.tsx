import { useState } from 'react';

interface SearchbarProps {
  onSearch: (term: string) => void;
  searchTerm: string;
}

function Searchbar({ searchTerm, onSearch }: SearchbarProps) {
  const [inputValue, setInputValue] = useState(searchTerm || '');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(inputValue.trim());
    setInputValue((prevState) => prevState.trim());
  };

  return (
    <div className="flex items-center justify-center space-x-4 p-4 max-w-sm mx-auto">
      <input
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ease-in-out duration-200"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      <button onClick={handleSearchClick} className="bg-black">
        Search
      </button>
    </div>
  );
}

export default Searchbar;
