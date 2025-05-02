import { useState, useEffect } from "react";
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
    fetchCountriesByRegion,
    fetchCountriesByLanguage,
    regions,
    languages,
  } = useCountries();
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handleRegionFilter = (region) => {
    // fetch countries based on region directly
    setCurrentPage(1);
    fetchCountriesByRegion(region);
  };

  const handleLanguageFilter = (language) => {
    // fetch countries based on language directly
    setCurrentPage(1);
    fetchCountriesByLanguage(language);
  };

  const handleResetFilters = () => {
    setCurrentPage(1);
    fetchCountriesByRegion(""); 
  };

  // Pagination calculations
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

  // Clean keyboard pagination navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft" && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      }
      if (e.key === "ArrowRight" && currentPage < totalPages) {
        setCurrentPage((prev) => prev + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, totalPages]);

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
          Reset Filters
        </button>
      </div>

      {loading && <LoadingSpinner />}
      {error && <div className="text-red-500 p-4">Error: {error}</div>}

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
