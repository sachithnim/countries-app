// src/pages/Home.js
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

  const handleRegionFilter = (region) => {
    setSelectedRegion(region);
    filterByRegionAndLanguage(region, selectedLanguage);
  };

  const handleLanguageFilter = (language) => {
    setSelectedLanguage(language);
    filterByRegionAndLanguage(selectedRegion, language);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold p-4">Country Finder</h1>
      <Search onSearch={searchCountries} />

      <Filter
        onRegionFilter={handleRegionFilter}
        onLanguageFilter={handleLanguageFilter}
        regions={regions}
        languages={languages}
      />

      {loading && <LoadingSpinner />}
      {error && <div className="text-red-500 p-4">Error: {error}</div>}

      {Array.isArray(countries) && countries.length > 0 ? (
        <div className="grid grid-cols-4 gap-4 p-4">
          {countries.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      ) : (
        !loading && <div className="p-4 text-gray-500">No countries to display.</div>
      )}
    </div>
  );
};

export default Home;
