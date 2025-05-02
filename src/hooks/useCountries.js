import { useState, useEffect } from "react";
import {
  fetchAllCountries,
  fetchCountryByName
} from "../services/country";

const useCountries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

    // Fetch all countries on initial load
  useEffect(() => {
    const fetchInitial = async () => {
      setLoading(true);
      try {
        const data = await fetchAllCountries();
        const validData = Array.isArray(data) ? data : [];
        setCountries(validData);
      } catch (err) {
        setCountries([]);
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
  };
};

export default useCountries;
