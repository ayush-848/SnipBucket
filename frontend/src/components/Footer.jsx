import React from 'react';
import { FaFacebookF, FaGithub, FaTwitter, FaInstagram, FaDiscord } from 'react-icons/fa';
import logo from '../assets/logo.svg';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <div className="flex-shrink-0 flex items-center space-x-2">
                        <img src={logo} alt="Logo" className="h-8 w-auto" /><span
                          className="text-2xl font-semibold"
                          style={{ fontFamily: "'Nova Flat', sans-serif" }}
                        >Snipbucket
                        </span>
                      </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-300 uppercase">
                Company
              </h2>
              <ul className="text-gray-400">
                <li className="mb-4">
                  <a href="/about" className="hover:underline">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:underline">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-300 uppercase">
                Resources
              </h2>
              <ul className="text-gray-400">
                <li className="mb-4">
                  <a href="/blog" className="hover:underline">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/help-center" className="hover:underline">
                    Help Center
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-300 uppercase">
                Legal
              </h2>
              <ul className="text-gray-400">
                <li className="mb-4">
                  <a href="/privacy-policy" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="hover:underline">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-700 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-400 sm:text-center">
            © 2023{' '}
            <a href="/" className="hover:underline">
              Snipbucket™
            </a>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            <a
              href="https://facebook.com/Snipbucket"
              className="text-gray-400 hover:text-gray-100 ms-5"
            >
              <FaFacebookF className="w-5 h-5" />
              <span className="sr-only">Facebook page</span>
            </a>
            <a
              href="https://github.com/Snipbucket"
              className="text-gray-400 hover:text-gray-100 ms-5"
            >
              <FaGithub className="w-5 h-5" />
              <span className="sr-only">GitHub account</span>
            </a>
            <a
              href="https://twitter.com/Snipbucket"
              className="text-gray-400 hover:text-gray-100 ms-5"
            >
              <FaTwitter className="w-5 h-5" />
              <span className="sr-only">Twitter page</span>
            </a>
            <a
              href="https://instagram.com/Snipbucket"
              className="text-gray-400 hover:text-gray-100 ms-5"
            >
              <FaInstagram className="w-5 h-5" />
              <span className="sr-only">Instagram page</span>
            </a>
            <a
              href="https://discord.gg/Snipbucket"
              className="text-gray-400 hover:text-gray-100 ms-5"
            >
              <FaDiscord className="w-5 h-5" />
              <span className="sr-only">Discord community</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
