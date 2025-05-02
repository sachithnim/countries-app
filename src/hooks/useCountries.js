import { useState, useEffect } from "react";
import { fetchAllCountries } from "../services/country";

const useCountries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
  };
};

export default useCountries;
