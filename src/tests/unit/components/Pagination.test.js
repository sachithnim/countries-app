import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "../../../components/Pagination";

describe("Pagination component", () => {
  const defaultProps = {
    currentPage: 3,
    totalPages: 7,
    onPrevPage: jest.fn(),
    onNextPage: jest.fn(),
    onPageChange: jest.fn(),
    darkMode: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders page numbers correctly", () => {
    render(<Pagination {...defaultProps} />);
    
    // Should include page 1 and totalPages
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("7")).toBeInTheDocument();

    // Current page should be active
    const activeButton = screen.getByText("3");
    expect(activeButton).toHaveClass("bg-blue-500");
  });

  it("renders ellipses when pages are trimmed", () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getAllByText("...").length).toBeGreaterThanOrEqual(1);
  });

  it("calls onPageChange when a page number is clicked", () => {
    render(<Pagination {...defaultProps} />);
    const pageButton = screen.getByText("4");
    fireEvent.click(pageButton);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(4);
  });

  it("disables 'Previous' button on first page", () => {
    render(<Pagination {...defaultProps} currentPage={1} />);
    const prevButton = screen.getByLabelText("Previous page");
    expect(prevButton).toBeDisabled();
  });

  it("disables 'Next' button on last page", () => {
    render(<Pagination {...defaultProps} currentPage={7} />);
    const nextButton = screen.getByLabelText("Next page");
    expect(nextButton).toBeDisabled();
  });

  it("calls onPrevPage when 'Previous' is clicked", () => {
    render(<Pagination {...defaultProps} />);
    const prevButton = screen.getByLabelText("Previous page");
    fireEvent.click(prevButton);
    expect(defaultProps.onPrevPage).toHaveBeenCalled();
  });

  it("calls onNextPage when 'Next' is clicked", () => {
    render(<Pagination {...defaultProps} />);
    const nextButton = screen.getByLabelText("Next page");
    fireEvent.click(nextButton);
    expect(defaultProps.onNextPage).toHaveBeenCalled();
  });
});
