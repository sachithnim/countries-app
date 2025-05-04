import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CountryCard from "../../../components/CountryCard";

const mockCountry = {
  name: { common: "France" },
  flags: { svg: "https://flagcdn.com/fr.svg" },
  capital: ["Paris"],
  population: 67399000,
  region: "Europe",
  languages: { fra: "French" },
  cca3: "FRA",
};

const renderCard = (darkMode = false, country = mockCountry) => {
  render(
    <MemoryRouter>
      <CountryCard country={country} darkMode={darkMode} />
    </MemoryRouter>
  );
};

describe("CountryCard component", () => {
  it("renders country name, capital, region, and population", () => {
    renderCard();
    expect(screen.getByText("France")).toBeInTheDocument();
    expect(screen.getByText(/Capital:/i)).toHaveTextContent("Capital: Paris");
    expect(screen.getByText(/Region:/i)).toHaveTextContent("Region: Europe");
    expect(screen.getByText(/Population:/i)).toHaveTextContent("Population: 67,399,000");
    expect(screen.getByText(/Languages:/i)).toHaveTextContent("Languages: French");
  });

  it("renders flag image with correct src and alt", () => {
    renderCard();
    const img = screen.getByAltText("France");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://flagcdn.com/fr.svg");
  });

  it("links to the correct country detail page", () => {
    renderCard();
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/country/FRA");
  });

  it("applies dark mode styles", () => {
    const { container } = render(
      <MemoryRouter>
        <CountryCard country={mockCountry} darkMode={true} />
      </MemoryRouter>
    );
    const card = container.querySelector("a");
    expect(card).toHaveClass("bg-gray-700");
    expect(card).toHaveClass("text-white");
  });

  it("handles missing or incomplete country data gracefully", () => {
    const incompleteCountry = {};
    renderCard(false, incompleteCountry);

    expect(screen.getByText("Unnamed")).toBeInTheDocument();
    expect(screen.getByText(/Capital:/)).toHaveTextContent("Capital: N/A");
    expect(screen.getByText(/Region:/)).toHaveTextContent("Region: N/A");
    expect(screen.getByText(/Population:/)).toHaveTextContent("Population: N/A");
    expect(screen.getByText(/Languages:/)).toHaveTextContent("Languages: N/A");
  });
});
