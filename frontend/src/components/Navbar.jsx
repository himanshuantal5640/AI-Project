import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../ThemeContext";
import { Moon, Sun, User, Home, LayoutDashboard, Menu, X } from "lucide-react";
import NotificationDropdown from "./NotificationDropdown"; // Import NotificationDropdown

export default function Navbar({ user }) {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out ${
      isActive
        ? "bg-primary-600 text-white shadow-md"
        : "text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-800 hover:text-primary-700 dark:hover:text-primary-200"
    }`;

  return (
    <nav className="bg-light dark:bg-dark shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-300 flex items-center space-x-2"
          >
            <Home className="w-6 h-6" />
            <span>AI Platform</span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex space-x-4">
            {user && (
              <NavLink to="/dashboard" className={navLinkClass}>
                <LayoutDashboard className="w-4 h-4 mr-1 inline" />
                Dashboard
              </NavLink>
            )}
            <NavLink to="/resumematcher" className={navLinkClass}>
              Resume Matcher
            </NavLink>
            <NavLink to="/codereviewer" className={navLinkClass}>
              Code Reviewer
            </NavLink>
            <NavLink to="/learningassistant" className={navLinkClass}>
              Learning Assistant
            </NavLink>
            <NavLink to="/promptgenerator" className={navLinkClass}>
              Prompt Generator
            </NavLink>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Notification Dropdown */}
            <NotificationDropdown />

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-primary-100 dark:hover:bg-primary-800 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Sun className="w-5 h-5 text-accent-400" />
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-800 transition-all duration-300"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              )}
            </button>

            {/* Profile/Login */}
            {user ? (
              <Link 
                to="/profile" 
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-800 transition-all duration-300 group"
                title="Go to Profile"
              >
                <img
                  src={`https://ui-avatars.com/api/?name=${user.name}&background=6366f1&color=ffffff`}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border-2 border-primary-200 dark:border-primary-700 shadow-md group-hover:scale-105 transition-transform duration-300"
                />
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Profile
                  </p>
                </div>
                <User className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
              </Link>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-primary-600 text-white rounded-lg shadow-md hover:bg-primary-700 transition-all duration-300 ease-in-out flex items-center space-x-2"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {user && (
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-800 hover:text-primary-700 dark:hover:text-primary-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LayoutDashboard className="w-4 h-4 mr-2 inline" />
                  Dashboard
                </Link>
              )}
              <Link
                to="/resumematcher"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-800 hover:text-primary-700 dark:hover:text-primary-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Resume Matcher
              </Link>
              <Link
                to="/codereviewer"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-800 hover:text-primary-700 dark:hover:text-primary-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Code Reviewer
              </Link>
              <Link
                to="/learningassistant"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-800 hover:text-primary-700 dark:hover:text-primary-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Learning Assistant
              </Link>
              <Link
                to="/promptgenerator"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-800 hover:text-primary-700 dark:hover:text-primary-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Prompt Generator
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
