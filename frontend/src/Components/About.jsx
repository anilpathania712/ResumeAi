import { Target, Users, Lightbulb, Heart, Github, Linkedin } from "lucide-react";

const teamMembers = [
  {
    name: "Alex Johnson",
    role: "Lead AI Engineer",
    // You can replace these with actual image URLs
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    social: { linkedin: "#", github: "#" }
  },
  {
    name: "Sarah Williams",
    role: "Product Designer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    social: { linkedin: "#", github: "#" }
  },
  {
    name: "Michael Chen",
    role: "Full Stack Developer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    social: { linkedin: "#", github: "#" }
  },
  {
    name: "Emily Davis",
    role: "Data Scientist",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    social: { linkedin: "#", github: "#" }
  },
];

const stats = [
  { value: "10K+", label: "Resumes Analyzed" },
  { value: "95%", label: "Accuracy Rate" },
  { value: "24/7", label: "AI Availability" },
  { value: "100%", label: "Free to Use" },
];

function About() {
  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* Hero Section */}
      <section className="relative py-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-3">
            About ResumeAI
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            Revolutionizing <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Job Applications</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-3xl mx-auto">
            We believe everyone deserves a fair shot at their dream job. Our mission is to bridge the gap between talented candidates and ATS algorithms.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <p className="text-4xl font-extrabold text-indigo-600">{stat.value}</p>
                <p className="text-slate-500 mt-1 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-100 rounded-2xl mb-6 border border-indigo-200">
                <Target className="text-indigo-600" size={28} />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Mission</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                In today's competitive job market, over 75% of resumes are rejected by Applicant Tracking Systems before a human ever sees them. This creates a barrier for talented individuals who might not be "SEO experts" for their own careers.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Our mission is to democratize the hiring process. By providing instant, actionable feedback, we empower job seekers to present their best selves and level the playing field.
              </p>
            </div>

            {/* Visual Element */}
            <div className="relative">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Team collaboration" 
                  className="rounded-2xl w-full object-cover h-64"
                />
                <div className="mt-6 flex gap-4">
                  <div className="flex-1 bg-indigo-50 p-4 rounded-xl">
                    <Lightbulb className="text-indigo-600 mb-2" size={20} />
                    <p className="text-sm font-medium text-slate-700">Innovation First</p>
                  </div>
                  <div className="flex-1 bg-purple-50 p-4 rounded-xl">
                    <Heart className="text-purple-600 mb-2" size={20} />
                    <p className="text-sm font-medium text-slate-700">User Focused</p>
                  </div>
                </div>
              </div>
              {/* Decorative blob */}
              <div className="absolute -z-10 -bottom-6 -right-6 w-64 h-64 bg-purple-100 rounded-full blur-2xl opacity-60" />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
            {/* Abstract shapes */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white opacity-10 rounded-full translate-y-1/2 -translate-x-1/2" />

            <h2 className="text-3xl font-bold text-white mb-4 relative z-10">
              Ready to Land Your Dream Job?
            </h2>
            <p className="text-indigo-100 mb-8 max-w-xl mx-auto relative z-10">
              Stop letting ATS bots reject your application. Start optimizing your resume today.
            </p>
            <a 
              href="/" 
              className="inline-block bg-white text-indigo-700 px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 relative z-10"
            >
              Analyze Your Resume Free
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

export default About;