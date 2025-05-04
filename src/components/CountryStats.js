import { Users, MapPin, Globe, DollarSign, Languages } from "lucide-react"

const CountryStats = ({ country, darkMode }) => {
  if (!country) return null

  const population = country.population?.toLocaleString() || "N/A"
  const capital = country.capital?.[0] || "N/A"
  const region = country.region || "N/A"
  const subregion = country.subregion || "N/A"
  const languages = country.languages ? Object.values(country.languages).join(", ") : "N/A"
  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((c) => `${c.name} (${c.symbol || ""})`)
        .join(", ")
    : "N/A"

  const timezones = country.timezones ? country.timezones.join(", ") : "N/A"

  const statItemClass = `flex items-start gap-3 p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-50"}`

  const iconClass = darkMode ? "text-blue-400" : "text-blue-600"

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <div className={statItemClass}>
        <Users className={`h-5 w-5 mt-0.5 ${iconClass}`} />
        <div>
          <h3 className="font-semibold mb-1">Population</h3>
          <p>{population}</p>
        </div>
      </div>

      <div className={statItemClass}>
        <MapPin className={`h-5 w-5 mt-0.5 ${iconClass}`} />
        <div>
          <h3 className="font-semibold mb-1">Capital</h3>
          <p>{capital}</p>
        </div>
      </div>

      <div className={statItemClass}>
        <Globe className={`h-5 w-5 mt-0.5 ${iconClass}`} />
        <div>
          <h3 className="font-semibold mb-1">Region</h3>
          <p>
            {region} {subregion ? `(${subregion})` : ""}
          </p>
        </div>
      </div>

      <div className={statItemClass}>
        <DollarSign className={`h-5 w-5 mt-0.5 ${iconClass}`} />
        <div>
          <h3 className="font-semibold mb-1">Currencies</h3>
          <p>{currencies}</p>
        </div>
      </div>

      <div className={statItemClass}>
        <Languages className={`h-5 w-5 mt-0.5 ${iconClass}`} />
        <div>
          <h3 className="font-semibold mb-1">Languages</h3>
          <p>{languages}</p>
        </div>
      </div>

      <div className={statItemClass}>
        <div className={`h-5 w-5 mt-0.5 flex items-center justify-center ${iconClass}`}>
          <span className="text-xs font-bold">TZ</span>
        </div>
        <div>
          <h3 className="font-semibold mb-1">Timezones</h3>
          <p className="text-sm">{timezones}</p>
        </div>
      </div>
    </div>
  )
}

export default CountryStats
