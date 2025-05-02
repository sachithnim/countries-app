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
