import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import logo from '../assets/logo.svg';
import { AuthContext } from '../context/AuthContext'; // Import the context

const SignUp = () => {
  const navigate = useNavigate();
  const { signUp, message } = useContext(AuthContext); // Use context here
  const [errorMessage, setErrorMessage] = useState('');
  const [formField, setFormField] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Function to handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormField((prevField) => ({
      ...prevField,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = formField;

    // Validation
    if (!username || !email || !password || !confirmPassword) {
      setErrorMessage('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    const success = await signUp(username, email, password);

    if (success) {
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }

    // Reset form fields
    setFormField({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <div>
      <section className="bg-gradient-to-b from-gray-950 via-slate-900 to-gray-950 text-white">
        <Navbar />
        <div className="flex flex-col items-center justify-center px-4 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mt-8 mb-4 text-3xl font-bold lg:-mt-10"
          >
            <img src={logo} alt="Logo" className="w-15 h-15" />
            <span
              className="text-3xl font-semibold "
              style={{ fontFamily: "'Nova Flat', sans-serif" }}
            >
              &nbsp;Snipbucket
            </span>
          </a>
          <div className="w-full bg-slate-800 rounded-lg shadow-lg border border-slate-700 sm:max-w-sm">
            <div className="p-4 space-y-3 sm:p-6">
              <h1 className="text-lg font-bold tracking-tight text-white md:text-xl">
                Create an account
              </h1>
              {/* Error and Success Messages */}
              {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
              {message && <p className="text-sm text-green-500">{message}</p>} {/* Display success message from context */}
              <form className="space-y-3" onSubmit={handleSubmit}>
                {/* Full Name Field */}
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-1 text-sm font-medium text-gray-300"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={formField.username}
                    onChange={handleChange}
                    placeholder="Johndoe123"
                    className="bg-slate-700 border border-slate-600 text-white text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 placeholder-gray-400"
                    required
                  />
                </div>
                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-1 text-sm font-medium text-gray-300"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formField.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    className="bg-slate-700 border border-slate-600 text-white text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 placeholder-gray-400"
                    required
                  />
                </div>
                {/* Password Field */}
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-1 text-sm font-medium text-gray-300"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={formField.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="bg-slate-700 border border-slate-600 text-white text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 placeholder-gray-400"
                    required
                  />
                </div>
                {/* Confirm Password Field */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-1 text-sm font-medium text-gray-300"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={formField.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="bg-slate-700 border border-slate-600 text-white text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 placeholder-gray-400"
                    required
                  />
                </div>
                {/* Terms and Conditions */}
                <div className="flex items-start">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-slate-700 focus:ring-2 focus:ring-blue-600"
                    required
                  />
                  <label
                    htmlFor="terms"
                    className="ml-2 text-sm font-light text-gray-300"
                  >
                    I accept the{' '}
                    <a
                      className="font-medium text-blue-500 hover:underline"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-md text-sm px-4 py-2"
                >
                  Create an account
                </button>
                <p className="text-xs font-light text-gray-400">
                  Already have an account?{' '}
                  <a
                    href="/login"
                    className="font-medium text-blue-500 hover:underline"
                  >
                    Login here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
