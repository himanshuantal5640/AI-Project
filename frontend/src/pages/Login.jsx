import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useNotifications } from "../NotificationContext"; // Import useNotifications

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { addNotification } = useNotifications(); // Use the notification context

  const handleSubmit = (e) => {
    e.preventDefault();
    // 🔑 Backend Auth will replace this
    setUser({ name: "Himanshu", email });
    addNotification({ id: Date.now(), message: "You have successfully logged in!", type: "system", read: false, time: new Date().toLocaleTimeString() }); // Add notification
    navigate("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex justify-center items-center min-h-screen bg-light dark:bg-dark py-12 px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, boxShadow: "0 0px 0px 0px rgba(0, 0, 0, 0)" }}
        animate={{ scale: 1, opacity: 1, boxShadow: "0 20px 40px 0px rgba(0, 0, 0, 0.3)" }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
          boxShadow: { duration: 0.5, ease: "easeOut" },
          scale: { duration: 0.5, ease: "easeOut" },
          delay: 0.2,
        }}
        className="w-full max-w-md bg-white dark:bg-dark p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700"
      >
        <h2 className="text-3xl font-bold text-center text-primary-700 dark:text-primary-200 mb-8">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 mt-1 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 dark:bg-gray-800 dark:text-white placeholder-gray-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-1 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 dark:bg-gray-800 dark:text-white placeholder-gray-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-primary-600 text-white py-3 rounded-lg shadow-md hover:bg-primary-700 transition-all duration-300 ease-in-out font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            Login
          </motion.button>
        </form>

        <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-primary-600 hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
}
