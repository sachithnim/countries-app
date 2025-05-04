import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAllCountries, fetchByCode } from "../services/country";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CountryStats from "../components/CountryStats";
import LoadingSpinner from "../components/LoadingSpinner";
import { ArrowLeft, ArrowRight, ChevronLeft } from "lucide-react";

const CountryDetailPage = () => {
  const { code } = useParams();
  const navigate = useNavigate();

  // Dark mode state
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", JSON.stringify(newMode));
      return newMode;
    });
  };

  const [country, setCountry] = useState(null);
  const [allCountries, setAllCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  // const [borderCountries, setBorderCountries] = useState([])

  useEffect(() => {
    const loadCountryData = async () => {
      setLoading(true);
      try {
        const [all, current] = await Promise.all([
          fetchAllCountries(),
          fetchByCode(code),
        ]);

        const sorted = Array.isArray(all)
          ? all.sort((a, b) => a.name.common.localeCompare(b.name.common))
          : [];

        const index = sorted.findIndex((c) => c.cca3 === code);
        setAllCountries(sorted);
        setCurrentIndex(index);
        setCountry(current);
      } catch (err) {
        setError("Country not found");
      }
      setLoading(false);
    };

    loadCountryData();
  }, [code]);

  // Apply dark mode to body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("bg-gray-900");
      document.body.classList.remove("bg-gray-50");
    } else {
      document.body.classList.add("bg-gray-50");
      document.body.classList.remove("bg-gray-900");
    }
  }, [darkMode]);

  // Keyboard Navigations
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft" && currentIndex > 0) {
        navigate(`/country/${allCountries[currentIndex - 1].cca3}`);
      } else if (
        e.key === "ArrowRight" &&
        currentIndex < allCountries.length - 1
      ) {
        navigate(`/country/${allCountries[currentIndex + 1].cca3}`);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, allCountries, navigate]);

  const prevCode =
    currentIndex > 0 ? allCountries[currentIndex - 1]?.cca3 : null;
  const nextCode =
    currentIndex >= 0 && currentIndex < allCountries.length - 1
      ? allCountries[currentIndex + 1]?.cca3
      : null;

  const buttonStyles = `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
    darkMode
      ? "bg-gray-700 hover:bg-gray-600 text-white"
      : "bg-white hover:bg-gray-100 text-gray-800 border border-gray-200"
  } shadow-sm`;

  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkMode ? "text-white" : "text-gray-800"
      }`}
    >
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main className="flex-grow container mx-auto px-4 py-6">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className={`mb-6 ${buttonStyles}`}
        >
          <ChevronLeft size={18} />
          Back to Countries
        </button>

        {loading ? (
          <LoadingSpinner darkMode={darkMode} />
        ) : error ? (
          <div
            className={`p-6 rounded-lg text-center ${
              darkMode ? "bg-red-900 text-red-200" : "bg-red-100 text-red-700"
            }`}
          >
            <p className="font-medium">Error: {error}</p>
          </div>
        ) : country ? (
          <div
            className={`rounded-xl overflow-hidden shadow-lg ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            {/* Country Header */}
            <div className="relative">
              {country.flags?.svg && (
                <div className="w-full h-64 md:h-80 overflow-hidden">
                  <img
                    src={country.flags.svg || "/placeholder.svg"}
                    alt={`${country.name?.common || "Country"} flag`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div
                className={`absolute inset-0 bg-gradient-to-t ${
                  darkMode ? "from-gray-900" : "from-black/70"
                } to-transparent flex items-end`}
              >
                <div className="p-6 md:p-8">
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {country.name?.common || "Unnamed Country"}
                  </h1>
                  {country.name?.official &&
                    country.name.official !== country.name.common && (
                      <p className="text-gray-200 text-lg">
                        {country.name.official}
                      </p>
                    )}
                </div>
              </div>
            </div>

            {/* Country Content */}
            <div className="p-6 md:p-8">
              {/* Country Stats */}
              <CountryStats country={country} darkMode={darkMode} />
            </div>
          </div>
        ) : null}

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between">
          {prevCode ? (
            <button
              onClick={() => navigate(`/country/${prevCode}`)}
              className={buttonStyles}
            >
              <ArrowLeft size={18} />
              Previous Country
            </button>
          ) : (
            <div></div> // Empty div to maintain flex spacing
          )}

          {nextCode && (
            <button
              onClick={() => navigate(`/country/${nextCode}`)}
              className={buttonStyles}
            >
              Next Country
              <ArrowRight size={18} />
            </button>
          )}
        </div>
      </main>

      <Footer darkMode={darkMode} />
    </div>
  );
};

export default CountryDetailPage;
