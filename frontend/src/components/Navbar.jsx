import { useState, useContext, useEffect } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import logo from '../assets/logo.svg'
import { AuthContext } from '../context/AuthContext'  // Assuming you have an AuthContext

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Explore', href: '/explore' },
  { name: 'About', href: '/about' },
]

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, logout } = useContext(AuthContext) // Assuming you use AuthContext for managing authentication status

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev)


  return (
    <nav className="bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center space-x-2">
            <img src={logo} alt="Logo" className="h-8 w-auto" />
            <span className="text-2xl font-semibold " style={{ fontFamily: "'Nova Flat', sans-serif" }}>Snipbucket</span>
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

            {/* Conditionally render buttons */}
            {!user ? (
              <>
                {/* Sign Up Button */}
                <a
                  href="/signup"
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  Sign Up
                </a>

                {/* Log In Button */}
                <a
                  href="/login"
                  className="inline-block bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-600"
                >
                  Log In
                </a>
              </>
            ) : (
              <>
                {/* Profile Button */}
                <a
                  href="/profile"
                  className="inline-block bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-600"
                >
                  {user.username}
                </a>

                {/* Log Out Button */}
                <button
                  onClick={logout}
                  className="inline-block bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
                >
                  Log Out
                </button>
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

          {/* Conditionally render mobile buttons */}
          {!user ? (
            <>
              {/* Mobile Sign Up Button */}
              <a
                href="/signup"
                className="block text-center bg-blue-600 text-white px-4 py-2 rounded-md text-base font-medium hover:bg-blue-700"
              >
                Sign Up
              </a>

              {/* Mobile Log In Button */}
              <a
                href="/login"
                className="block text-center bg-gray-700 text-white px-4 py-2 rounded-md text-base font-medium hover:bg-gray-600"
              >
                Log In
              </a>
            </>
          ) : (
            <>
              {/* Mobile Profile Button */}
              <a
                href="/profile"
                className="block text-center bg-gray-700 text-white px-4 py-2 rounded-md text-base font-medium hover:bg-gray-600"
              >
                Profile
              </a>

              {/* Mobile Log Out Button */}
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
  )
}

export default Navbar
