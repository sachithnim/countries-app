"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

const Pagination = ({ currentPage, totalPages, onPrevPage, onNextPage, onPageChange, darkMode }) => {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = []
    const maxPagesToShow = 5

    if (totalPages <= maxPagesToShow) {
      // Show all pages if total is less than max to show
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always include first page
      pages.push(1)

      // Calculate start and end of page range
      let start = Math.max(2, currentPage - 1)
      let end = Math.min(totalPages - 1, currentPage + 1)

      // Adjust if at the beginning
      if (currentPage <= 3) {
        end = Math.min(totalPages - 1, 4)
      }

      // Adjust if at the end
      if (currentPage >= totalPages - 2) {
        start = Math.max(2, totalPages - 3)
      }

      // Add ellipsis if needed at the beginning
      if (start > 2) {
        pages.push("...")
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      // Add ellipsis if needed at the end
      if (end < totalPages - 1) {
        pages.push("...")
      }

      // Always include last page
      if (totalPages > 1) {
        pages.push(totalPages)
      }
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  const buttonBaseStyles = `flex items-center justify-center px-3 py-2 text-sm font-medium rounded-md transition-colors`
  const activeStyles = darkMode ? "bg-blue-600 text-white" : "bg-blue-500 text-white"
  const inactiveStyles = darkMode
    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
    : "bg-white text-gray-700 hover:bg-gray-100"
  const disabledStyles = darkMode
    ? "bg-gray-800 text-gray-600 cursor-not-allowed"
    : "bg-gray-100 text-gray-400 cursor-not-allowed"

  return (
    <div className="flex justify-center items-center space-x-2 py-6">
      <button
        onClick={onPrevPage}
        disabled={currentPage === 1}
        className={`${buttonBaseStyles} ${currentPage === 1 ? disabledStyles : inactiveStyles}`}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {pageNumbers.map((page, index) =>
        page === "..." ? (
          <span key={`ellipsis-${index}`} className={`px-3 py-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            ...
          </span>
        ) : (
          <button
            key={`page-${page}`}
            onClick={() => onPageChange(page)}
            className={`${buttonBaseStyles} ${currentPage === page ? activeStyles : inactiveStyles}`}
          >
            {page}
          </button>
        ),
      )}

      <button
        onClick={onNextPage}
        disabled={currentPage === totalPages}
        className={`${buttonBaseStyles} ${currentPage === totalPages ? disabledStyles : inactiveStyles}`}
        aria-label="Next page"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  )
}

export default Pagination
