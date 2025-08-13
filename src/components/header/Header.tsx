import SearchBar from '@components/searchbar/Searchbar';
import ThemeChanger from '@components/themeChanger/ThemeChanger';
import Link from 'next/link';

export default function Header() {
  return (
    <div className="flex items-center">
      <Link href="/about">
        <button className="bg-green-500 text-white px-4 py-2 rounded shadow">
          About
        </button>
      </Link>
      <SearchBar />
      <ThemeChanger />
    </div>
  );
}
