//eslint-disable-next-line
const SearchMap = ({ search, setSearch, handleSubmit }) => {
  return (
    <form className="w-full mx-auto mt-3" onSubmit={handleSubmit}>
      <div className="relative">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          id="default-search"
          className="block w-full py-2 px-2 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-0"
          placeholder="Enter Vehichle Number"
          required
        />
        <button
          type="submit"
          className="text-white bg-white absolute end-0.5 bottom-1 font-medium rounded-lg text-sm px-4 py-2"
        >
          <svg
            className="w-4 h-4 text-black"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default SearchMap;
