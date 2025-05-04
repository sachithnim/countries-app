import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "../../pages/Home";
import * as countryHook from "../../hooks/useCountries";
import { MemoryRouter } from "react-router-dom";

// Mock useCountries hook
jest.mock("../../hooks/useCountries");

const mockCountries = [
  {
    name: { common: "France" },
    cca3: "FRA",
    flags: { svg: "https://example.com/fr.svg" },
    capital: ["Paris"],
    region: "Europe",
    population: 67000000,
  },
  {
    name: { common: "Germany" },
    cca3: "DEU",
    flags: { svg: "https://example.com/de.svg" },
    capital: ["Berlin"],
    region: "Europe",
    population: 83000000,
  },
];

describe("Home Page", () => {
  const setupMockHook = (overrides = {}) => {
    countryHook.default.mockReturnValue({
      countries: mockCountries,
      loading: false,
      error: null,
      searchCountries: jest.fn(),
      fetchCountriesByRegion: jest.fn(),
      fetchCountriesByLanguage: jest.fn(),
      fetchCountriesByCurrency: jest.fn(),
      fetchCountriesByCapital: jest.fn(),
      fetchCountriesBySubregion: jest.fn(),
      fetchAllCountriesData: jest.fn(),
      regions: ["Europe", "Africa"],
      languages: ["French", "German"],
      currencies: ["eur"],
      capitals: ["Paris", "Berlin"],
      subregions: ["Western Europe"],
      ...overrides,
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it("renders hero section and country cards", () => {
    setupMockHook();
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText(/Discover and Explore Countries/i)).toBeInTheDocument();
    expect(screen.getByText("France")).toBeInTheDocument();
    expect(screen.getByText("Germany")).toBeInTheDocument();
  });

  it("shows loading spinner when loading", () => {
    setupMockHook({ loading: true });
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
  });

  it("shows error message when error is present", () => {
    setupMockHook({ error: "Failed to fetch" });
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText(/Error: Failed to fetch/i)).toBeInTheDocument();
  });

  it("resets filters on 'Reset Filters' button click", () => {
    const fetchAllCountriesData = jest.fn();
    setupMockHook({ fetchAllCountriesData });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const resetButtons = screen.getAllByRole("button", { name: /reset filters/i });
    fireEvent.click(resetButtons[0]); // top right reset button
    expect(fetchAllCountriesData).toHaveBeenCalled();
  });

  it("handles pagination logic", async () => {
    const manyCountries = Array.from({ length: 20 }).map((_, i) => ({
      name: { common: `Country${i + 1}` },
      cca3: `C${i + 1}`,
      flags: { svg: "https://example.com/flag.svg" },
      capital: ["Capital"],
      region: "TestRegion",
      population: 1000,
    }));

    setupMockHook({ countries: manyCountries });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Should show 12 items (itemsPerPage = 12)
    expect(await screen.findByText("Country1")).toBeInTheDocument();
    expect(screen.getByText("Country12")).toBeInTheDocument();
    expect(screen.queryByText("Country13")).not.toBeInTheDocument();

    // Go to next page
    const nextButton = screen.getByLabelText("Next page");
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText("Country13")).toBeInTheDocument();
    });
  });
});
