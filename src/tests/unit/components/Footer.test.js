import { render, screen } from "@testing-library/react";
import Footer from "../../../components/Footer";

describe("Footer component", () => {
  it("renders the footer text", () => {
    render(<Footer darkMode={false} />);
    expect(screen.getByText(/rest countries/i)).toBeInTheDocument();
  });

  it("applies light mode styles", () => {
    const { container } = render(<Footer darkMode={false} />);
    const footer = container.querySelector("footer");
    expect(footer).toHaveClass("bg-gray-100");
    expect(footer).toHaveClass("text-gray-700");
  });

  it("applies dark mode styles", () => {
    const { container } = render(<Footer darkMode={true} />);
    const footer = container.querySelector("footer");
    expect(footer).toHaveClass("bg-gray-800");
    expect(footer).toHaveClass("text-gray-300");
  });
});
