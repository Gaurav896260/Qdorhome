import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Navbar from '../components/Navbar/Navbar.jsx';
import Footer from '../components/Footer/Footer.jsx';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toggleSignUp = () => setIsSignUp(!isSignUp);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className='bg-white dark:bg-gray-900 dark:text-white'>
      <Navbar />
      <div className="flex items-center justify-center h-screen">
        <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </h2>
          <form className="space-y-6">
            {isSignUp && (
              <div>
                <label className="block text-gray-700 dark:text-gray-200 mb-2" htmlFor="username">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2"
                  placeholder="Username"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-gray-700 dark:text-gray-200 mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 "
                placeholder="Email"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-200 mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 "
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center"
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-gray-500 dark:text-gray-400" />
                  ) : (
                    <FaEye className="text-gray-500 dark:text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-black text-white rounded-md transition-transform transform hover:scale-105"
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <button
              type="button"
              onClick={toggleSignUp}
              className="text-blue font-semibold ml-1"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Auth;
