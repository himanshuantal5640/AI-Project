import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Copy, 
  Download, 
  RefreshCw, 
  Wand2, 
  FileText, 
  Code, 
  Lightbulb, 
  Target, 
  Zap,
  Star,
  CheckCircle,
  Settings,
  BookOpen,
  MessageSquare,
  TrendingUp,
  Plus,
  Trash2,
  Edit3,
  Save,
  X,
  ChevronLeft,
  ChevronRight,
  History,
  Clock
} from "lucide-react";

export default function PromptGenerator() {
  const [inputText, setInputText] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [promptHistory, setPromptHistory] = useState([]);
  const [customInstructions, setCustomInstructions] = useState("");
  const [tone, setTone] = useState("professional");
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [currentSession, setCurrentSession] = useState([]);

  const toneOptions = [
    { value: "professional", label: "Professional", icon: Star },
    { value: "casual", label: "Casual", icon: MessageSquare },
    { value: "technical", label: "Technical", icon: Code },
    { value: "creative", label: "Creative", icon: Sparkles }
  ];


  // Load sessions from localStorage on component mount
  useEffect(() => {
    const savedSessions = localStorage.getItem('promptGeneratorSessions');
    if (savedSessions) {
      setSessions(JSON.parse(savedSessions));
    }
  }, []);

  // Save sessions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('promptGeneratorSessions', JSON.stringify(sessions));
  }, [sessions]);

  const startNewSession = () => {
    setCurrentSession([]);
    setCurrentSessionId(null);
    setInputText("");
    setGeneratedPrompt("");
  };

  const loadSession = (sessionId) => {
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      setCurrentSession(session.prompts);
      setCurrentSessionId(sessionId);
      // setSelectedTask(session.task); // This line is removed
      setTone(session.tone);
      setCustomInstructions(session.customInstructions || "");
    }
  };

  const saveCurrentSession = () => {
    if (currentSession.length === 0) return;

    const sessionTitle = currentSession[0]?.input?.substring(0, 50) + (currentSession[0]?.input?.length > 50 ? '...' : '') || 'New Session';
    const newSession = {
      id: currentSessionId || Date.now(),
      title: sessionTitle,
      // task: selectedTask, // This line is removed
      tone: tone,
      customInstructions: customInstructions,
      prompts: [...currentSession],
      timestamp: new Date(),
      lastPrompt: currentSession[currentSession.length - 1]?.prompt || ''
    };

    if (currentSessionId) {
      // Update existing session
      setSessions(prev => prev.map(session => 
        session.id === currentSessionId ? newSession : session
      ));
    } else {
      // Create new session
      setSessions(prev => [newSession, ...prev]);
      setCurrentSessionId(newSession.id);
    }
  };

  const deleteSession = (sessionId) => {
    setSessions(prev => prev.filter(session => session.id !== sessionId));
    if (currentSessionId === sessionId) {
      startNewSession();
    }
  };

  const generatePrompt = async () => {
    if (!inputText.trim()) return;
    
    setLoading(true);
    setGeneratedPrompt("");
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // const selectedTaskInfo = taskOptions.find(opt => opt.value === selectedTask); // This line is removed
    const toneInfo = toneOptions.find(t => t.value === tone);

    let prompt = "";
    const baseInstruction = customInstructions ? `\n\nAdditional instructions: ${customInstructions}` : '';
    
    // switch (selectedTask) { // This line is removed
    //   case "summarize":
    //     prompt = `Please provide a comprehensive summary of the following text. Make it clear, concise, and well-structured. Focus on the main points and key insights.${baseInstruction}\n\nText to summarize: "${inputText}"`;
    //     break;
    //   case "marketing":
    //     prompt = `Create compelling marketing copy for the following product/service. Use persuasive language, highlight benefits, and include a call-to-action. Write in a ${tone} tone.${baseInstruction}\n\nProduct/Service: "${inputText}"`;
    //     break;
    //   case "code":
    //     prompt = `Write clean, well-documented code for the following requirement. Include comments, error handling, and best practices. Use appropriate programming patterns.${baseInstruction}\n\nRequirement: "${inputText}"`;
    //     break;
    //   case "idea":
    //     prompt = `Generate creative and innovative ideas for the following topic. Think outside the box and provide practical, actionable suggestions.${baseInstruction}\n\nTopic: "${inputText}"`;
    //     break;
    //   case "writing":
    //     prompt = `Write engaging content about the following topic. Structure it well with an introduction, main points, and conclusion. Use a ${tone} tone.${baseInstruction}\n\nTopic: "${inputText}"`;
    //     break;
    //   case "analysis":
    //     prompt = `Analyze the following data and provide insights, trends, and recommendations. Include statistical observations and actionable conclusions.${baseInstruction}\n\nData: "${inputText}"`;
    //     break;
    //   default:
    //     prompt = `Generate a comprehensive response for the following request. Be detailed, accurate, and helpful.${baseInstruction}\n\nRequest: "${inputText}"`;
    // }
    
    prompt = `Generate a comprehensive response for the following request. Be detailed, accurate, and helpful.${baseInstruction}\n\nRequest: "${inputText}"`;
    
    setGeneratedPrompt(prompt);
    
    // Add to current session
    const newPrompt = {
      id: Date.now(),
      input: inputText,
      prompt: prompt,
      // task: selectedTask, // This line is removed
      tone: tone,
      timestamp: new Date()
    };
    
    const updatedSession = [...currentSession, newPrompt];
    setCurrentSession(updatedSession);
    setLoading(false);

    // Auto-save session
    setTimeout(() => {
      const sessionTitle = updatedSession[0]?.input?.substring(0, 50) + (updatedSession[0]?.input?.length > 50 ? '...' : '') || 'New Session';
      const newSession = {
        id: currentSessionId || Date.now(),
        title: sessionTitle,
        // task: selectedTask, // This line is removed
        tone: tone,
        customInstructions: customInstructions,
        prompts: updatedSession,
        timestamp: new Date(),
        lastPrompt: prompt
      };

      if (currentSessionId) {
        setSessions(prev => prev.map(session => 
          session.id === currentSessionId ? newSession : session
        ));
      } else {
        setSessions(prev => [newSession, ...prev]);
        setCurrentSessionId(newSession.id);
      }
    }, 100);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
  };

  const downloadPrompt = () => {
    const blob = new Blob([generatedPrompt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prompt-${Date.now()}.txt`; // Changed filename to be more generic
    a.click();
    URL.revokeObjectURL(url);
  };


  const loadPromptFromHistory = (prompt) => {
    setGeneratedPrompt(prompt.prompt);
    setInputText(prompt.input);
    // setSelectedTask(prompt.task); // This line is removed
    setTone(prompt.tone);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex">
      {/* Sidebar - Session History */}
      <motion.div
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: showSidebar ? 0 : -300, opacity: showSidebar ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`${showSidebar ? 'w-80' : 'w-0'} bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300 overflow-hidden`}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Prompt Sessions
            </h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startNewSession}
              className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              title="New Session"
            >
              <Plus className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {sessions.length === 0 ? (
            <div className="text-center py-8">
              <Wand2 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                No sessions yet
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
                Generate prompts to see them here
              </p>
            </div>
          ) : (
            sessions.map((session) => (
    <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  currentSessionId === session.id
                    ? 'bg-purple-100 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800'
                    : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
                onClick={() => loadSession(session.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {session.title}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        // session.task === 'summarize' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300' : // This line is removed
                        // session.task === 'marketing' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' : // This line is removed
                        // session.task === 'code' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300' : // This line is removed
                        // session.task === 'idea' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300' : // This line is removed
                        // session.task === 'writing' ? 'bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-300' : // This line is removed
                        // 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-300' // This line is removed
                        'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-300'
                      }`}>
                        {/* {taskOptions.find(t => t.value === session.task)?.label} // This line is removed */}
                        New Session
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {session.lastPrompt}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      {new Date(session.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteSession(session.id);
                    }}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors ml-2"
                    title="Delete session"
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
        <React.Fragment>
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowSidebar(!showSidebar)}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                  title={showSidebar ? "Hide session history" : "Show session history"}
                >
                  {showSidebar ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                </motion.button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          AI Prompt Generator
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Create powerful prompts for any AI task
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={copyToClipboard}
                  disabled={!generatedPrompt}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors disabled:opacity-50"
                  title="Copy prompt"
                >
                  <Copy className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={downloadPrompt}
                  disabled={!generatedPrompt}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors disabled:opacity-50"
                  title="Download prompt"
                >
                  <Download className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="max-w-4xl mx-auto">
              {/* Input Section */}
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                    <Wand2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      New Prompt
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Generate a professional prompt for your AI task
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
              Input Text:
            </label>
            <textarea
                          className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 font-mono resize-y"
            rows="6"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter your text here..."
                      />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={generatePrompt}
          disabled={loading || !inputText.trim()}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Generating Prompt...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center space-x-2">
                          <Sparkles className="w-5 h-5" />
                          <span>Generate Prompt</span>
                        </div>
                      )}
        </motion.button>
                  </div>

                  {/* Generated Prompt */}
        {generatedPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
                    className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-6 shadow-inner"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-purple-800 dark:text-purple-200 flex items-center space-x-2">
                        <CheckCircle className="w-6 h-6" />
                        <span>Generated Prompt</span>
                      </h3>
                      <div className="flex items-center space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={copyToClipboard}
                          className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                          title="Copy prompt"
                        >
                          <Copy className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={downloadPrompt}
                          className="p-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                          title="Download prompt"
                        >
                          <Download className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                      <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap font-mono text-sm leading-relaxed">
                        {generatedPrompt}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Current Session History */}
                {currentSession.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-8"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                      <History className="w-5 h-5" />
                      <span>Current Session</span>
                    </h3>
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {currentSession.map((prompt, index) => (
                        <motion.div
                          key={prompt.id}
                          whileHover={{ scale: 1.02 }}
                          className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 cursor-pointer"
                          onClick={() => loadPromptFromHistory(prompt)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-900 dark:text-white text-sm">
                              Prompt #{index + 1}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {new Date(prompt.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                            {prompt.input}
                          </p>
                        </motion.div>
                      ))}
                    </div>
          </motion.div>
        )}
              </div>
            </div>
          </div>
        </React.Fragment>
      </div>
    </div>
  );
}
