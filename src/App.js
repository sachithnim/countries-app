"use client"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import CountryDetailPage from "./pages/CountryDetailPage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import { AuthProvider } from "./context/AuthContext"
import ProtectedRoute from "./components/Auth/ProtectedRoute"
import { useEffect } from "react"

function App() {
  // Add scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/country/:code"
            element={
              <ProtectedRoute>
                <CountryDetailPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App