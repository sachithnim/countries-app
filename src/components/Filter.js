const Filter = ({ onRegionFilter, onLanguageFilter, regions, languages }) => {
  return (
    <div className="p-4 flex space-x-4">
      <select
        onChange={(e) => onRegionFilter(e.target.value)}
        className="p-2 border border-gray-300 rounded"
      >
        <option value="">All Regions</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>

      <select
        onChange={(e) => onLanguageFilter(e.target.value)}
        className="p-2 border border-gray-300 rounded"
      >
        <option value="">All Languages</option>
        {languages.map((lang) => (
          <option key={lang} value={lang.toLowerCase()}>
            {lang}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
