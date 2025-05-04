import { render, screen, fireEvent } from "@testing-library/react";
import Filter from "../../../components/Filter";

describe("Filter component", () => {
  const mockHandlers = {
    onRegionFilter: jest.fn(),
    onLanguageFilter: jest.fn(),
    onCurrencyFilter: jest.fn(),
    onCapitalFilter: jest.fn(),
    onSubregionFilter: jest.fn(),
  };

  const mockProps = {
    ...mockHandlers,
    regions: ["Africa", "Europe"],
    languages: ["English", "French"],
    currencies: ["usd", "eur"],
    capitals: ["Paris", "Nairobi"],
    subregions: ["Eastern Africa", "Western Europe"],
    selectedRegion: "",
    selectedLanguage: "",
    selectedCurrency: "",
    selectedCapital: "",
    selectedSubregion: "",
    darkMode: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all filter dropdowns with options", () => {
    render(<Filter {...mockProps} />);

    expect(screen.getByLabelText(/Region/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Language/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Currency/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Capital/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Subregion/i)).toBeInTheDocument();

    expect(screen.getByText("Africa")).toBeInTheDocument();
    expect(screen.getByText("English")).toBeInTheDocument();
    expect(screen.getByText("USD")).toBeInTheDocument(); // uppercased
    expect(screen.getByText("Paris")).toBeInTheDocument();
    expect(screen.getByText("Western Europe")).toBeInTheDocument();
  });

  it("calls onRegionFilter when region is selected", () => {
    render(<Filter {...mockProps} />);
    fireEvent.change(screen.getByLabelText(/Region/i), {
      target: { value: "Europe" },
    });
    expect(mockHandlers.onRegionFilter).toHaveBeenCalledWith("Europe");
  });

  it("calls onLanguageFilter when language is selected", () => {
    render(<Filter {...mockProps} />);
    fireEvent.change(screen.getByLabelText(/Language/i), {
      target: { value: "French" },
    });
    expect(mockHandlers.onLanguageFilter).toHaveBeenCalledWith("French");
  });

  it("calls onCurrencyFilter when currency is selected", () => {
    render(<Filter {...mockProps} />);
    fireEvent.change(screen.getByLabelText(/Currency/i), {
      target: { value: "eur" },
    });
    expect(mockHandlers.onCurrencyFilter).toHaveBeenCalledWith("eur");
  });

  it("calls onCapitalFilter when capital is selected", () => {
    render(<Filter {...mockProps} />);
    fireEvent.change(screen.getByLabelText(/Capital/i), {
      target: { value: "Paris" },
    });
    expect(mockHandlers.onCapitalFilter).toHaveBeenCalledWith("Paris");
  });

  it("calls onSubregionFilter when subregion is selected", () => {
    render(<Filter {...mockProps} />);
    fireEvent.change(screen.getByLabelText(/Subregion/i), {
      target: { value: "Eastern Africa" },
    });
    expect(mockHandlers.onSubregionFilter).toHaveBeenCalledWith("Eastern Africa");
  });

  it("applies dark mode styles when enabled", () => {
    const { container } = render(<Filter {...mockProps} darkMode={true} />);
    const selects = container.querySelectorAll("select");
    selects.forEach((select) => {
      expect(select.className).toMatch(/bg-gray-700/);
      expect(select.className).toMatch(/text-white/);
    });
  });
});
