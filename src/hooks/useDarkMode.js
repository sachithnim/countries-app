"use client"

import { useState, useEffect } from "react"

const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Check if user has a preference saved in localStorage
    const savedMode = localStorage.getItem("darkMode")
    if (savedMode !== null) {
      return JSON.parse(savedMode)
    }

    // Check if user prefers dark mode via system settings
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return true
    }

    // Default to light mode
    return false
  })

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode
      localStorage.setItem("darkMode", JSON.stringify(newMode))
      return newMode
    })
  }

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

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const handleChange = (e) => {
      // Only update if user hasn't set a preference in localStorage
      if (localStorage.getItem("darkMode") === null) {
        setDarkMode(e.matches)
      }
    }

    // Add event listener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange)
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange)
    }

    // Cleanup
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange)
      } else {
        // Fallback for older browsers
        mediaQuery.removeListener(handleChange)
      }
    }
  }, [])

  return { darkMode, toggleDarkMode }
}

export default useDarkMode
