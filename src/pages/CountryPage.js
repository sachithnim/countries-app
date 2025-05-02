// Page to show detailed information about a single country
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchByCode } from "../services/country";

const CountryPage = () => {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch country by code when component loads or `code` changes
  useEffect(() => {
    const loadCountry = async () => {
      setLoading(true);
      try {
        const data = await fetchByCode(code);
        setCountry(data);
      } catch {
        setError("Country not found");
      }
      setLoading(false);
    };

    loadCountry();
  }, [code]);

  if (loading) return <div className="p-4">Loading country details...</div>;
  if (error || !country)
    return (
      <div className="p-4 text-red-500">{error || "Country not found."}</div>
    );

  // Extract display fields safely
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

  // Render the detail view
  return (
    <div className="p-6">
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
