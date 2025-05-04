import { Link } from "react-router-dom";

const CountryCard = ({ country, darkMode }) => {
  const name = country?.name?.common || "Unnamed";
  const flag = country?.flags?.svg || "";
  const capital = Array.isArray(country?.capital) ? country.capital[0] : "N/A";
  const population = country?.population?.toLocaleString() || "N/A";
  const region = country?.region || "N/A";
  const languages = country?.languages
    ? Object.values(country.languages).join(", ")
    : "N/A";

  return (
    <Link
      to={`/country/${country?.cca3}`}
      className={`block rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl ${
        darkMode
          ? "bg-gray-700 text-white border-gray-600"
          : "bg-white text-gray-800 border-gray-200"
      } border shadow-md`}
    >
      {flag && (
        <div className="h-40 overflow-hidden">
          <img
            src={flag || "/placeholder.svg"}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <h3
          className={`text-xl font-bold mb-3 ${
            darkMode ? "text-blue-300" : "text-blue-600"
          }`}
        >
          {name}
        </h3>
        <div className="space-y-1">
          <p>
            <span className="font-semibold">Capital:</span> {capital}
          </p>
          <p>
            <span className="font-semibold">Population:</span> {population}
          </p>
          <p>
            <span className="font-semibold">Region:</span> {region}
          </p>
          <p className="truncate">
            <span className="font-semibold">Languages:</span> {languages}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CountryCard;
