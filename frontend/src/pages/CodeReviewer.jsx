import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code, 
  Upload, 
  FileText, 
  Download, 
  CheckCircle, 
  AlertTriangle, 
  Info,
  Bug,
  Shield,
  Zap,
  Star,
  GitBranch,
  Clock,
  User,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Eye,
  Settings,
  Sparkles
} from "lucide-react";

export default function CodeReviewer() {
  const [codeFile, setCodeFile] = useState(null);
  const [codeContent, setCodeContent] = useState("");
  const [reviewResult, setReviewResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");
  const [reviewType, setReviewType] = useState("comprehensive");
  const fileInputRef = useRef(null);

  const reviewTypes = [
    { id: "comprehensive", label: "Comprehensive", description: "Full code review with all checks", icon: Shield },
    { id: "security", label: "Security Focus", description: "Security vulnerabilities and best practices", icon: Bug },
    { id: "performance", label: "Performance", description: "Performance optimization suggestions", icon: Zap },
    { id: "style", label: "Code Style", description: "Code formatting and style guidelines", icon: Star }
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCodeFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setCodeContent(e.target.result);
      };
      reader.readAsText(file);
      setActiveTab("review");
    }
  };

  const handleReview = async () => {
    if (!codeContent.trim()) return;
    
    setLoading(true);
    
    // Simulate review process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setReviewResult({
      overallScore: Math.floor(Math.random() * 20) + 75, // 75-95
      issues: [
        {
          type: "error",
          severity: "high",
          line: 15,
          message: "Potential null pointer exception",
          suggestion: "Add null check before accessing object properties"
        },
        {
          type: "warning",
          severity: "medium",
          line: 23,
          message: "Unused variable detected",
          suggestion: "Remove unused variable or use it in your code"
        },
        {
          type: "info",
          severity: "low",
          line: 8,
          message: "Consider adding JSDoc comments",
          suggestion: "Add documentation for better code maintainability"
        }
      ],
      suggestions: [
        "Consider using const instead of let for immutable variables",
        "Add error handling for async operations",
        "Implement proper logging for debugging",
        "Consider breaking down large functions into smaller ones"
      ],
      metrics: {
        complexity: 8,
        maintainability: 85,
        testability: 78,
        readability: 92
      },
      summary: "Your code shows good structure and follows most best practices. There are a few areas for improvement, particularly around error handling and documentation."
    });
    
    setLoading(false);
    setActiveTab("results");
  };

  const tabs = [
    { id: "upload", label: "Upload Code", icon: Upload },
    { id: "review", label: "Review Settings", icon: Settings },
    { id: "results", label: "Review Results", icon: CheckCircle }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high": return "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800";
      case "medium": return "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800";
      case "low": return "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800";
      default: return "text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800";
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case "high": return AlertTriangle;
      case "medium": return Info;
      case "low": return Info;
      default: return Info;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
    <motion.div
          initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            AI Code Reviewer
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Get intelligent code analysis, security checks, performance insights, and improvement suggestions. 
            Make your code production-ready with AI-powered reviews!
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Panel - Steps */}
          <div className="lg:col-span-1">
      <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Review Process
              </h3>
              
              <div className="space-y-4">
                {tabs.map((tab, index) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  const isCompleted = (tab.id === "upload" && codeFile) || 
                                    (tab.id === "review" && codeContent.trim()) ||
                                    (tab.id === "results" && reviewResult);
                  
                  return (
                    <motion.div
                      key={tab.id}
                      whileHover={{ scale: 1.02 }}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                        isActive 
                          ? "border-green-500 bg-green-50 dark:bg-green-900/20" 
                          : isCompleted
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                          : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                      }`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          isActive 
                            ? "bg-green-500 text-white" 
                            : isCompleted
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                        }`}>
                          {isCompleted && !isActive ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            <Icon className="w-5 h-5" />
                          )}
                        </div>
          <div>
                          <p className={`font-medium ${
                            isActive ? "text-green-700 dark:text-green-300" : 
                            isCompleted ? "text-blue-700 dark:text-blue-300" : 
                            "text-gray-700 dark:text-gray-300"
                          }`}>
                            {tab.label}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Step {index + 1}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Right Panel - Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
            >
              <AnimatePresence mode="wait">
                {/* Upload Code Tab */}
                {activeTab === "upload" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-center"
                  >
                    <div className="mb-8">
                      <div className="w-24 h-24 mx-auto mb-4 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                        <Code className="w-12 h-12 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                        Upload Your Code
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Upload your code files for AI-powered review and analysis
                      </p>
                    </div>

                    <div
                      className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 hover:border-green-500 dark:hover:border-green-400 transition-colors cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
            <input
                        ref={fileInputRef}
                        type="file"
                        accept=".js,.jsx,.ts,.tsx,.py,.java,.cpp,.c,.cs,.php,.rb,.go,.rs"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <FileText className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                      <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        JS, TS, Python, Java, C++, C#, PHP, Ruby, Go, Rust files supported
                      </p>
                    </div>

                    {codeFile && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"
                      >
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                          <span className="text-green-700 dark:text-green-300 font-medium">
                            {codeFile.name} uploaded successfully
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {/* Review Settings Tab */}
                {activeTab === "review" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-8"
                  >
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                        Review Configuration
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Choose the type of review you want to perform
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {reviewTypes.map((type) => {
                        const Icon = type.icon;
                        const isSelected = reviewType === type.id;
                        
                        return (
                          <motion.div
                            key={type.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                              isSelected 
                                ? "border-green-500 bg-green-50 dark:bg-green-900/20" 
                                : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                            }`}
                            onClick={() => setReviewType(type.id)}
                          >
                            <div className="flex items-start space-x-4">
                              <div className={`p-3 rounded-lg ${
                                isSelected 
                                  ? "bg-green-500 text-white" 
                                  : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                              }`}>
                                <Icon className="w-6 h-6" />
                              </div>
                              <div className="flex-1">
                                <h4 className={`text-lg font-semibold mb-2 ${
                                  isSelected 
                                    ? "text-green-800 dark:text-green-200" 
                                    : "text-gray-800 dark:text-gray-200"
                                }`}>
                                  {type.label}
                                </h4>
                                <p className={`text-sm ${
                                  isSelected 
                                    ? "text-green-600 dark:text-green-400" 
                                    : "text-gray-600 dark:text-gray-400"
                                }`}>
                                  {type.description}
                                </p>
                              </div>
                              {isSelected && (
                                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Code Preview
                      </h4>
                      <div className="bg-gray-900 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto">
                        <pre className="text-green-400 text-sm">
                          <code>{codeContent.substring(0, 500)}{codeContent.length > 500 ? "..." : ""}</code>
                        </pre>
                      </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
                      onClick={handleReview}
                      disabled={!codeContent.trim() || loading}
                      className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Analyzing Code...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center space-x-2">
                          <Sparkles className="w-5 h-5" />
                          <span>Start Code Review</span>
                        </div>
                      )}
          </motion.button>
                  </motion.div>
                )}

                {/* Results Tab */}
                {activeTab === "results" && reviewResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-8"
                  >
                    {/* Overall Score */}
                    <div className="text-center">
                      <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-8 text-white mb-6">
                        <div className="text-6xl font-bold mb-2">
                          {reviewResult.overallScore}%
                        </div>
                        <p className="text-xl">Overall Code Quality</p>
                        <div className="w-full bg-white/20 rounded-full h-3 mt-4">
                          <div 
                            className="bg-white rounded-full h-3 transition-all duration-1000"
                            style={{ width: `${reviewResult.overallScore}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-center border border-blue-200 dark:border-blue-800">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {reviewResult.metrics.complexity}
                        </div>
                        <div className="text-sm text-blue-700 dark:text-blue-300">Complexity</div>
                      </div>
                      <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 text-center border border-green-200 dark:border-green-800">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {reviewResult.metrics.maintainability}%
                        </div>
                        <div className="text-sm text-green-700 dark:text-green-300">Maintainability</div>
                      </div>
                      <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 text-center border border-purple-200 dark:border-purple-800">
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                          {reviewResult.metrics.testability}%
                        </div>
                        <div className="text-sm text-purple-700 dark:text-purple-300">Testability</div>
                      </div>
                      <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 text-center border border-orange-200 dark:border-orange-800">
                        <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                          {reviewResult.metrics.readability}%
                        </div>
                        <div className="text-sm text-orange-700 dark:text-orange-300">Readability</div>
                      </div>
                    </div>

                    {/* Issues List */}
                    <div className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
                      <div className="p-6 border-b border-gray-200 dark:border-gray-600">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                          Issues Found ({reviewResult.issues.length})
                        </h4>
                      </div>
                      <div className="divide-y divide-gray-200 dark:divide-gray-600">
                        {reviewResult.issues.map((issue, index) => {
                          const SeverityIcon = getSeverityIcon(issue.severity);
                          return (
                            <div key={index} className="p-6">
                              <div className="flex items-start space-x-4">
                                <div className={`p-2 rounded-lg ${getSeverityColor(issue.severity)}`}>
                                  <SeverityIcon className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <span className="font-medium text-gray-900 dark:text-white">
                                      Line {issue.line}
                                    </span>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                      issue.severity === "high" ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300" :
                                      issue.severity === "medium" ? "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300" :
                                      "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
                                    }`}>
                                      {issue.severity}
                                    </span>
                                  </div>
                                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                                    {issue.message}
                                  </p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    <strong>Suggestion:</strong> {issue.suggestion}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Suggestions */}
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                      <h4 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-4">
                        General Suggestions
                      </h4>
                      <ul className="space-y-3">
                        {reviewResult.suggestions.map((suggestion, index) => (
                          <li key={index} className="flex items-start space-x-3 text-purple-700 dark:text-purple-300">
                            <Star className="w-5 h-5 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Summary */}
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Review Summary
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        {reviewResult.summary}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <div className="flex items-center justify-center space-x-2">
                          <Download className="w-5 h-5" />
                          <span>Download Report</span>
                        </div>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <div className="flex items-center justify-center space-x-2">
                          <Copy className="w-5 h-5" />
                          <span>Copy Report</span>
                        </div>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setCodeFile(null);
                          setCodeContent("");
                          setReviewResult(null);
                          setActiveTab("upload");
                        }}
                        className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <div className="flex items-center justify-center space-x-2">
                          <Upload className="w-5 h-5" />
                          <span>Review Another</span>
                        </div>
                      </motion.button>
                    </div>
      </motion.div>
                )}
              </AnimatePresence>
    </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}