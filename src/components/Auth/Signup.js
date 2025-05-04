import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Signup = ({ darkMode }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (signup(username, email, password)) {
      navigate('/');
    } else {
      setError('Email already exists');
    }
  };

  return (
    <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
        Sign Up
      </h2>
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
            required
          />
        </div>
        <div>
          <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
            required
          />
        </div>
        <div>
          <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full py-2 px-4 rounded ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;