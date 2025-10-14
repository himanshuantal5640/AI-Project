import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ResumeMatcher from "./pages/ResumeMatcher";
import CodeReviewer from "./pages/CodeReviewer";
import LearningAssistant from "./pages/LearningAssistant";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard"; // Import Dashboard
import PromptGenerator from "./pages/PromptGenerator"; // Import PromptGenerator

export default function App() {
  const [user, setUser] = useState(null);

  // Protected route wrapper
  const PrivateRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" replace />;
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Navbar user={user} />
      <Routes>
        {/* Home page - accessible to all users */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Protected routes (need login) */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/resumematcher"
          element={
            <PrivateRoute>
              <ResumeMatcher />
            </PrivateRoute>
          }
        />
        <Route
          path="/codereviewer"
          element={
            <PrivateRoute>
              <CodeReviewer />
            </PrivateRoute>
          }
        />
        <Route
          path="/learningassistant"
          element={
            <PrivateRoute>
              <LearningAssistant />
            </PrivateRoute>
          }
        />
        <Route
          path="/promptgenerator"
          element={
            <PrivateRoute>
              <PromptGenerator />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile user={user} setUser={setUser} />
            </PrivateRoute>
          }
        />

        {/* Auth routes */}
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
      </Routes>
    </div>
  );
}
