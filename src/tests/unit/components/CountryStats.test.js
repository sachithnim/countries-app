import { render, screen } from "@testing-library/react";
import CountryStats from "../../../components/CountryStats";

describe("CountryStats component", () => {
  const mockCountry = {
    population: 67000000,
    capital: ["Paris"],
    region: "Europe",
    subregion: "Western Europe",
    languages: { fra: "French" },
    currencies: {
      EUR: { name: "Euro", symbol: "€" }
    },
    timezones: ["UTC+01:00"],
  };

  it("renders all stats when country data is provided", () => {
    render(<CountryStats country={mockCountry} darkMode={false} />);

    expect(screen.getByText(/Population/i)).toBeInTheDocument();
    expect(screen.getByText("67,000,000")).toBeInTheDocument();

    expect(screen.getByText(/Capital/i)).toBeInTheDocument();
    expect(screen.getByText("Paris")).toBeInTheDocument();

    expect(screen.getByText(/Region/i)).toBeInTheDocument();
    expect(screen.getByText(/Europe \(Western Europe\)/i)).toBeInTheDocument();

    expect(screen.getByText(/Currencies/i)).toBeInTheDocument();
    expect(screen.getByText("Euro (€)")).toBeInTheDocument();

    expect(screen.getByText(/Languages/i)).toBeInTheDocument();
    expect(screen.getByText("French")).toBeInTheDocument();

    expect(screen.getByText(/Timezones/i)).toBeInTheDocument();
    expect(screen.getByText("UTC+01:00")).toBeInTheDocument();
  });

  it("handles missing optional fields gracefully", () => {
    const partialCountry = {
      population: null,
      capital: null,
      region: null,
      subregion: null,
      languages: null,
      currencies: null,
      timezones: null,
    };

    render(<CountryStats country={partialCountry} darkMode={true} />);

    expect(screen.getByText("N/A")).toBeInTheDocument();
  });

  it("returns null when country is not provided", () => {
    const { container } = render(<CountryStats country={null} darkMode={false} />);
    expect(container.firstChild).toBeNull();
  });

  it("applies dark mode styles", () => {
    const { container } = render(<CountryStats country={mockCountry} darkMode={true} />);
    const boxes = container.querySelectorAll("div.bg-gray-700");
    expect(boxes.length).toBeGreaterThan(0);
  });

  it("applies light mode styles", () => {
    const { container } = render(<CountryStats country={mockCountry} darkMode={false} />);
    const boxes = container.querySelectorAll("div.bg-gray-50");
    expect(boxes.length).toBeGreaterThan(0);
  });
});
