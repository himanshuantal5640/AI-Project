import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../ThemeContext";
import { Moon, Sun } from "lucide-react";
import NotificationDropdown from "./NotificationDropdown"; // Import NotificationDropdown

export default function Navbar({ user }) {
  const { theme, toggleTheme } = useTheme();

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
          <Link to="/" className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            AI Platform
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex space-x-4">
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

            {/* Profile/Login */}
            {user ? (
              <Link to="/profile">
                <img
                  src={`https://ui-avatars.com/api/?name=${user.name}`}
                  alt="Profile"
                  className="w-9 h-9 rounded-full border shadow-md hover:scale-105 transition"
                />
              </Link>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-primary-600 text-white rounded-lg shadow-md hover:bg-primary-700 transition-all duration-300 ease-in-out"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
