const Footer = ({ darkMode }) => {
  return (
    <footer
      className={`py-6 ${
        darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">REST COUNTRIES</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
