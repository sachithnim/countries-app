import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CountryDetailPage from "../../pages/CountryDetailPage";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import * as countryService from "../../services/country";

// Mock the country service
jest.mock("../../services/country");

const mockCountry = {
  name: { common: "France", official: "French Republic" },
  population: 67000000,
  capital: ["Paris"],
  region: "Europe",
  subregion: "Western Europe",
  flags: { svg: "https://example.com/france.svg" },
  currencies: { EUR: { name: "Euro", symbol: "€" } },
  languages: { fra: "French" },
  timezones: ["UTC+01:00"],
  cca3: "FRA",
};

const mockAllCountries = [
  { name: { common: "Germany" }, cca3: "DEU" },
  mockCountry,
  { name: { common: "Italy" }, cca3: "ITA" },
];

describe("CountryDetailPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it("renders loading state, then country details", async () => {
    countryService.fetchAllCountries.mockResolvedValue(mockAllCountries);
    countryService.fetchByCode.mockResolvedValue(mockCountry);

    render(
      <MemoryRouter initialEntries={["/country/FRA"]}>
        <Routes>
          <Route path="/country/:code" element={<CountryDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Back to Countries/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Loading/i)).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByText(/French Republic/)).toBeInTheDocument()
    );

    expect(screen.getByText("France")).toBeInTheDocument();
    expect(screen.getByText(/Population/i)).toBeInTheDocument();
  });

  it("shows error message if fetch fails", async () => {
    countryService.fetchAllCountries.mockRejectedValue(new Error("Fail"));
    countryService.fetchByCode.mockRejectedValue(new Error("Fail"));

    render(
      <MemoryRouter initialEntries={["/country/FRA"]}>
        <Routes>
          <Route path="/country/:code" element={<CountryDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText(/Error: Country not found/i)).toBeInTheDocument()
    );
  });

  it("navigates to next country on button click", async () => {
    countryService.fetchAllCountries.mockResolvedValue(mockAllCountries);
    countryService.fetchByCode.mockResolvedValue(mockCountry);

    const mockNavigate = jest.fn();
    jest.spyOn(require("react-router-dom"), "useNavigate").mockReturnValue(mockNavigate);

    render(
      <MemoryRouter initialEntries={["/country/FRA"]}>
        <Routes>
          <Route path="/country/:code" element={<CountryDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText(/Next Country/));
    fireEvent.click(screen.getByText(/Next Country/));

    expect(mockNavigate).toHaveBeenCalledWith("/country/ITA");
  });

  it("navigates back to homepage on 'Back to Countries'", async () => {
    countryService.fetchAllCountries.mockResolvedValue(mockAllCountries);
    countryService.fetchByCode.mockResolvedValue(mockCountry);

    const mockNavigate = jest.fn();
    jest.spyOn(require("react-router-dom"), "useNavigate").mockReturnValue(mockNavigate);

    render(
      <MemoryRouter initialEntries={["/country/FRA"]}>
        <Routes>
          <Route path="/country/:code" element={<CountryDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText(/Back to Countries/));
    fireEvent.click(screen.getByText(/Back to Countries/));

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
