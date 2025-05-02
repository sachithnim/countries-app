import { useState, useEffect } from "react";
import {
  fetchAllCountries,
  fetchCountryByName,
} from "../services/country";

const useCountries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [regions, setRegions] = useState([]);
  const [languages, setLanguages] = useState([]);

// Search by name
  const searchCountries = async (term) => {
    setLoading(true);
    try {
      const data = await fetchCountryByName(term);
      setCountries(Array.isArray(data) ? data : []);
    } catch (err) {
      setCountries([]);
      setError(err.message);
    }
    setLoading(false);
  };

  const filterByRegionAndLanguage = async (region, language) => {
    setLoading(true);
    try {
      const data = await fetchAllCountries();
      const validData = Array.isArray(data) ? data : [];

      const filtered = validData.filter((c) => {
        const regionMatch = region ? c.region === region : true;
        const languageMatch = language
          ? c.languages &&
            Object.values(c.languages).some(
              (lang) => lang.toLowerCase() === language.toLowerCase()
            )
          : true;
        return regionMatch && languageMatch;
      });

      setCountries(filtered);
    } catch (err) {
      setCountries([]);
      setError(err.message);
    }
    setLoading(false);
  };

  // Fetch all countries on initial load
  useEffect(() => {
    const fetchInitial = async () => {
      setLoading(true);
      try {
        const data = await fetchAllCountries();
        const validData = Array.isArray(data) ? data : [];
        setCountries(validData);

        const regionList = Array.from(
          new Set(validData.map((c) => c.region).filter(Boolean))
        );
        setRegions(regionList);

        const allLangs = validData.flatMap((c) =>
          c.languages ? Object.values(c.languages) : []
        );
        const uniqueLangs = Array.from(new Set(allLangs)).sort();
        setLanguages(uniqueLangs);
      } catch (err) {
        setCountries([]);
        setRegions([]);
        setLanguages([]);
        setError(err.message);
      }
      setLoading(false);
    };

    fetchInitial();
  }, []);

  return {
    countries,
    loading,
    error,
    searchCountries,
    filterByRegionAndLanguage,
    regions,
    languages,
  };
};

export default useCountries;
