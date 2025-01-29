import { useState, useContext, useEffect, useRef } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import logo from '../assets/logo.svg';
import { AuthContext } from '../context/AuthContext';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Explore', href: '/explore' },
  { name: 'About', href: '/about' },
];

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const dropdownRef = useRef(null); // Ref for the dropdown menu

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <nav className="bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center space-x-2">
            <a href="/"><img src={logo} alt="Logo" className="h-8 w-auto" /></a>
            <span
              className="text-2xl font-semibold"
              style={{ fontFamily: "'Nova Flat', sans-serif" }}
            >
              <a href="/">Snipbucket</a>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                {item.name}
              </a>
            ))}

            {!user ? (
              <>
                <a
                  href="/signup"
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  Sign Up
                </a>
                <a
                  href="/login"
                  className="inline-block bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-600"
                >
                  Log In
                </a>
              </>
            ) : (
              <>
                {/* Profile Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={toggleDropdown}
                    className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-medium shadow-md hover:from-blue-400 hover:to-indigo-500 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:outline-none transition-all duration-300"
                  >
                    {user.username}
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-800 shadow-lg rounded-md py-2 z-10">
                      <a
                        href="/create-post"
                        className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
                      >
                        My Snippets
                      </a>
                      <a
                        href="/create-post"
                        className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
                      >
                        Add a Snippet
                      </a>
                      <a
                        href="/settings"
                        className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
                      >
                        Settings
                      </a>
                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-2 text-sm text-white hover:bg-red-600"
                      >
                        Log Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800 p-4 space-y-4">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="block text-white hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium"
            >
              {item.name}
            </a>
          ))}

          {!user ? (
            <>
              <a
                href="/signup"
                className="block text-center bg-blue-600 text-white px-4 py-2 rounded-md text-base font-medium hover:bg-blue-700"
              >
                Sign Up
              </a>
              <a
                href="/login"
                className="block text-center bg-gray-700 text-white px-4 py-2 rounded-md text-base font-medium hover:bg-gray-600"
              >
                Log In
              </a>
            </>
          ) : (
            <>
              <a
                href="/my-snippets"
                className="block text-center bg-gray-700 text-white px-4 py-2 rounded-md text-base font-medium hover:bg-gray-600"
              >
                My Snippets
              </a>
              <a
                href="/create-post"
                className="block text-center bg-gray-700 text-white px-4 py-2 rounded-md text-base font-medium hover:bg-gray-600"
              >
                Add a Snippet
              </a>
              <button
                onClick={logout}
                className="block text-center bg-red-600 text-white px-4 py-2 rounded-md text-base font-medium hover:bg-red-700"
              >
                Log Out
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
