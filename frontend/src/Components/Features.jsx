import { 
  Zap, 
  ShieldCheck, 
  BarChart3, 
  FileSearch, 
  Sparkles, 
  Lock 
} from "lucide-react";

const features = [
  {
    icon: <Zap className="text-indigo-600" size={28} />,
    title: "Instant Analysis",
    description: "Get detailed insights into your resume's performance in under 10 seconds. No waiting, no queues.",
  },
  {
    icon: <ShieldCheck className="text-emerald-600" size={28} />,
    title: "ATS Compatibility",
    description: "Ensure your resume passes Applicant Tracking Systems filters used by 99% of Fortune 500 companies.",
  },
  {
    icon: <BarChart3 className="text-purple-600" size={28} />,
    title: "Scoring Engine",
    description: "Our AI evaluates content, formatting, and keyword density to give you a precise employability score.",
  },
  {
    icon: <FileSearch className="text-amber-600" size={28} />,
    title: "Keyword Gap Analysis",
    description: "Automatically detects missing skills and keywords critical for your target job role.",
  },
  {
    icon: <Sparkles className="text-pink-600" size={28} />,
    title: "AI Re-writer",
    description: "Transform weak bullet points into powerful achievements with our one-click enhancement tool.",
  },
  {
    icon: <Lock className="text-slate-600" size={28} />,
    title: "Privacy First",
    description: "Your data is encrypted and never stored. Once the analysis is done, files are permanently deleted.",
  },
];

function Features() {
  return (
    <section className="relative py-10 overflow-hidden min-h-screen bg-slate-50">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-3">
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Supercharge Your Job Search
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
            Tools built for the modern job market. Stop guessing why you aren't getting interviews.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden"
            >
              {/* Hover Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                {/* Icon Container */}
                <div className="inline-flex items-center justify-center w-14 h-14 bg-slate-50 rounded-2xl mb-6 border border-slate-100 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;