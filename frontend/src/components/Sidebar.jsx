import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Sidebar() {
  return (
    <motion.aside
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-64 bg-light dark:bg-dark shadow-lg p-6 space-y-6 border-r border-gray-200 dark:border-gray-700"
    >
      <h2 className="text-xl font-semibold text-primary-700 dark:text-primary-200">Dashboard</h2>
      <nav className="space-y-4">
        <Link to="/resume-matcher" className="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-800 hover:text-primary-700 dark:hover:text-primary-200 transition-all duration-300 ease-in-out">
          Resume Matcher
        </Link>
        <Link to="/code-reviewer" className="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-800 hover:text-primary-700 dark:hover:text-primary-200 transition-all duration-300 ease-in-out">
          Code Reviewer
        </Link>
        <Link to="/learning-assistant" className="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-800 hover:text-primary-700 dark:hover:text-primary-200 transition-all duration-300 ease-in-out">
          Learning Assistant
        </Link>
      </nav>
    </motion.aside>
  );
}
