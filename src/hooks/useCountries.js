import { useState, useEffect } from "react";
import {
  fetchAllCountries,
  fetchCountryByName,
  fetchByRegion,
  fetchByLanguage,
  fetchByCurrency,
  fetchByCapital,
  fetchBySubregion,
} from "../services/country";

const useCountries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [regions, setRegions] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [capitals, setCapitals] = useState([]);
  const [subregions, setSubregions] = useState([]);

  // Fetch all countries
  const fetchAllCountriesData = async () => {
    setLoading(true);
    try {
      const data = await fetchAllCountries();
      setCountries(data);
    } catch (err) {
      setError(err.message);
      setCountries([]);
    }
    setLoading(false);
  };

  // Search by country name
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

  // Fetch countries by region
  const fetchCountriesByRegion = async (region) => {
    setLoading(true);
    try {
      const data = await fetchByRegion(region);
      setCountries(data);
    } catch (err) {
      setCountries([]);
      setError(err.message);
    }
    setLoading(false);
  };

  // Fetch countries by language
  const fetchCountriesByLanguage = async (language) => {
    setLoading(true);
    try {
      const data = await fetchByLanguage(language);
      setCountries(data);
    } catch (err) {
      setCountries([]);
      setError(err.message);
    }
    setLoading(false);
  };

  // Fetch countries by currency
  const fetchCountriesByCurrency = async (currency) => {
    setLoading(true);
    try {
      const data = await fetchByCurrency(currency);
      setCountries(data);
    } catch (err) {
      setCountries([]);
      setError(err.message);
    }
    setLoading(false);
  };

  // Fetch countries by capital
  const fetchCountriesByCapital = async (capital) => {
    setLoading(true);
    try {
      const data = await fetchByCapital(capital);
      setCountries(data);
    } catch (err) {
      setCountries([]);
      setError(err.message);
    }
    setLoading(false);
  };

  // Fetch countries by subregion
  const fetchCountriesBySubregion = async (subregion) => {
    setLoading(true);
    try {
      const data = await fetchBySubregion(subregion);
      setCountries(data);
    } catch (err) {
      setCountries([]);
      setError(err.message);
    }
    setLoading(false);
  };

  // Fetch all countries and unique regions/languages/currencies/capitals/subregions
  useEffect(() => {
    const fetchInitial = async () => {
      setLoading(true);
      try {
        const data = await fetchAllCountries();
        const validData = Array.isArray(data) ? data : [];
        setCountries(validData);

        // Extract regions
        const regionList = Array.from(
          new Set(validData.map((c) => c.region).filter(Boolean))
        );
        setRegions(regionList);

        // Extract languages
        const allLangs = validData.flatMap((c) =>
          c.languages ? Object.values(c.languages) : []
        );
        const uniqueLangs = Array.from(new Set(allLangs)).sort();
        setLanguages(uniqueLangs);

        // Extract currencies
        const allCurrencies = validData.flatMap((c) =>
          c.currencies ? Object.keys(c.currencies) : []
        );
        const uniqueCurrencies = Array.from(new Set(allCurrencies)).sort();
        setCurrencies(uniqueCurrencies);

        // Extract capitals
        const allCapitals = validData
          .map((c) => c.capital && c.capital[0])
          .filter(Boolean);
        const uniqueCapitals = Array.from(new Set(allCapitals)).sort();
        setCapitals(uniqueCapitals);

        // Extract subregions
        const allSubregions = validData
          .map((c) => c.subregion)
          .filter(Boolean);
        const uniqueSubregions = Array.from(new Set(allSubregions)).sort();
        setSubregions(uniqueSubregions);
      } catch (err) {
        setCountries([]);
        setRegions([]);
        setLanguages([]);
        setCurrencies([]);
        setCapitals([]);
        setSubregions([]);
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
    fetchCountriesByRegion,
    fetchCountriesByLanguage,
    fetchCountriesByCurrency,
    fetchCountriesByCapital,
    fetchCountriesBySubregion,
    fetchAllCountriesData,
    regions,
    languages,
    currencies,
    capitals,
    subregions,
  };
};

export default useCountries;
