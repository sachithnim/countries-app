"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Moon, Sun, Globe } from "lucide-react"

const Header = ({ darkMode, toggleDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      } ${isScrolled ? "shadow-md py-3" : "py-4"}`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <Globe className={`h-6 w-6 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
          <span>CountryCompass</span>
        </Link>

        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-full ${
            darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"
          } transition-colors`}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? <Sun className="h-5 w-5 text-yellow-300" /> : <Moon className="h-5 w-5 text-gray-600" />}
        </button>
      </div>
    </header>
  )
}

export default Header
