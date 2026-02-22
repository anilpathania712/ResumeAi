import { useState, lazy, Suspense, Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import CreatableSelect from "react-select/creatable";
import { useRef } from "react";

// Import Icons
import {
  UploadCloud,
  FileText,
  Loader2
} from "lucide-react";

// Import Components
import Navbar from "./Components/Navbar";
import Header from "./Components/Home/Header";
import ResultsSection from "./Components/Home/ResultsSection";

// Lazy-loaded route components (code splitting)
const Features = lazy(() => import("./Components/Features"));
const About = lazy(() => import("./Components/About"));

// API base URL from environment variable
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// --- Error Boundary ---
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="text-center p-8 max-w-md">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Something went wrong</h2>
            <p className="text-slate-500 mb-6">An unexpected error occurred. Please try refreshing the page.</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// --- Loading Fallback ---
function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Loader2 className="animate-spin text-indigo-600" size={36} />
    </div>
  );
}

// --- Home Page Component (The Analyzer) ---
function Home() {
  const resultsRef = useRef(null);
  const [file, setFile] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(false);

  const [atsScore, setAtsScore] = useState(null);
  const [matchedSkills, setMatchedSkills] = useState([]);
  const [missingSkills, setMissingSkills] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [summary, setSummary] = useState("");

  const parseResponse = (text) => {
    const scoreMatch = text.match(/ATS Score:\s*(\d+)/i);
    const score = scoreMatch ? parseInt(scoreMatch[1]) : null;

    const extractList = (section) => {
      const regex = new RegExp(`${section}:[\\s\\S]*?(?=\\n\\n|$)`, "i");
      const match = text.match(regex);
      if (!match) return [];
      return match[0]
        .split("\n")
        .slice(1)
        .map((item) => item.replace("-", "").trim())
        .filter((item) => item);
    };

    const summaryMatch = text.match(
      /Rewritten Professional Summary:\s*([\s\S]*)/i
    );

    setAtsScore(score);
    setMatchedSkills(extractList("Matched Skills"));
    setMissingSkills(extractList("Missing Skills"));
    setSuggestions(extractList("Improvement Suggestions"));
    setSummary(summaryMatch ? summaryMatch[1].trim() : "");
  };

  const handleSubmit = async () => {
    if (!file) return alert("Please upload a resume first");
    if (!role) return alert("Please select a target role");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("role", role.label);

    try {
      setLoading(true);
      setAtsScore(null);

      const res = await axios.post(
        `${API_URL}/analyze/`,
        formData
      );

      parseResponse(res.data.analysis);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (error) {
      console.error(error);
      alert("Error analyzing resume");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-6">

        {/* Header */}
        <div className=" bg-slate-20 py-4 px-2">
          <Header />
        </div>

        {/* Input Section */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl p-8 shadow-xl transition-all duration-300 hover:shadow-2xl">

            {/* File Upload Area */}
            <label className="group cursor-pointer block mb-6">
              <div className={`relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-2xl transition-colors duration-200 ${file ? 'border-indigo-400 bg-indigo-50' : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50'}`}>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {file ? (
                  <div className="flex flex-col items-center text-indigo-600">
                    <FileText size={40} strokeWidth={1.5} className="mb-2" />
                    <p className="font-semibold text-lg">{file.name}</p>
                    <p className="text-sm text-slate-500 mt-1">Click to change file</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-slate-400 group-hover:text-indigo-500">
                    <UploadCloud size={40} strokeWidth={1.5} className="mb-2" />
                    <p className="font-semibold text-slate-600">Drop your Resume here</p>
                    <p className="text-sm">PDF format only (Max 5MB)</p>
                  </div>
                )}
              </div>
            </label>

            {/* Role Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Target Role
              </label>

              <CreatableSelect
                value={role}
                onChange={(selected) => setRole(selected)}
                options={[
                  { value: "frontend", label: "Frontend Developer" },
                  { value: "backend", label: "Backend Developer" },
                  { value: "fullstack", label: "Full Stack Developer" },
                  { value: "data", label: "Data Analyst" },
                  { value: "pm", label: "Product Manager" },
                  { value: "devops", label: "DevOps Engineer" },
                ]}
                placeholder="Search or type a role..."
                isClearable
                className="text-sm"
                styles={{
                  control: (base, state) => ({
                    ...base,
                    padding: "8px",
                    borderRadius: "12px",
                    backgroundColor: "#f1f5f9",
                    borderColor: state.isFocused ? "#6366f1" : "transparent",
                    boxShadow: state.isFocused ? "0 0 0 2px #e0e7ff" : "none",
                    "&:hover": { borderColor: "#6366f1" },
                  }),
                  menu: (base) => ({
                    ...base,
                    borderRadius: "12px",
                    overflow: "hidden",
                  }),
                }}
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading || !file}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Analyzing...
                </>
              ) : (
                "Analyze Resume"
              )}
            </button>
          </div>
        </div>

        {/* Results Section */}
        {(loading || atsScore !== null) && (
          <div ref={resultsRef}>
            <ResultsSection
              loading={loading}
              atsScore={atsScore}
              matchedSkills={matchedSkills}
              missingSkills={missingSkills}
              suggestions={suggestions}
              summary={summary}
            />
          </div>
        )}
      </div>
    </>
  );
}

// --- Main App Component (Router Setup) ---
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
        <Navbar />
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/features" element={<Features />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </div>
    </Router>
  );
}

export default App;