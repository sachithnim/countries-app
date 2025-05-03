// Fetch all countries
export const fetchAllCountries = async () => {
  try {
    const res = await fetch("https://restcountries.com/v3.1/all");
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
};

// Fetch countries by name
export const fetchCountryByName = async (name) => {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
};

// Fetch countries by region
export const fetchByRegion = async (region) => {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/region/${region}`);
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
};

// Fetch countries by language
export const fetchByLanguage = async (language) => {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/lang/${language}`);
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
};

// Fetch by country code
export const fetchByCode = async (code) => {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
    const data = await res.json();
    return Array.isArray(data) && data.length > 0 ? data[0] : null;
  } catch {
    return null;
  }
};


// Fetch countries by currency
export const fetchByCurrency = async (currency) => {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/currency/${currency}`);
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
};

// Fetch countries by capital
export const fetchByCapital = async (capital) => {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/capital/${capital}`);
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
};

// Fetch countries by subregion
export const fetchBySubregion = async (subregion) => {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/subregion/${subregion}`);
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
};
