import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useNotifications } from "../NotificationContext";

export default function Signup({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [verificationMethod, setVerificationMethod] = useState("email"); // 'email' or 'phone'
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();
  const { addNotification } = useNotifications();

  // Password validation function
  const validatePassword = (password) => {
    const minLength = password.length >= 6;
    const hasAlphabet = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

    if (!minLength) return "Password must be at least 6 characters long";
    if (!hasAlphabet) return "Password must contain at least one letter";
    if (!hasNumber) return "Password must contain at least one number";
    if (!hasSpecialChar) return "Password must contain at least one special character";
    
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate password
    const validationError = validatePassword(password);
    if (validationError) {
      setPasswordError(validationError);
      return;
    }
    
    // Clear any previous errors
    setPasswordError("");
    
    // 🔑 Backend Auth will replace this
    const userDetails = { name: "New User", email };
    setUser(userDetails);
    addNotification({ id: Date.now(), message: "You have successfully signed up!", type: "system", read: false, time: new Date().toLocaleTimeString() });
    console.log("Signup with:", { email, password, verificationMethod, phoneNumber });
    navigate("/");
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    
    // Clear error when user starts typing
    if (passwordError) {
      setPasswordError("");
    }
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
          Create Your Account
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
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className={`w-full px-4 py-2 mt-1 rounded-lg border focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 dark:bg-gray-800 dark:text-white placeholder-gray-400 pr-12 ${
                  passwordError 
                    ? "border-red-500 focus:ring-red-500" 
                    : "border-gray-300 dark:border-gray-600"
                }`}
                value={password}
                onChange={handlePasswordChange}
                required
                placeholder="Create your password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {passwordError && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{passwordError}</p>
            )}
            
          </div>

          {/* Verification Method Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Verification Method
            </label>
            <div className="flex items-center space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-primary-600"
                  name="verificationMethod"
                  value="email"
                  checked={verificationMethod === "email"}
                  onChange={() => setVerificationMethod("email")}
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">Email Verification</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-primary-600"
                  name="verificationMethod"
                  value="phone"
                  checked={verificationMethod === "phone"}
                  onChange={() => setVerificationMethod("phone")}
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">OTP Verification (Phone)</span>
              </label>
            </div>
          </div>

          {/* Conditional Phone Number Input */}
          {verificationMethod === "phone" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
              <input
                type="tel"
                className="w-full px-4 py-2 mt-1 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 dark:bg-gray-800 dark:text-white placeholder-gray-400"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                placeholder="Enter your phone number"
              />
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-secondary-600 text-white py-3 rounded-lg shadow-md hover:bg-secondary-700 transition-all duration-300 ease-in-out font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-secondary-500"
          >
            Sign Up
          </motion.button>
        </form>

        <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-primary-600 hover:underline font-medium">
            Login
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
}
