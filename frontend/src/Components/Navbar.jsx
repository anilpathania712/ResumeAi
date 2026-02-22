import { useState } from "react";
import { Link } from "react-router-dom"; // Import Link
import { FileText, Menu, X } from "lucide-react";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="w-full bg-white/70 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo & Brand */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg shadow-md">
                            <FileText size={20} className="text-white" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            ResumeAI
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-12">
                        <Link to="/" className="text-slate-600 hover:text-indigo-600 transition-colors duration-200 font-medium">
                            Home
                        </Link>
                        <Link to="/features" className="text-slate-600 hover:text-indigo-600 transition-colors duration-200 font-medium">
                            Features
                        </Link>
                        <Link to="/about" className="text-slate-600 hover:text-indigo-600 transition-colors duration-200 font-medium">
                            About
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-lg text-slate-600 
             hover:text-indigo-600 hover:bg-indigo-50 
             transition-all duration-300 ease-in-out"
                    >
                        <div className="transition-transform duration-300">
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full 
                  bg-white border-t border-slate-200 
                  shadow-lg animate-slideDown">
                    <div className="px-6 py-4 space-y-3">

                        <Link
                            to="/"
                            onClick={() => setIsOpen(false)}
                            className="block px-4 py-3 rounded-xl 
                   text-slate-700 font-medium 
                   hover:bg-indigo-50 hover:text-indigo-600 
                   transition-all duration-300"
                        >
                            Home
                        </Link>

                        <Link
                            to="/features"
                            onClick={() => setIsOpen(false)}
                            className="block px-4 py-3 rounded-xl 
                   text-slate-700 font-medium 
                   hover:bg-indigo-50 hover:text-indigo-600 
                   transition-all duration-300"
                        >
                            Features
                        </Link>

                        <Link
                            to="/about"
                            onClick={() => setIsOpen(false)}
                            className="block px-4 py-3 rounded-xl 
                   text-slate-700 font-medium 
                   hover:bg-indigo-50 hover:text-indigo-600 
                   transition-all duration-300"
                        >
                            About
                        </Link>

                    </div>
                </div>
            )}
        </nav>
    );
}


export default Navbar;