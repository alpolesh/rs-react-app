'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@src/store';
import { setSearchTerm } from '@src/store/slices/searchTermSlice';
import useLocalStorage from '@src/hooks/useLocalStorage';

type SearchTerm = string;

function Searchbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTerm = useSelector((state: RootState) => state.searchTerm);
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState(searchTerm || '');

  const [, setSearchTermToLocalStorage] = useLocalStorage<SearchTerm>(
    'searchTerm',
    ''
  );

  const setParamToExistedParams = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);
    router.push(`?${newParams.toString()}`);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearchClick = () => {
    const term = inputValue.trim();
    dispatch(setSearchTerm(term));
    setSearchTermToLocalStorage(term);
    setParamToExistedParams('page', '1');
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
