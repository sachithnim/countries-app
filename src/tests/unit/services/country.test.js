import {
    fetchAllCountries,
    fetchCountryByName,
    fetchByRegion,
    fetchByLanguage,
    fetchByCode,
    fetchByCurrency,
    fetchByCapital,
    fetchBySubregion,
  } from '../../../services/country';
  
  // Mock the global fetch
  global.fetch = jest.fn();
  
  const mockCountries = [{ name: { common: "Testland" }, cca2: "TS" }];
  
  describe("Country Service API", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it("fetchAllCountries should return array of countries", async () => {
      fetch.mockResolvedValueOnce({
        json: async () => mockCountries,
      });
  
      const result = await fetchAllCountries();
      expect(fetch).toHaveBeenCalledWith("https://restcountries.com/v3.1/all");
      expect(result).toEqual(mockCountries);
    });
  
    it("fetchCountryByName should return country data", async () => {
      fetch.mockResolvedValueOnce({
        json: async () => mockCountries,
      });
  
      const result = await fetchCountryByName("testland");
      expect(fetch).toHaveBeenCalledWith("https://restcountries.com/v3.1/name/testland");
      expect(result).toEqual(mockCountries);
    });
  
    it("fetchByRegion should return country data", async () => {
      fetch.mockResolvedValueOnce({
        json: async () => mockCountries,
      });
  
      const result = await fetchByRegion("asia");
      expect(fetch).toHaveBeenCalledWith("https://restcountries.com/v3.1/region/asia");
      expect(result).toEqual(mockCountries);
    });
  
    it("fetchByLanguage should return country data", async () => {
      fetch.mockResolvedValueOnce({
        json: async () => mockCountries,
      });
  
      const result = await fetchByLanguage("english");
      expect(fetch).toHaveBeenCalledWith("https://restcountries.com/v3.1/lang/english");
      expect(result).toEqual(mockCountries);
    });
  
    it("fetchByCode should return single country", async () => {
      fetch.mockResolvedValueOnce({
        json: async () => mockCountries,
      });
  
      const result = await fetchByCode("TS");
      expect(fetch).toHaveBeenCalledWith("https://restcountries.com/v3.1/alpha/TS");
      expect(result).toEqual(mockCountries[0]);
    });
  
    it("fetchByCurrency should return country data", async () => {
      fetch.mockResolvedValueOnce({
        json: async () => mockCountries,
      });
  
      const result = await fetchByCurrency("USD");
      expect(fetch).toHaveBeenCalledWith("https://restcountries.com/v3.1/currency/USD");
      expect(result).toEqual(mockCountries);
    });
  
    it("fetchByCapital should return country data", async () => {
      fetch.mockResolvedValueOnce({
        json: async () => mockCountries,
      });
  
      const result = await fetchByCapital("Test City");
      expect(fetch).toHaveBeenCalledWith("https://restcountries.com/v3.1/capital/Test City");
      expect(result).toEqual(mockCountries);
    });
  
    it("fetchBySubregion should return country data", async () => {
      fetch.mockResolvedValueOnce({
        json: async () => mockCountries,
      });
  
      const result = await fetchBySubregion("Southern Asia");
      expect(fetch).toHaveBeenCalledWith("https://restcountries.com/v3.1/subregion/Southern Asia");
      expect(result).toEqual(mockCountries);
    });
  
    it("should return empty array on fetch error", async () => {
      fetch.mockRejectedValueOnce(new Error("API Error"));
  
      const result = await fetchAllCountries();
      expect(result).toEqual([]);
    });
  
    it("fetchByCode should return null on error", async () => {
      fetch.mockRejectedValueOnce(new Error("API Error"));
  
      const result = await fetchByCode("XX");
      expect(result).toBeNull();
    });
  });
  