const LoadingSpinner = ({ darkMode }) => {
  return (
    <div className="flex justify-center items-center py-10">
      <div
        className={`spinner-border animate-spin w-12 h-12 border-4 rounded-full ${
          darkMode ? "border-gray-600 border-t-blue-400" : "border-gray-200 border-t-blue-600"
        }`}
      ></div>
    </div>
  )
}

export default LoadingSpinner
