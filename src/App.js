import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Home from './pages/Home';
import CountryDetailPage from './pages/CountryDetailPage';

function App() {
  return (
    <Router>
      <Routes>  
        <Route path="/" element={<Home />} />  
        <Route path="/country/:code" element={<CountryDetailPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
