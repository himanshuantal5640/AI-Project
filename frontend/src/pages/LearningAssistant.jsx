import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles } from "lucide-react";

export default function LearningAssistant() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const newMessage = { id: Date.now(), text: input, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput("");
    setLoading(true);

    // Simulate AI response
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const aiResponse = {
      id: Date.now() + 1,
      text: `Hello! You asked: "${newMessage.text}". I'm an AI learning assistant, how can I help you further?`,
      sender: "ai",
    };
    setMessages((prevMessages) => [...prevMessages, aiResponse]);
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
      className="max-w-3xl mx-auto p-6 bg-white dark:bg-dark shadow-xl rounded-xl border border-gray-100 dark:border-gray-700 flex flex-col h-[70vh]"
    >
      <h2 className="text-4xl font-bold text-center text-primary-700 dark:text-primary-200 mb-6">
        Learning Assistant
      </h2>
      <p className="text-center text-lg text-gray-700 dark:text-gray-300 mb-8">
        Ask me anything and get AI-powered learning assistance!
      </p>

      <div className="flex-1 overflow-y-auto space-y-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 mb-6">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-xl shadow-md ${msg.sender === "user"
                  ? "bg-primary-500 text-white rounded-br-none"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none"}
                `}
              >
                {msg.sender === "ai" && <Sparkles className="inline-block w-4 h-4 mr-2 text-primary-400 dark:text-primary-300" />}
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex justify-start"
          >
            <div className="max-w-[70%] p-3 rounded-xl shadow-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none animate-pulse">
              <Sparkles className="inline-block w-4 h-4 mr-2 text-primary-400 dark:text-primary-300" />
              AI is typing...
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="flex space-x-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me a question..."
          className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={loading || !input.trim()}
          className="p-3 bg-primary-600 text-white rounded-lg shadow-md hover:bg-primary-700 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
        </motion.button>
      </form>
    </motion.div>
  );
}
