import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../../../components/Header";
import { AuthContext } from "../../../context/AuthContext";
import { BrowserRouter } from "react-router-dom";

// Helper to render Header with providers
const renderHeader = ({ user = null, logout = jest.fn(), darkMode = false, toggleDarkMode = jest.fn() }) => {
  render(
    <AuthContext.Provider value={{ user, logout }}>
      <BrowserRouter>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

describe("Header component", () => {
  it("renders app title and dark mode toggle", () => {
    renderHeader({ darkMode: false });

    expect(screen.getByText("CountryCompass")).toBeInTheDocument();
    expect(screen.getByLabelText("Switch to dark mode")).toBeInTheDocument();
  });

  it("shows login/signup links when user is not logged in", () => {
    renderHeader({ user: null });

    expect(screen.getByRole("link", { name: /sign up/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "" })).toBeInTheDocument(); // Login icon
  });

  it("shows welcome message and logout button when user is logged in", () => {
    const mockUser = { username: "John" };
    renderHeader({ user: mockUser });

    expect(screen.getByText(/Welcome, John/)).toBeInTheDocument();
    expect(screen.getByLabelText("Logout")).toBeInTheDocument();
  });

  it("calls toggleDarkMode when dark mode button is clicked", () => {
    const toggleDarkMode = jest.fn();
    renderHeader({ toggleDarkMode });

    const toggleButton = screen.getByRole("button", {
      name: /switch to dark mode/i,
    });

    fireEvent.click(toggleButton);
    expect(toggleDarkMode).toHaveBeenCalled();
  });

  it("calls logout and navigates when logout button is clicked", () => {
    const logout = jest.fn();
    renderHeader({ user: { username: "Jane" }, logout });

    const logoutButton = screen.getByLabelText("Logout");
    fireEvent.click(logoutButton);

    expect(logout).toHaveBeenCalled();
  });
});
