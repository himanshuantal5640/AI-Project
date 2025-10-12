import React from "react";
import { motion } from "framer-motion";

export default function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.98, boxShadow: "0 0px 0px 0px rgba(0, 0, 0, 0)" }}
      animate={{ opacity: 1, y: 0, scale: 1, boxShadow: "0 30px 60px 10px rgba(0, 0, 0, 0.5)" }}
      exit={{ opacity: 0, y: -15, scale: 0.98, boxShadow: "0 0px 0px 0px rgba(0, 0, 0, 0)" }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
        boxShadow: { duration: 0.6, ease: "easeOut" },
        scale: { duration: 0.6, ease: "easeOut" },
      }}
      className="p-8 min-h-screen bg-light dark:bg-dark text-gray-900 dark:text-gray-100 transition-colors duration-300"
    >
      {children}
    </motion.div>
  );
}
