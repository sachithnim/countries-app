"use client"

import { SearchIcon } from "lucide-react"

const Search = ({ onSearch, searchTerm, darkMode }) => {
  const handleSearch = (e) => {
    onSearch(e.target.value)
  }

  return (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <SearchIcon className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        className={`block w-full p-4 pl-10 text-sm rounded-lg border ${
          darkMode
            ? "bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
        }`}
        placeholder="Search countries by name..."
      />
    </div>
  )
}

export default Search
