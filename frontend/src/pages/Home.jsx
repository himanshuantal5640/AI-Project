import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react"; // Import a new icon for visual appeal

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative isolate overflow-hidden bg-gradient-to-br from-light to-gray-100 dark:from-dark dark:to-gray-950 min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center py-20 px-6 sm:px-10 lg:px-12"
    >
      {/* Background blobs/shapes for aesthetic */}
      <div className="absolute inset-0 z-[-1]">
        <div className="absolute top-[-40%] left-[calc(50%-15rem)] -z-10 transform-gpu blur-3xl sm:top-[-20%] sm:left-[calc(50%-30rem)]" aria-hidden="true">
          <motion.div
            initial={{ rotate: 0, scale: 0.8 }}
            animate={{ rotate: 360, scale: 1 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="aspect-[1155/678] w-[36.125rem] bg-gradient-to-tr from-primary-400 to-accent-600 opacity-30 sm:w-[72.1875rem]"
            style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}
          ></motion.div>
        </div>
        <div className="absolute bottom-[-20%] right-[calc(50%-15rem)] -z-10 transform-gpu blur-3xl sm:bottom-[-10%] sm:right-[calc(50%-30rem)]" aria-hidden="true">
          <motion.div
            initial={{ rotate: 0, scale: 0.8 }}
            animate={{ rotate: -360, scale: 1 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear", delay: 5 }}
            className="aspect-[1155/678] w-[36.125rem] bg-gradient-to-tr from-secondary-400 to-primary-600 opacity-30 sm:w-[72.1875rem]"
            style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}
          ></motion.div>
        </div>
      </div>

      <h1 className="text-6xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400 leading-tight drop-shadow-lg">
        Welcome to AIPlatform <motion.span
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{ display: "inline-block" }}
        >✨</motion.span>
      </h1>
      <p className="text-2xl max-w-4xl text-gray-800 dark:text-gray-200 mb-10 font-light leading-relaxed">
        Your ultimate AI-powered toolkit for accelerating career growth, boosting productivity, and mastering new skills. Discover intelligent solutions tailored for you.
      </p>
      <div className="mt-12 flex flex-col sm:flex-row gap-6">
        <motion.a
          whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
          whileTap={{ scale: 0.98 }}
          href="/login"
          className="px-10 py-4 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-all duration-300 ease-in-out font-bold text-xl flex items-center justify-center gap-2"
        >
          Get Started <ArrowRight className="w-5 h-5" />
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
          whileTap={{ scale: 0.98 }}
          href="/signup"
          className="px-10 py-4 bg-white dark:bg-gray-800 text-primary-700 dark:text-primary-300 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out font-bold text-xl flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-600"
        >
          Learn More
        </motion.a>
      </div>

      {/* How It Works Section */}
      <div className="mt-24 w-full max-w-6xl">
        <h2 className="text-4xl font-bold text-center text-primary-700 dark:text-primary-200 mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <div className="text-5xl mb-4 text-primary-600 dark:text-primary-400">1️⃣</div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Choose Your Tool</h3>
            <p className="text-center text-gray-600 dark:text-gray-400">Select from our suite of AI tools: Resume Matcher, Code Reviewer, Learning Assistant, or Prompt Generator.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <div className="text-5xl mb-4 text-primary-600 dark:text-primary-400">2️⃣</div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Provide Input</h3>
            <p className="text-center text-gray-600 dark:text-gray-400">Upload your files, paste your code, or type your questions into the intuitive interfaces.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <div className="text-5xl mb-4 text-primary-600 dark:text-primary-400">3️⃣</div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Get Instant AI Insights</h3>
            <p className="text-center text-gray-600 dark:text-gray-400">Receive intelligent feedback, suggestions, and tailored assistance powered by advanced AI.</p>
          </motion.div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="mt-24 w-full max-w-6xl">
        <h2 className="text-4xl font-bold text-center text-primary-700 dark:text-primary-200 mb-12">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 relative"
          >
            <p className="text-lg text-gray-700 dark:text-gray-300 italic mb-4">
              "AIPlatform transformed my job search! The Resume Matcher is incredibly accurate."
            </p>
            <p className="font-semibold text-primary-600 dark:text-primary-300">- Jane Doe</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Software Engineer</p>
            <span className="absolute -top-3 -left-3 text-6xl text-gray-200 dark:text-gray-700 opacity-70">‟</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 relative"
          >
            <p className="text-lg text-gray-700 dark:text-gray-300 italic mb-4">
              "The Code Reviewer catches subtle bugs I always miss. A game-changer!"
            </p>
            <p className="font-semibold text-primary-600 dark:text-primary-300">- John Smith</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Full-Stack Developer</p>
            <span className="absolute -top-3 -left-3 text-6xl text-gray-200 dark:text-gray-700 opacity-70">‟</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 relative"
          >
            <p className="text-lg text-gray-700 dark:text-gray-300 italic mb-4">
              "My learning has never been faster. The Learning Assistant is truly personalized."
            </p>
            <p className="font-semibold text-primary-600 dark:text-primary-300">- Emily White</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Student</p>
            <span className="absolute -top-3 -left-3 text-6xl text-gray-200 dark:text-gray-700 opacity-70">‟</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
