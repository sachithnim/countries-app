import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAllCountries, fetchByCode } from "../services/country";

const CountryPage = () => {
  const { code } = useParams();
  const navigate = useNavigate();

  const [country, setCountry] = useState(null);
  const [allCountries, setAllCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    const loadCountryData = async () => {
      setLoading(true);
      try {
        const [all, current] = await Promise.all([
          fetchAllCountries(),
          fetchByCode(code),
        ]);
        const sorted = Array.isArray(all)
          ? all.sort((a, b) => a.name.common.localeCompare(b.name.common))
          : [];
        const index = sorted.findIndex((c) => c.cca3 === code);
        setAllCountries(sorted);
        setCurrentIndex(index);
        setCountry(current);
      } catch {
        setError("Country not found");
      }
      setLoading(false);
    };

    loadCountryData();
  }, [code]);

  // Keyboard Navigations
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft" && currentIndex > 0) {
        navigate(`/country/${allCountries[currentIndex - 1].cca3}`);
      } else if (
        e.key === "ArrowRight" &&
        currentIndex < allCountries.length - 1
      ) {
        navigate(`/country/${allCountries[currentIndex + 1].cca3}`);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, allCountries, navigate]);

  if (loading) return <div className="p-4">Loading country details...</div>;
  if (error || !country)
    return (
      <div className="p-4 text-red-500">{error || "Country not found."}</div>
    );

  const name = country.name?.common || "Unnamed";
  const flag = country.flags?.svg || "";
  const capital = country.capital?.[0] || "N/A";
  const population = country.population?.toLocaleString() || "N/A";
  const region = country.region || "N/A";
  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "N/A";
  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((c) => c.name)
        .join(", ")
    : "N/A";

  const prevCode =
    currentIndex > 0 ? allCountries[currentIndex - 1]?.cca3 : null;
  const nextCode =
    currentIndex >= 0 && currentIndex < allCountries.length - 1
      ? allCountries[currentIndex + 1]?.cca3
      : null;

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Home
        </button>

        <div className="space-x-2">
          {prevCode && (
            <button
              onClick={() => navigate(`/country/${prevCode}`)}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Previous
            </button>
          )}
          {nextCode && (
            <button
              onClick={() => navigate(`/country/${nextCode}`)}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Next
            </button>
          )}
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">{name}</h2>
      {flag && (
        <img src={flag} alt={`${name} flag`} className="w-64 h-auto mb-4" />
      )}
      <p>
        <strong>Capital:</strong> {capital}
      </p>
      <p>
        <strong>Population:</strong> {population}
      </p>
      <p>
        <strong>Region:</strong> {region}
      </p>
      <p>
        <strong>Languages:</strong> {languages}
      </p>
      <p>
        <strong>Currencies:</strong> {currencies}
      </p>
    </div>
  );
};

export default CountryPage;
