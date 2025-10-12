import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Mail } from 'lucide-react'; // Import Mail icon
import { useNotifications } from '../NotificationContext';

export default function NotificationDropdown() {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (unreadCount > 0) {
      markAllAsRead();
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleDropdown}
        className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      >
        <Bell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        {unreadCount > 0 && (
          <motion.span
            key={unreadCount} // Key change to re-trigger animation
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
          >
            {unreadCount}
          </motion.span>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95, boxShadow: "0 0px 0px 0px rgba(0, 0, 0, 0)" }}
            animate={{ opacity: 1, y: 0, scale: 1, boxShadow: "0 20px 40px 0px rgba(0, 0, 0, 0.3)" }}
            exit={{ opacity: 0, y: -10, scale: 0.95, boxShadow: "0 0px 0px 0px rgba(0, 0, 0, 0)" }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
              boxShadow: { duration: 0.2, ease: "easeOut" },
              scale: { duration: 0.2, ease: "easeOut" },
            }}
            className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex justify-between items-center px-4 py-2 border-b dark:border-gray-700">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200">Notifications</h3>
              <button
                onClick={markAllAsRead}
                className="text-primary-600 hover:text-primary-800 text-sm"
              >
                Mark all as read
              </button>
            </div>
            {
              notifications.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-sm p-4 text-center">No new notifications</p>
              ) : (
                <ul>
                  {notifications.map((notification) => (
                    <motion.li
                      key={notification.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`flex items-start p-4 hover:bg-gray-50 dark:hover:bg-gray-700 ${!notification.read ? 'bg-blue-50 dark:bg-gray-750' : ''}`}
                    >
                      <div className="flex-shrink-0 mt-1">
                        {notification.type === 'email' && <Mail className="w-5 h-5 text-blue-500" />}
                        {notification.type === 'system' && <Bell className="w-5 h-5 text-yellow-500" />}
                      </div>
                      <div className="ml-3 overflow-hidden">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{notification.message}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                      </div>
                      {!notification.read && (
                        <button onClick={() => markAsRead(notification.id)} className="ml-auto flex-shrink-0 text-primary-600 hover:text-primary-800 text-sm">
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </motion.li>
                  ))}
                </ul>
              )
            }
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
