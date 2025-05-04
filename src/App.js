"use client"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import CountryDetailPage from "./pages/CountryDetailPage"
import { useEffect } from "react"

function App() {
  // Add scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:code" element={<CountryDetailPage />} />
      </Routes>
    </Router>
  )
}

export default App
