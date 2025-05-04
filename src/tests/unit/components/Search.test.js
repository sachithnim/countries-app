import { render, screen, fireEvent } from "@testing-library/react"
import Search from "../../../components/Search"

describe("Search Component", () => {
  test("renders input with placeholder", () => {
    render(<Search searchTerm="" onSearch={() => {}} darkMode={false} />)
    expect(screen.getByPlaceholderText("Search countries by name...")).toBeInTheDocument()
  })

  test("calls onSearch with typed value", () => {
    const onSearchMock = jest.fn()
    render(<Search searchTerm="" onSearch={onSearchMock} darkMode={false} />)

    const input = screen.getByPlaceholderText(/Search countries/i)
    fireEvent.change(input, { target: { value: "India" } })

    expect(onSearchMock).toHaveBeenCalledWith("India")
  })

  test("applies dark mode styles correctly", () => {
    render(<Search searchTerm="" onSearch={() => {}} darkMode={true} />)
    const input = screen.getByPlaceholderText(/Search countries/i)
    expect(input).toHaveClass("bg-gray-700")
  })
})
