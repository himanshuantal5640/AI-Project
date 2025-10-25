import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Upload, 
  FileText, 
  Download, 
  Star, 
  Target, 
  TrendingUp, 
  CheckCircle, 
  AlertCircle,
  FileCheck,
  Users,
  Award,
  Briefcase,
  GraduationCap,
  Sparkles,
  ThumbsUp,
  ThumbsDown
} from "lucide-react";

export default function ResumeMatcher() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");
  const fileInputRef = useRef(null);

  const analysisPrompts = {
    matchAnalysis: "Analyze the provided resume against the given job description. Calculate a match score (0-100%) and identify key strengths, areas for improvement, relevant keywords found, and crucial missing keywords. Provide actionable suggestions to optimize the resume for this specific job. Your output should be structured to fill the 'analysisResult' state object.",
    strengths: "Based on the resume and job description, identify the top 3-5 strengths of the candidate. Focus on quantifiable achievements and relevant skills. Format as a bulleted list.",
    improvements: "Suggest 3-5 specific areas where the resume can be improved to better match the job description. Focus on gaps in skills, experience, or presentation. Format as a bulleted list.",
    keywordsFound: "Extract all relevant keywords from the resume that are present in the job description. Provide a list of these keywords.",
    missingKeywords: "Identify any critical keywords from the job description that are conspicuously absent or underrepresented in the resume. Provide a list of these missing keywords."
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setResumeFile(file);
      setActiveTab("analysis");
    }
  };

  const handleAnalyze = async () => {
    if (!resumeFile || !jobDescription.trim()) return;
    
    setLoading(true);

    // In a real application, you would send resumeFile, jobDescription, and analysisPrompts to your AI backend
    // For now, we'll simulate analysis using the prompts
    console.log("Simulating analysis with prompts:", analysisPrompts);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setAnalysisResult({
      matchScore: Math.floor(Math.random() * 30) + 70, // 70-100%
      strengths: [
        "Strong technical skills in React and JavaScript",
        "Excellent problem-solving abilities",
        "Good communication skills",
        "Relevant project experience"
      ],
      improvements: [
        "Add more specific achievements with metrics",
        "Include relevant certifications",
        "Highlight leadership experience",
        "Add industry-specific keywords"
      ],
      keywords: ["React", "JavaScript", "Node.js", "API", "Database", "Agile"],
      missingKeywords: ["Docker", "Kubernetes", "AWS", "Microservices"],
      suggestions: [
        "Add quantifiable achievements to your experience",
        "Include relevant certifications and courses",
        "Highlight any leadership or team collaboration experience",
        "Use industry-standard terminology"
      ]
    });
    
    setLoading(false);
    setActiveTab("results");
  };

  const tabs = [
    { id: "upload", label: "Upload Resume", icon: Upload },
    { id: "analysis", label: "Job Description", icon: FileText },
    { id: "results", label: "Analysis Results", icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
    <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Resume Matcher
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Get AI-powered analysis of your resume against job descriptions. 
            Improve your chances of landing your dream job!
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Steps */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Analysis Steps
              </h3>
              
              <div className="space-y-4">
                {tabs.map((tab, index) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  const isCompleted = (tab.id === "upload" && resumeFile) || 
                                    (tab.id === "analysis" && jobDescription.trim()) ||
                                    (tab.id === "results" && analysisResult);
                  
                  return (
                    <motion.div
                      key={tab.id}
                      whileHover={{ scale: 1.02 }}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                        isActive 
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
                          : isCompleted
                          ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                          : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                      }`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          isActive 
                            ? "bg-blue-500 text-white" 
                            : isCompleted
                            ? "bg-green-500 text-white"
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
                            isActive ? "text-blue-700 dark:text-blue-300" : 
                            isCompleted ? "text-green-700 dark:text-green-300" : 
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
          <div className="lg:col-span-2">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
            >
              <AnimatePresence mode="wait">
                {/* Upload Resume Tab */}
                {activeTab === "upload" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-center"
                  >
                    <div className="mb-8">
                      <div className="w-24 h-24 mx-auto mb-4 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                        <Upload className="w-12 h-12 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                        Upload Your Resume
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Upload your resume in PDF, DOC, or DOCX format
                      </p>
                    </div>

                    <div
                      className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 hover:border-blue-500 dark:hover:border-blue-400 transition-colors cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <FileText className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                      <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        PDF, DOC, DOCX up to 10MB
                      </p>
                    </div>

                    {resumeFile && (
          <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"
                      >
                        <div className="flex items-center space-x-3">
                          <FileCheck className="w-5 h-5 text-green-600 dark:text-green-400" />
                          <span className="text-green-700 dark:text-green-300 font-medium">
                            {resumeFile.name} uploaded successfully
                          </span>
            </div>
          </motion.div>
        )}
                  </motion.div>
                )}

                {/* Job Description Tab */}
                {activeTab === "analysis" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div className="mb-6">
                      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                        Job Description
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Paste the job description you want to match against
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-xl font-bold text-gray-900 dark:text-white mb-3">
                          Job Description
                        </label>
                        <textarea
                          value={jobDescription}
                          onChange={(e) => setJobDescription(e.target.value)}
                          placeholder="Paste the job description here, including responsibilities, requirements, and desired qualifications..."
                          rows={10}
                          className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent resize-y shadow-inner"
                        />
            </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleAnalyze}
                        disabled={!resumeFile || !jobDescription.trim() || loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <div className="flex items-center justify-center space-x-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Analyzing...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center space-x-2">
                            <Sparkles className="w-5 h-5" />
                            <span>Analyze Match</span>
                          </div>
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* Results Tab */}
                {activeTab === "results" && analysisResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                        Analysis Results
                      </h3>
                      
                      {/* Match Score */}
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white transform hover:scale-105 transition-transform duration-300 ease-in-out">
                        <div className="text-6xl font-extrabold mb-2">
                          {analysisResult.matchScore}%
                        </div>
                        <p className="text-xl font-medium">Match Score</p>
                        <div className="w-full bg-white/30 rounded-full h-3 mt-4">
                          <div 
                            className="bg-white rounded-full h-3 transition-all duration-1000 ease-out"
                            style={{ width: `${analysisResult.matchScore}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Strengths */}
                      <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800 shadow-lg">
                        <div className="flex items-center space-x-3 mb-4">
                          <CheckCircle className="w-7 h-7 text-green-600 dark:text-green-400 flex-shrink-0" />
                          <h4 className="text-2xl font-bold text-green-800 dark:text-green-200">Strengths</h4>
                        </div>
                        <ul className="space-y-3">
                          {analysisResult.strengths.map((strength, index) => (
                            <li key={index} className="flex items-start space-x-3 text-green-700 dark:text-green-300">
                              <ThumbsUp className="w-5 h-5 mt-0.5 flex-shrink-0 text-green-500" />
                              <span className="text-base leading-relaxed">{strength}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Improvements */}
                      <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 border border-orange-200 dark:border-orange-800 shadow-lg">
                        <div className="flex items-center space-x-3 mb-4">
                          <AlertCircle className="w-7 h-7 text-orange-600 dark:text-orange-400 flex-shrink-0" />
                          <h4 className="text-2xl font-bold text-orange-800 dark:text-orange-200">Areas for Improvement</h4>
                        </div>
                        <ul className="space-y-3">
                          {analysisResult.improvements.map((improvement, index) => (
                            <li key={index} className="flex items-start space-x-3 text-orange-700 dark:text-orange-300">
                              <ThumbsDown className="w-5 h-5 mt-0.5 flex-shrink-0 text-orange-500" />
                              <span className="text-base leading-relaxed">{improvement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Keywords Analysis */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800 shadow-lg">
                        <div className="flex items-center space-x-3 mb-4">
                          <Target className="w-7 h-7 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                          <h4 className="text-2xl font-bold text-blue-800 dark:text-blue-200">Keywords Found</h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {analysisResult.keywords.map((keyword, index) => (
                            <span key={index} className="px-4 py-2 bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full text-base font-medium hover:bg-blue-300 dark:hover:bg-blue-700 transition-colors cursor-help">
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800 shadow-lg">
                        <div className="flex items-center space-x-3 mb-4">
                          <AlertCircle className="w-7 h-7 text-red-600 dark:text-red-400 flex-shrink-0" />
                          <h4 className="text-2xl font-bold text-red-800 dark:text-red-200">Missing Keywords</h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {analysisResult.missingKeywords.length > 0 ? (
                            analysisResult.missingKeywords.map((keyword, index) => (
                              <span key={index} className="px-4 py-2 bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200 rounded-full text-base font-medium hover:bg-red-300 dark:hover:bg-red-700 transition-colors cursor-help">
                                {keyword}
                              </span>
                            ))
                          ) : (
                            <p className="text-red-700 dark:text-red-300">No critical missing keywords! Excellent!</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Suggestions */}
                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800 shadow-lg">
                      <h4 className="text-2xl font-bold text-purple-800 dark:text-purple-200 mb-4">Recommendations</h4>
                      <ul className="space-y-4">
                        {analysisResult.suggestions.map((suggestion, index) => (
                          <li key={index} className="flex items-start space-x-3 text-purple-700 dark:text-purple-300">
                            <Award className="w-6 h-6 mt-0.5 flex-shrink-0 text-purple-500" />
                            <span className="text-base leading-relaxed">{suggestion}</span>
                          </li>
                        ))}
                      </ul>
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
                        onClick={() => {
                          setResumeFile(null);
                          setJobDescription("");
                          setAnalysisResult(null);
                          setActiveTab("upload");
                        }}
                        className="flex-1 bg-accent-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <div className="flex items-center justify-center space-x-2">
                          <Upload className="w-5 h-5" />
                          <span>Analyze Another</span>
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