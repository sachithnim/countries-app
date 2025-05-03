const Search = ({ onSearch, searchTerm }) => {
  const handleSearch = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        className="p-2 border border-gray-300 rounded"
        placeholder="Search countries..."
      />
    </div>
  );
};

export default Search;
