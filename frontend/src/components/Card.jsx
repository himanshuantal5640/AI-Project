import React from "react";
import { motion } from "framer-motion";

export default function Card({ title, desc, link }) {
  return (
    <motion.div
      className="bg-light dark:bg-dark shadow-xl rounded-xl p-6 cursor-pointer border border-gray-100 dark:border-gray-700"
      whileHover={{ scale: 1.03, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h2 className="text-xl font-semibold text-primary-700 dark:text-primary-200">
        {title}
      </h2>
      <p className="text-gray-600 dark:text-gray-400 my-2">{desc}</p>
      <a
        href={link}
        className="text-primary-600 dark:text-primary-400 font-medium hover:underline"
      >
        Go →
      </a>
    </motion.div>
  );
}
