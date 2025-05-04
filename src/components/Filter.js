const Filter = ({
  onRegionFilter,
  onLanguageFilter,
  onCurrencyFilter,
  onCapitalFilter,
  onSubregionFilter,
  regions,
  languages,
  currencies,
  capitals,
  subregions,
  selectedRegion,
  selectedLanguage,
  selectedCurrency,
  selectedCapital,
  selectedSubregion,
  darkMode,
}) => {

  const selectStyles = `border rounded-lg p-2.5 shadow-sm w-full ${
    darkMode
      ? "bg-gray-700 text-white border-gray-600 focus:border-blue-400"
      : "bg-white text-gray-800 border-gray-300 focus:border-blue-500"
  } focus:outline-none focus:ring-2 ${darkMode ? "focus:ring-blue-400/20" : "focus:ring-blue-500/20"}`

  return (
    <div className={`w-full transition-all duration-300 ${darkMode ? "text-white" : "text-gray-800"}`}>
      <div className="mb-4">
      </div>

      {/* Filters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
        {/* Region Dropdown */}
        <div>
          <label className="block mb-2 text-sm font-medium">Region</label>
          <select value={selectedRegion} onChange={(e) => onRegionFilter(e.target.value)} className={selectStyles}>
            <option value="" disabled>
              Select Region
            </option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        {/* Language Dropdown */}
        <div>
          <label className="block mb-2 text-sm font-medium">Language</label>
          <select
            value={selectedLanguage}
            onChange={(e) => onLanguageFilter(e.target.value)}
            className={selectStyles}
          >
            <option value="" disabled>
              Select Language
            </option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>

        {/* Currency Dropdown */}
        <div>
          <label className="block mb-2 text-sm font-medium">Currency</label>
          <select
            value={selectedCurrency}
            onChange={(e) => onCurrencyFilter(e.target.value)}
            className={selectStyles}
          >
            <option value="" disabled>
              Select Currency
            </option>
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* Capital Dropdown */}
        <div>
          <label className="block mb-2 text-sm font-medium">Capital</label>
          <select value={selectedCapital} onChange={(e) => onCapitalFilter(e.target.value)} className={selectStyles}>
            <option value="" disabled>
              Select Capital
            </option>
            {capitals.map((capital) => (
              <option key={capital} value={capital}>
                {capital}
              </option>
            ))}
          </select>
        </div>

        {/* Subregion Dropdown */}
        <div>
          <label className="block mb-2 text-sm font-medium">Subregion</label>
          <select
            value={selectedSubregion}
            onChange={(e) => onSubregionFilter(e.target.value)}
            className={selectStyles}
          >
            <option value="" disabled>
              Select Subregion
            </option>
            {subregions.map((subregion) => (
              <option key={subregion} value={subregion}>
                {subregion}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default Filter
