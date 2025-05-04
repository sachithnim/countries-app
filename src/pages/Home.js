"use client"

import { useState, useEffect } from "react"
import useCountries from "../hooks/useCountries"
import CountryCard from "../components/CountryCard"
import LoadingSpinner from "../components/LoadingSpinner"
import Search from "../components/Search"
import Filter from "../components/Filter"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Pagination from "../components/Pagination"
import { MapPin, RefreshCw, Globe } from "lucide-react"

const Home = () => {
  // Dark mode state
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const savedMode = localStorage.getItem("darkMode")
      return savedMode ? JSON.parse(savedMode) : false
    }
    return false
  })

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode
      if (typeof window !== "undefined") {
        localStorage.setItem("darkMode", JSON.stringify(newMode))
      }
      return newMode
    })
  }

  const {
    countries,
    loading,
    error,
    searchCountries,
    fetchCountriesByRegion,
    fetchCountriesByLanguage,
    fetchCountriesByCurrency,
    fetchCountriesByCapital,
    fetchCountriesBySubregion,
    regions,
    languages,
    currencies,
    capitals,
    subregions,
    fetchAllCountriesData,
  } = useCountries()

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  // State for selected filters
  const [selectedRegion, setSelectedRegion] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("")
  const [selectedCurrency, setSelectedCurrency] = useState("")
  const [selectedCapital, setSelectedCapital] = useState("")
  const [selectedSubregion, setSelectedSubregion] = useState("")

  // State for search input
  const [searchTerm, setSearchTerm] = useState("")

  // Handle filter changes
  const handleRegionFilter = (region) => {
    setSelectedRegion(region)
    setCurrentPage(1)
    fetchCountriesByRegion(region)
  }

  const handleLanguageFilter = (language) => {
    setSelectedLanguage(language)
    setCurrentPage(1)
    fetchCountriesByLanguage(language)
  }

  const handleCurrencyFilter = (currency) => {
    setSelectedCurrency(currency)
    setCurrentPage(1)
    fetchCountriesByCurrency(currency)
  }

  const handleCapitalFilter = (capital) => {
    setSelectedCapital(capital)
    setCurrentPage(1)
    fetchCountriesByCapital(capital)
  }

  const handleSubregionFilter = (subregion) => {
    setSelectedSubregion(subregion)
    setCurrentPage(1)
    fetchCountriesBySubregion(subregion)
  }

  // Handle search
  const handleSearch = (term) => {
    setSearchTerm(term)
    setCurrentPage(1)
    searchCountries(term)
  }

  // Handle reset
  const handleResetFilters = () => {
    // Reset all filter states
    setSelectedRegion("")
    setSelectedLanguage("")
    setSelectedCurrency("")
    setSelectedCapital("")
    setSelectedSubregion("")
    setSearchTerm("")

    // Reset page number to 1
    setCurrentPage(1)

    // Fetch all countries after reset
    fetchAllCountriesData()
  }

  // Pagination calculations
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedCountries = Array.isArray(countries) ? countries.slice(startIndex, endIndex) : []

  const totalPages = Math.ceil(countries.length / itemsPerPage)

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1)
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  // Clean keyboard pagination navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft" && currentPage > 1) {
        setCurrentPage((prev) => prev - 1)
      }
      if (e.key === "ArrowRight" && currentPage < totalPages) {
        setCurrentPage((prev) => prev + 1)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentPage, totalPages])

  // Apply dark mode to body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("bg-gray-900")
      document.body.classList.remove("bg-gray-50")
    } else {
      document.body.classList.add("bg-gray-50")
      document.body.classList.remove("bg-gray-900")
    }
  }, [darkMode])

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? "text-white" : "text-gray-800"}`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div
          className={`rounded-2xl overflow-hidden mb-10 ${
            darkMode
              ? "bg-gradient-to-r from-indigo-900 via-blue-900 to-indigo-900 shadow-xl"
              : "bg-gradient-to-r from-indigo-50 via-blue-100 to-indigo-50 shadow-lg"
          }`}
        >
          <div className="px-8 py-10">
            <div className="max-w-4xl">
              <h1
                className={`text-4xl md:text-5xl font-extrabold tracking-tight mb-4 ${
                  darkMode ? "text-blue-300" : "text-blue-700"
                }`}
              >
                Discover and Explore Countries
              </h1>
              <p className={`text-lg leading-relaxed mb-6 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Dive into the details of each country's culture, geography, and key information.
                <span className={`block mt-2 text-lg font-medium ${darkMode ? "text-blue-300" : "text-blue-600"}`}>
                  Start exploring now!
                </span>
              </p>
              <button
                onClick={handleResetFilters}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all ${
                  darkMode
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-900/20"
                    : "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20"
                }`}
              >
                <Globe size={18} />
                Explore All Countries
              </button>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div
          className={`rounded-xl p-6 mb-8 ${
            darkMode ? "bg-gray-800 border border-gray-700 shadow-md" : "bg-white border border-gray-100 shadow-md"
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className={`text-xl font-semibold ${darkMode ? "text-blue-300" : "text-blue-700"}`}>
              Find Your Destination
            </h2>
            <button
              onClick={handleResetFilters}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-600 text-white border border-gray-600"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-800"
              }`}
            >
              <RefreshCw size={16} />
              Reset Filters
            </button>
          </div>

          {/* Search Component */}
          <Search onSearch={handleSearch} searchTerm={searchTerm} darkMode={darkMode} />

          {/* Filter Component */}
          <div className="mt-6">
            <Filter
              onRegionFilter={handleRegionFilter}
              onLanguageFilter={handleLanguageFilter}
              onCurrencyFilter={handleCurrencyFilter}
              onCapitalFilter={handleCapitalFilter}
              onSubregionFilter={handleSubregionFilter}
              regions={regions}
              languages={languages}
              currencies={currencies}
              capitals={capitals}
              subregions={subregions}
              selectedRegion={selectedRegion}
              selectedLanguage={selectedLanguage}
              selectedCurrency={selectedCurrency}
              selectedCapital={selectedCapital}
              selectedSubregion={selectedSubregion}
              darkMode={darkMode}
            />
          </div>
        </div>

        {/* Results Section */}
        <div
          className={`rounded-xl p-6 ${
            darkMode ? "bg-gray-800 border border-gray-700 shadow-md" : "bg-white border border-gray-100 shadow-md"
          }`}
        >
          {/* Loading State */}
          {loading && <LoadingSpinner darkMode={darkMode} />}

          {/* Error State */}
          {error && (
            <div
              className={`p-6 rounded-lg text-center ${darkMode ? "bg-red-900/60 text-red-200" : "bg-red-100 text-red-700"}`}
            >
              <p className="font-medium">Error: {error}</p>
            </div>
          )}

          {/* Results Count */}
          {!loading && Array.isArray(countries) && (
            <div
              className={`mb-6 px-5 py-3 rounded-lg inline-flex items-center gap-2 ${
                darkMode ? "bg-gray-700 text-gray-200" : "bg-gray-100 text-gray-700"
              }`}
            >
              <MapPin size={18} className={darkMode ? "text-blue-400" : "text-blue-600"} />
              <span className="font-medium">
                {countries.length} {countries.length === 1 ? "country" : "countries"} found
              </span>
            </div>
          )}

          {/* Countries Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedCountries.map((country) => (
              <div key={country.cca3} className="transition-transform duration-300 hover:scale-105">
                <CountryCard country={country} darkMode={darkMode} />
              </div>
            ))}
          </div>

          {/* Empty State */}
          {!loading && paginatedCountries.length === 0 && (
            <div className={`text-center py-16 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              <div className="inline-block p-6 rounded-full mb-4 bg-opacity-20">
                <MapPin size={48} className={darkMode ? "text-blue-400" : "text-blue-600"} />
              </div>
              <p className="text-xl font-medium mb-2">No countries found</p>
              <p>Try adjusting your search or filters</p>
              <button
                onClick={handleResetFilters}
                className={`mt-6 flex items-center gap-2 px-6 py-3 rounded-lg font-medium mx-auto transition-colors ${
                  darkMode ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                <RefreshCw size={16} />
                Reset All Filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {countries.length > itemsPerPage && (
            <div className="mt-10">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPrevPage={handlePrevPage}
                onNextPage={handleNextPage}
                onPageChange={handlePageChange}
                darkMode={darkMode}
              />
            </div>
          )}
        </div>
      </main>

      <Footer darkMode={darkMode} />

      {/* Global Styles */}
      <style jsx global>{`
        body {
          transition: background-color 0.3s ease;
        }
        
        /* Scrollbar styling */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: ${darkMode ? "#1f2937" : "#f3f4f6"};
        }
        
        ::-webkit-scrollbar-thumb {
          background: ${darkMode ? "#4b5563" : "#cbd5e1"};
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: ${darkMode ? "#6b7280" : "#94a3b8"};
        }
      `}</style>
    </div>
  )
}

export default Home
