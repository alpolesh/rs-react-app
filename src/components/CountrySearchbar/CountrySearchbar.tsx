type Props = {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
};

export default function CountrySearchbar({ searchTerm, setSearchTerm }: Props) {
  return (
    <div className="flex items-center w-3xs">
      <label htmlFor="search" className="mx-5">
        Search
      </label>
      <input
        type="text"
        id="search"
        placeholder="Search countries..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="px-4 py-2 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ease-in-out duration-200 "
      />
    </div>
  );
}
