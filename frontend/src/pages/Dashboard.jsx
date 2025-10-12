import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, Code, BookOpen, Clock, BarChart } from "lucide-react"; // Added Clock and BarChart icons

export default function Dashboard() {
  const features = [
    {
      title: "Resume Matcher",
      description: "Upload resumes & JDs, get match scores & missing keywords.",
      link: "/resumematcher",
      icon: FileText,
      color: "from-primary-500 to-primary-700",
    },
    {
      title: "Code Reviewer",
      description: "Paste/upload code, detect bugs & optimization tips.",
      link: "/codereviewer",
      icon: Code,
      color: "from-secondary-500 to-secondary-700",
    },
    {
      title: "Learning Assistant",
      description: "Chatbot tutor, summarize notes & generate quizzes.",
      link: "/learningassistant",
      icon: BookOpen,
      color: "from-accent-500 to-accent-700",
    },
  ];

  // Placeholder data for Activity Feed
  const activityFeed = [
    { id: 1, type: "Resume Match", description: "Matched your resume with 'Senior Software Engineer' job.", time: "2 hours ago" },
    { id: 2, type: "Code Review", description: "Received feedback for 'feature-branch' code.", time: "Yesterday" },
    { id: 3, type: "Learning Assistant", description: "Asked a question about React Hooks.", time: "3 days ago" },
  ];

  // Placeholder data for Usage Statistics
  const usageStats = [
    { id: 1, tool: "Resume Matcher", count: 12, color: "primary-500" },
    { id: 2, tool: "Code Reviewer", count: 8, color: "secondary-500" },
    { id: 3, tool: "Learning Assistant", count: 25, color: "accent-500" },
    { id: 4, tool: "Prompt Generator", count: 5, color: "blue-500" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-6xl mx-auto p-6 sm:p-8"
    >
      <h1 className="text-4xl font-bold text-primary-700 dark:text-primary-200 mb-8 text-center">
        Your Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {features.map((f, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9, boxShadow: "0 0px 0px 0px rgba(0, 0, 0, 0)" }}
            animate={{ opacity: 1, scale: 1, boxShadow: "0 20px 40px 0px rgba(0, 0, 0, 0.3)" }}
            transition={{
              duration: 0.5,
              delay: idx * 0.1,
              ease: "easeOut",
              boxShadow: { duration: 0.5, ease: "easeOut" },
              scale: { duration: 0.5, ease: "easeOut" },
            }}
          >
            <Link
              to={f.link}
              className={`relative flex flex-col items-center justify-center p-8 rounded-2xl shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl
                         bg-gradient-to-br ${f.color} text-white overflow-hidden`}
            >
              {/* Background gradient overlay */}
              <div className="absolute inset-0 opacity-20 dark:opacity-40" style={{ backgroundImage: `radial-gradient(circle at top left, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)` }}></div>
              <div className="relative z-10 text-6xl mb-4">
                <f.icon size={64} className="text-white" />
              </div>
              <h2 className="relative z-10 text-2xl font-bold mb-2 text-white">{f.title}</h2>
              <p className="relative z-10 text-center text-gray-100 opacity-90">{f.description}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Activity Feed and Usage Statistics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Activity Feed */}
        <motion.div
          initial={{ opacity: 0, x: -20, boxShadow: "0 0px 0px 0px rgba(0, 0, 0, 0)" }}
          animate={{ opacity: 1, x: 0, boxShadow: "0 20px 40px 0px rgba(0, 0, 0, 0.3)" }}
          transition={{
            duration: 0.6,
            delay: 0.4,
            ease: "easeOut",
            boxShadow: { duration: 0.6, ease: "easeOut" },
          }}
          className="bg-white dark:bg-gray-800 shadow-xl rounded-xl border border-gray-100 dark:border-gray-700 p-6"
        >
          <h2 className="text-2xl font-bold text-primary-700 dark:text-primary-200 mb-6 flex items-center">
            <Clock className="w-6 h-6 mr-3 text-secondary-500" /> Recent Activity
          </h2>
          <div className="space-y-4">
            {activityFeed.map((activity) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-100">{activity.type}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{activity.description}</p>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Usage Statistics */}
        <motion.div
          initial={{ opacity: 0, x: 20, boxShadow: "0 0px 0px 0px rgba(0, 0, 0, 0)" }}
          animate={{ opacity: 1, x: 0, boxShadow: "0 20px 40px 0px rgba(0, 0, 0, 0.3)" }}
          transition={{
            duration: 0.6,
            delay: 0.6,
            ease: "easeOut",
            boxShadow: { duration: 0.6, ease: "easeOut" },
          }}
          className="bg-white dark:bg-gray-800 shadow-xl rounded-xl border border-gray-100 dark:border-gray-700 p-6"
        >
          <h2 className="text-2xl font-bold text-primary-700 dark:text-primary-200 mb-6 flex items-center">
            <BarChart className="w-6 h-6 mr-3 text-accent-500" /> Usage Statistics
          </h2>
          <div className="space-y-4">
            {usageStats.map((stat) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex items-center justify-between"
              >
                <span className="font-medium text-gray-800 dark:text-gray-100">{stat.tool}</span>
                <div className="flex items-center space-x-2 w-1/2">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full bg-${stat.color}`}
                      style={{ width: `${(stat.count / Math.max(...usageStats.map(s => s.count))) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{stat.count}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
