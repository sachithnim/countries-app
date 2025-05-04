import { render } from "@testing-library/react";
import LoadingSpinner from "../../../components/LoadingSpinner";

describe("LoadingSpinner", () => {
  it("renders spinner with light mode styles", () => {
    const { container } = render(<LoadingSpinner darkMode={false} />);
    const spinner = container.querySelector(".spinner-border");

    expect(spinner).toBeInTheDocument();
    expect(spinner.className).toMatch(/border-gray-200/);
    expect(spinner.className).toMatch(/border-t-blue-600/);
  });

  it("renders spinner with dark mode styles", () => {
    const { container } = render(<LoadingSpinner darkMode={true} />);
    const spinner = container.querySelector(".spinner-border");

    expect(spinner).toBeInTheDocument();
    expect(spinner.className).toMatch(/border-gray-600/);
    expect(spinner.className).toMatch(/border-t-blue-400/);
  });
});
