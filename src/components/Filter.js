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
}) => {
  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Region Dropdown */}
      <select
        onChange={(e) => onRegionFilter(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">Select Region</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>

      {/* Language Dropdown */}
      <select
        onChange={(e) => onLanguageFilter(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">Select Language</option>
        {languages.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>

      {/* Currency Dropdown */}
      <select
        onChange={(e) => onCurrencyFilter(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">Select Currency</option>
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency.toUpperCase()}
          </option>
        ))}
      </select>

      {/* Capital Dropdown */}
      <select
        onChange={(e) => onCapitalFilter(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">Select Capital</option>
        {capitals.map((capital) => (
          <option key={capital} value={capital}>
            {capital}
          </option>
        ))}
      </select>

      {/* Subregion Dropdown */}
      <select
        onChange={(e) => onSubregionFilter(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">Select Subregion</option>
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
