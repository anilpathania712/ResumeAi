import React from "react";
import { Sparkles } from "lucide-react";

const Header = () => {
    return (
        <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Sparkles size={16} />
                <span>Powered by AI</span>
            </div>

            <h1 className="text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 pb-2 mb-4">
                Resume Intelligence
            </h1>

            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                Optimize your resume for Applicant Tracking Systems (ATS). Get instant
                feedback on skills, formatting, and content quality.
            </p>
        </div>
    );
};

export default Header;