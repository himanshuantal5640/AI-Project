import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  Sparkles, 
  Brain, 
  BookOpen, 
  Lightbulb, 
  Code, 
  FileText, 
  Calculator,
  Globe,
  Zap,
  Star,
  MessageSquare,
  Download,
  Copy,
  RefreshCw,
  Plus,
  Trash2,
  Edit3,
  Save,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function LearningAssistant() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("general");
  const [conversationMode, setConversationMode] = useState("chat");
  const [chatHistory, setChatHistory] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [editingChatTitle, setEditingChatTitle] = useState(null);
  const messagesEndRef = useRef(null);

  const subjects = [
    { id: "general", label: "General", icon: Brain, color: "blue" },
    { id: "programming", label: "Programming", icon: Code, color: "green" },
    { id: "mathematics", label: "Mathematics", icon: Calculator, color: "purple" },
    { id: "science", label: "Science", icon: Globe, color: "orange" },
    { id: "writing", label: "Writing", icon: FileText, color: "pink" },
    { id: "business", label: "Business", icon: Lightbulb, color: "indigo" }
  ];


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load chat history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('learningAssistantChatHistory');
    if (savedHistory) {
      setChatHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save chat history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('learningAssistantChatHistory', JSON.stringify(chatHistory));
  }, [chatHistory]);

  const startNewChat = () => {
    setMessages([]);
    setCurrentChatId(null);
    setInput("");
  };

  const loadChat = (chatId) => {
    const chat = chatHistory.find(c => c.id === chatId);
    if (chat) {
      setMessages(chat.messages);
      setCurrentChatId(chatId);
      setSelectedSubject(chat.subject);
    }
  };

  const saveCurrentChat = () => {
    if (messages.length === 0) return;

    const chatTitle = messages[0]?.text?.substring(0, 50) + (messages[0]?.text?.length > 50 ? '...' : '') || 'New Chat';
    const newChat = {
      id: currentChatId || Date.now(),
      title: chatTitle,
      subject: selectedSubject,
      messages: [...messages],
      timestamp: new Date(),
      lastMessage: messages[messages.length - 1]?.text || ''
    };

    if (currentChatId) {
      // Update existing chat
      setChatHistory(prev => prev.map(chat => 
        chat.id === currentChatId ? newChat : chat
      ));
    } else {
      // Create new chat
      setChatHistory(prev => [newChat, ...prev]);
      setCurrentChatId(newChat.id);
    }
  };

  const deleteChat = (chatId) => {
    setChatHistory(prev => prev.filter(chat => chat.id !== chatId));
    if (currentChatId === chatId) {
      startNewChat();
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const newMessage = { id: Date.now(), text: input, sender: "user" };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    // Simulate AI response with subject-specific content
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    const aiResponse = {
      id: Date.now() + 1,
      text: generateAIResponse(newMessage.text, selectedSubject),
      sender: "ai",
      subject: selectedSubject
    };
    const finalMessages = [...updatedMessages, aiResponse];
    setMessages(finalMessages);
    setLoading(false);

    // Auto-save chat after each message
    setTimeout(() => {
      const chatTitle = finalMessages[0]?.text?.substring(0, 50) + (finalMessages[0]?.text?.length > 50 ? '...' : '') || 'New Chat';
      const newChat = {
        id: currentChatId || Date.now(),
        title: chatTitle,
        subject: selectedSubject,
        messages: finalMessages,
        timestamp: new Date(),
        lastMessage: aiResponse.text
      };

      if (currentChatId) {
        setChatHistory(prev => prev.map(chat => 
          chat.id === currentChatId ? newChat : chat
        ));
      } else {
        setChatHistory(prev => [newChat, ...prev]);
        setCurrentChatId(newChat.id);
      }
    }, 100);
  };

  const generateAIResponse = (userInput, subject) => {
    const responses = {
      general: `I'd be happy to help you with "${userInput}". Let me break this down into key concepts and provide you with a comprehensive explanation.`,
      programming: `Great question about programming! For "${userInput}", I'll explain the concept, show you code examples, and discuss best practices.`,
      mathematics: `Let's work through this mathematical concept step by step. For "${userInput}", I'll provide clear explanations and examples.`,
      science: `Excellent scientific question! Regarding "${userInput}", I'll explain the underlying principles and real-world applications.`,
      writing: `I'll help you improve your writing skills. For "${userInput}", I'll provide structure, style tips, and examples.`,
      business: `Let's explore this business concept together. For "${userInput}", I'll discuss strategies, case studies, and practical applications.`
    };
    return responses[subject] || responses.general;
  };


  const clearConversation = () => {
    setMessages([]);
    setCurrentChatId(null);
  };

  const copyConversation = () => {
    const conversationText = messages.map(msg => 
      `${msg.sender === 'user' ? 'You' : 'AI'}: ${msg.text}`
    ).join('\n\n');
    navigator.clipboard.writeText(conversationText);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex">
      {/* Sidebar - Chat History */}
      <motion.div
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: showSidebar ? 0 : -300, opacity: showSidebar ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`${showSidebar ? 'w-80' : 'w-0'} bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300 overflow-hidden`}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Chat History
            </h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startNewChat}
              className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              title="New Chat"
            >
              <Plus className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {chatHistory.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                No chat history yet
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
                Start a conversation to see it here
              </p>
            </div>
          ) : (
            chatHistory.map((chat) => (
    <motion.div
                key={chat.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  currentChatId === chat.id
                    ? 'bg-indigo-100 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800'
                    : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
                onClick={() => loadChat(chat.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {chat.title}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        chat.subject === 'general' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300' :
                        chat.subject === 'programming' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' :
                        chat.subject === 'mathematics' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300' :
                        chat.subject === 'science' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300' :
                        chat.subject === 'writing' ? 'bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-300' :
                        'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-300'
                      }`}>
                        {subjects.find(s => s.id === chat.subject)?.label}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {chat.lastMessage}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      {new Date(chat.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteChat(chat.id);
                    }}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors ml-2"
                    title="Delete chat"
                  >
                    <Trash2 className="w-3 h-3" />
                  </motion.button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSidebar(!showSidebar)}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                title={showSidebar ? "Hide chat history" : "Show chat history"}
              >
                {showSidebar ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </motion.button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  AI Learning Assistant
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {subjects.find(s => s.id === selectedSubject)?.label} Expert
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={copyConversation}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                title="Copy conversation"
              >
                <Copy className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearConversation}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                title="Clear conversation"
              >
                <RefreshCw className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex">
          {/* Left Panel - Subject Selection */}
          <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 overflow-y-auto">
            <div className="space-y-4">
              {/* Subject Selection */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
                  Choose Subject
                </h3>
                <div className="space-y-1">
                  {subjects.map((subject) => {
                    const Icon = subject.icon;
                    const isSelected = selectedSubject === subject.id;
                    
                    return (
                      <motion.button
                        key={subject.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedSubject(subject.id)}
                        className={`w-full p-2 rounded-lg border-2 transition-all duration-300 text-left ${
                          isSelected 
                            ? `border-${subject.color}-500 bg-${subject.color}-50 dark:bg-${subject.color}-900/20` 
                            : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${
                            isSelected 
                              ? `bg-${subject.color}-500 text-white` 
                              : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className={`font-medium ${
                            isSelected 
                              ? `text-${subject.color}-700 dark:text-${subject.color}-300` 
                              : "text-gray-700 dark:text-gray-300"
                          }`}>
                            {subject.label}
                          </span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>

          {/* Right Panel - Chat Interface */}
          <div className="flex-1 flex flex-col">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Start a conversation
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Ask me anything about {subjects.find(s => s.id === selectedSubject)?.label.toLowerCase()} or any other topic!
                  </p>
                </div>
              )}

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
                      className={`max-w-[70%] p-4 rounded-2xl shadow-md ${
                        msg.sender === "user"
                          ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-br-none"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none"
                      }`}
                    >
                      {msg.sender === "ai" && (
                        <div className="flex items-center space-x-2 mb-2">
                          <Sparkles className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                          <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                            AI Assistant
                          </span>
                        </div>
                      )}
                      <p className="whitespace-pre-wrap">{msg.text}</p>
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
                  <div className="max-w-[70%] p-4 rounded-2xl shadow-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none">
                    <div className="flex items-center space-x-2 mb-2">
                      <Sparkles className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                      <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                        AI Assistant
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-sm">Thinking...</span>
                    </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

            {/* Input Area - Sticky */}
            <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 shadow-lg">
      <form onSubmit={handleSendMessage} className="flex space-x-4">
                <div className="flex-1 relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything..."
                    className="w-full p-4 pr-12 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
        />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Star className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={loading || !input.trim()}
                  className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
        </motion.button>
      </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}