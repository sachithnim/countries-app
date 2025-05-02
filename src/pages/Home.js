import { useState } from "react";
import useCountries from "../hooks/useCountries";
import CountryCard from "../components/CountryCard";
import LoadingSpinner from "../components/LoadingSpinner";
import Search from "../components/Search";
import Filter from "../components/Filter";

const Home = () => {
  const {
    countries,
    loading,
    error,
    searchCountries,
    filterByRegionAndLanguage,
    regions,
    languages,
  } = useCountries();

  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
 // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handleRegionFilter = (region) => {
    setSelectedRegion(region);
    setCurrentPage(1);
    filterByRegionAndLanguage(region, selectedLanguage);
  };

  const handleLanguageFilter = (language) => {
    setSelectedLanguage(language);
    setCurrentPage(1);
    filterByRegionAndLanguage(selectedRegion, language);
  };

  // Clear all filters
  const handleResetFilters = () => {
    setSelectedRegion("");
    setSelectedLanguage("");
    setCurrentPage(1);
    filterByRegionAndLanguage("", "");
  };

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCountries = Array.isArray(countries)
    ? countries.slice(startIndex, endIndex)
    : [];

  const totalPages = Math.ceil(countries.length / itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold p-4">Country Finder</h1>
      <Search onSearch={searchCountries} />
      
      <div className="flex justify-between items-center px-4">
        <Filter
          onRegionFilter={handleRegionFilter}
          onLanguageFilter={handleLanguageFilter}
          regions={regions}
          languages={languages}
        />
        <button
          onClick={handleResetFilters}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Reset Filter
        </button>
      </div>

      {loading && <LoadingSpinner />}
      {error && <div className="text-red-500 p-4">Error: {error}</div>}

      {/* Show match count */}
      {!loading && Array.isArray(countries) && (
        <div className="px-4 py-2 text-gray-700 font-medium">
          Matching Countries: {countries.length}
        </div>
      )}

      <div className="grid grid-cols-4 gap-4 p-4">
        {paginatedCountries.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>

      {countries.length > itemsPerPage && (
        <div className="flex justify-center items-center space-x-4 p-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
