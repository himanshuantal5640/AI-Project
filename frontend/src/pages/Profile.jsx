import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Settings, LogOut, Trash2, Key } from "lucide-react"; // Import Key icon
import { motion } from "framer-motion";

export default function Profile({ user, setUser }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  const handleDeleteAccount = () => {
    setUser(null);
    navigate("/");
    alert("Account deleted (frontend only)");
  };

  const tabButtonClass = (tabName) =>
    `flex items-center px-6 py-3 w-full text-left font-medium transition-all duration-300 ease-in-out
     ${activeTab === tabName
        ? "bg-primary-100 dark:bg-primary-700 text-primary-700 dark:text-primary-200 border-l-4 border-primary-500"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}
    `;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)] bg-light dark:bg-dark text-gray-900 dark:text-gray-100 transition-colors duration-300"
    >
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -50, opacity: 0, boxShadow: "0 0px 0px 0px rgba(0, 0, 0, 0)" }}
        animate={{ x: 0, opacity: 1, boxShadow: "0 20px 40px 0px rgba(0, 0, 0, 0.3)" }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
          boxShadow: { duration: 0.5, ease: "easeOut" },
          delay: 0.2,
        }}
        className="w-full md:w-64 bg-white dark:bg-gray-800 shadow-xl border-r border-gray-200 dark:border-gray-700 flex flex-col p-4 md:p-6"
      >
        <div className="flex flex-col items-center py-6 border-b border-gray-200 dark:border-gray-700 mb-4">
          <div className="w-24 h-24 rounded-full bg-primary-600 dark:bg-primary-400 text-white flex items-center justify-center text-4xl font-bold mb-3 shadow-md">
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-xl font-bold text-primary-700 dark:text-primary-200">
            {user.name}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
        </div>

        <nav className="flex-1 space-y-1">
          <button
            onClick={() => setActiveTab("profile")}
            className={tabButtonClass("profile")}
          >
            <User className="w-5 h-5 mr-3" /> Profile
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={tabButtonClass("settings")}
          >
            <Settings className="w-5 h-5 mr-3" /> Account Settings
          </button>
          <button
            onClick={() => setActiveTab("apikeys")}
            className={tabButtonClass("apikeys")}
          >
            <Key className="w-5 h-5 mr-3" /> API Keys
          </button>
        </nav>

        <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-700">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 mb-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 ease-in-out font-medium"
          >
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDeleteAccount}
            className="flex items-center w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 ease-in-out font-medium"
          >
            <Trash2 className="w-4 h-4 mr-2" /> Delete Account
          </motion.button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
        className="flex-1 p-6 md:p-8"
      >
        {activeTab === "profile" && (
          <motion.div
            key="profile-tab"
            initial={{ opacity: 0, y: 10, boxShadow: "0 0px 0px 0px rgba(0, 0, 0, 0)" }}
            animate={{ opacity: 1, y: 0, boxShadow: "0 20px 40px 0px rgba(0, 0, 0, 0.3)" }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
              boxShadow: { duration: 0.4, ease: "easeOut" },
            }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 md:p-8"
          >
            <h2 className="text-3xl font-bold text-primary-700 dark:text-primary-200 mb-4">
              Profile Overview
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Welcome to your profile page. Here you can view and manage your personal information.
            </p>
            {/* Add more profile details here */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center">
                <span className="font-semibold w-24 text-gray-700 dark:text-gray-300">Name:</span>
                <span className="text-gray-900 dark:text-gray-100">{user.name}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold w-24 text-gray-700 dark:text-gray-300">Email:</span>
                <span className="text-gray-900 dark:text-gray-100">{user.email}</span>
              </div>
            </div>
          </motion.div>
        )}
        {activeTab === "settings" && (
          <motion.div
            key="settings-tab"
            initial={{ opacity: 0, y: 10, boxShadow: "0 0px 0px 0px rgba(0, 0, 0, 0)" }}
            animate={{ opacity: 1, y: 0, boxShadow: "0 20px 40px 0px rgba(0, 0, 0, 0.3)" }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
              boxShadow: { duration: 0.4, ease: "easeOut" },
            }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 md:p-8"
          >
            <h2 className="text-3xl font-bold text-primary-700 dark:text-primary-200 mb-4">
              Account Settings
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Adjust your preferences, change password, or manage your account here.
            </p>
            {/* Add more settings options here */}
            <div className="mt-6 space-y-4">
              <button className="px-6 py-3 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition-all duration-300 ease-in-out font-medium">
                Change Password
              </button>
              <button className="px-6 py-3 ml-4 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-all duration-300 ease-in-out font-medium">
                Update Email
              </button>
            </div>
          </motion.div>
        )}
        {activeTab === "apikeys" && (
          <motion.div
            key="apikeys-tab"
            initial={{ opacity: 0, y: 10, boxShadow: "0 0px 0px 0px rgba(0, 0, 0, 0)" }}
            animate={{ opacity: 1, y: 0, boxShadow: "0 20px 40px 0px rgba(0, 0, 0, 0.3)" }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
              boxShadow: { duration: 0.4, ease: "easeOut" },
            }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 md:p-8"
          >
            <h2 className="text-3xl font-bold text-primary-700 dark:text-primary-200 mb-4">
              API Key Management
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Manage your API keys for integrating with external services.
            </p>
            <div className="space-y-4">
              {/* Existing API Keys Section */}
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Your API Keys</h3>
              {/* Placeholder for API key list */}
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex items-center justify-between">
                <span className="font-mono text-gray-800 dark:text-gray-200">********************abcde12345</span>
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-secondary-500 text-white rounded-lg text-sm hover:bg-secondary-600 transition"
                  >
                    Copy
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition"
                  >
                    Revoke
                  </motion.button>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Remember to keep your API keys secure and never share them publicly.</p>

              {/* Generate New API Key Section */}
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-2">Generate New API Key</h3>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-primary-600 text-white rounded-lg shadow-md hover:bg-primary-700 transition-all duration-300 ease-in-out font-medium"
              >
                Generate New Key
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.main>
    </motion.div>
  );
}
