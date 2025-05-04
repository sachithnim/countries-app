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
}) => {
  return (
    <div className="flex gap-4 w-full flex-wrap">
      {/* Region Dropdown */}
      <select
        value={selectedRegion}
        onChange={(e) => onRegionFilter(e.target.value)}
        className="border p-2 rounded-lg bg-white text-black shadow-md w-48"
      >
        <option value="" disabled>
          Select Region
        </option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>

      {/* Language Dropdown */}
      <select
        value={selectedLanguage}
        onChange={(e) => onLanguageFilter(e.target.value)}
        className="border p-2 rounded-lg bg-white text-black shadow-md w-48"
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

      {/* Currency Dropdown */}
      <select
        value={selectedCurrency}
        onChange={(e) => onCurrencyFilter(e.target.value)}
        className="border p-2 rounded-lg bg-white text-black shadow-md w-48"
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

      {/* Capital Dropdown */}
      <select
        value={selectedCapital}
        onChange={(e) => onCapitalFilter(e.target.value)}
        className="border p-2 rounded-lg bg-white text-black shadow-md w-48"
      >
        <option value="" disabled>
          Select Capital
        </option>
        {capitals.map((capital) => (
          <option key={capital} value={capital}>
            {capital}
          </option>
        ))}
      </select>

      {/* Subregion Dropdown */}
      <select
        value={selectedSubregion}
        onChange={(e) => onSubregionFilter(e.target.value)}
        className="border p-2 rounded-lg bg-white text-black shadow-md w-48"
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
  );
};

export default Filter;
