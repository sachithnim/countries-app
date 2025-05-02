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

  // Fetch current country and all countries for nav
  useEffect(() => {
    const loadCountryData = async () => {
      setLoading(true);
      try {
        const [all, current] = await Promise.all([
          fetchAllCountries(),
          fetchByCode(code),
        ]);

        // Sort all alphabetically by name
        const sortedCountries = Array.isArray(all)
          ? all.sort((a, b) => a.name.common.localeCompare(b.name.common))
          : [];

        setAllCountries(sortedCountries);
        setCountry(current);
      } catch {
        setError("Country not found");
      }
      setLoading(false);
    };

    loadCountryData();
  }, [code]);

  if (loading) return <div className="p-4">Loading country details...</div>;
  if (error || !country)
    return (
      <div className="p-4 text-red-500">{error || "Country not found."}</div>
    );

  // Get country info
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

  // Find current index in full country list
  const currentIndex = allCountries.findIndex((c) => c.cca3 === code);
  const prevCode =
    currentIndex > 0 ? allCountries[currentIndex - 1]?.cca3 : null;
  const nextCode =
    currentIndex >= 0 && currentIndex < allCountries.length - 1
      ? allCountries[currentIndex + 1]?.cca3
      : null;

  return (
    <div className="p-6">
      {/* Navigation buttons */}
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

      {/* Country info */}
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
