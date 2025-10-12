import React, { useState } from "react";
import { motion } from "framer-motion";

export default function PromptGenerator() {
  const [selectedTask, setSelectedTask] = useState("summarize");
  const [inputText, setInputText] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const taskOptions = [
    { value: "summarize", label: "Summarize Text", placeholder: "Paste text to summarize..." },
    { value: "marketing", label: "Generate Marketing Copy", placeholder: "Describe your product..." },
    { value: "code", label: "Write Code Snippet", placeholder: "Describe the function (e.g., 'a Python function to reverse a string')..." },
    { value: "idea", label: "Brainstorm Ideas", placeholder: "What topic do you want to brainstorm?" },
  ];

  const generatePrompt = async () => {
    setLoading(true);
    setGeneratedPrompt("");
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call

    let prompt = "";
    switch (selectedTask) {
      case "summarize":
        prompt = `Please summarize the following text concisely: "${inputText}"`;
        break;
      case "marketing":
        prompt = `Generate compelling marketing copy for a product described as: "${inputText}"`;
        break;
      case "code":
        prompt = `Write a code snippet for the following: "${inputText}"`;
        break;
      case "idea":
        prompt = `Brainstorm creative ideas for: "${inputText}"`;
        break;
      default:
        prompt = `Generate an AI response based on: "${inputText}"`;
    }
    setGeneratedPrompt(prompt);
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, boxShadow: "0 0px 0px 0px rgba(0, 0, 0, 0)" }}
      animate={{ opacity: 1, y: 0, boxShadow: "0 20px 40px 0px rgba(0, 0, 0, 0.3)" }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
        boxShadow: { duration: 0.6, ease: "easeOut" },
      }}
      className="max-w-4xl mx-auto p-6 bg-white dark:bg-dark shadow-xl rounded-xl border border-gray-100 dark:border-gray-700"
    >
      <h2 className="text-4xl font-bold text-center text-primary-700 dark:text-primary-200 mb-6">
        AI Prompt Generator
      </h2>
      <p className="text-center text-lg text-gray-700 dark:text-gray-300 mb-8">
        Craft effective prompts for various AI tasks.
      </p>

      <div className="space-y-6">
        <div>
          <label htmlFor="task-select" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
            Select AI Task:
          </label>
          <select
            id="task-select"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
            value={selectedTask}
            onChange={(e) => {
              setSelectedTask(e.target.value);
              setInputText("");
              setGeneratedPrompt("");
            }}
          >
            {taskOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="input-text" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
            Input Text:
          </label>
          <textarea
            id="input-text"
            className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 font-mono resize-y"
            rows="6"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={taskOptions.find(opt => opt.value === selectedTask)?.placeholder || "Enter your text here..."}
          ></textarea>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={generatePrompt}
          disabled={loading || !inputText.trim()}
          className="w-full bg-primary-600 text-white py-3 rounded-lg shadow-md hover:bg-primary-700 transition-all duration-300 ease-in-out font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Generating..." : "Generate Prompt"}
        </motion.button>

        {generatedPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-8 p-6 bg-secondary-50 dark:bg-secondary-900 border border-secondary-200 dark:border-secondary-700 rounded-lg shadow-inner"
          >
            <h3 className="text-2xl font-semibold text-secondary-800 dark:text-secondary-200 mb-4">Generated Prompt:</h3>
            <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap font-mono">{generatedPrompt}</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
