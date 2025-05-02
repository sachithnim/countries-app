import { Link } from "react-router-dom";

const CountryCard = ({ country }) => {
  const name = country?.name?.common || "Unnamed";
  const flag = country?.flags?.svg || "";
  const capital = Array.isArray(country?.capital) ? country.capital[0] : "N/A";
  const population = country?.population?.toLocaleString() || "N/A";
  const region = country?.region || "N/A";
  const languages = country?.languages ? Object.values(country.languages).join(", ") : "N/A";

  return (
    <Link to={`/country/${country?.cca3}`} className="p-4 border rounded block hover:bg-gray-100">
      {flag && <img src={flag} alt={name} className="w-full h-32 object-cover" />}
      <h3 className="text-xl font-bold mt-2">{name}</h3>
      <p><strong>Capital:</strong> {capital}</p>
      <p><strong>Population:</strong> {population}</p>
      <p><strong>Region:</strong> {region}</p>
      <p><strong>Languages:</strong> {languages}</p>
    </Link>
  );
};

export default CountryCard;
