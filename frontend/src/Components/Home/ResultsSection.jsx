import React from 'react';
import { Loader2, CheckCircle2, XCircle, Lightbulb, FileEdit } from 'lucide-react';
import { ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';

// Subcomponent for Result Cards
function ResultCard({ title, icon, items, type }) {
  const colorMap = {
    success: "bg-emerald-50 text-emerald-700 border-emerald-100",
    danger: "bg-rose-50 text-rose-700 border-rose-100",
    warning: "bg-amber-50 text-amber-700 border-amber-100",
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100 flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
          {icon}
        </div>
        <h3 className="text-lg font-bold text-slate-800">{title}</h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {items.length > 0 ? items.map((item, index) => (
          <span
            key={index}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${colorMap[type]}`}
          >
            {item}
          </span>
        )) : (
          <span className="text-slate-400 text-sm">No items found in this category.</span>
        )}
      </div>
    </div>
  );
}

// Main Component
const ResultsSection = ({ loading, atsScore, matchedSkills, missingSkills, suggestions, summary }) => {

  // Prepare data for the Radial Chart
  const chartData = [{ value: atsScore || 0 }];

  return (
    <>
      {/* Results Section */}
      {loading ? (
        <div className="text-center py-24">
          <Loader2 className="animate-spin mx-auto text-indigo-600 mb-4" size={48} />
          <p className="text-xl font-medium text-slate-600">AI is reading your resume...</p>
          <p className="text-slate-400">This may take a few seconds</p>
        </div>
      ) : (
        atsScore !== null && (
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Score Card */}
            <div className="lg:row-span-1 bg-white rounded-3xl p-6 shadow-lg border border-slate-100 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -translate-y-1/2 translate-x-1/2 z-0" />

              <h3 className="text-lg font-semibold text-slate-500 mb-4 z-10">ATS Score</h3>

              <div className="relative w-48 h-48 z-10">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart
                    innerRadius="80%"
                    outerRadius="100%"
                    data={chartData}
                    startAngle={90}
                    endAngle={-270}
                  >
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#4f46e5" />
                        <stop offset="100%" stopColor="#a855f7" />
                      </linearGradient>
                    </defs>
                    <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                    <RadialBar
                      background={{ fill: "#f1f5f9" }}
                      dataKey="value"
                      cornerRadius={50}
                    />
                  </RadialBarChart>
                </ResponsiveContainer>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-extrabold text-slate-800">{atsScore}</span>
                  <span className="text-sm text-slate-400 font-medium">out of 100</span>
                </div>
              </div>

              <p className="mt-6 text-center text-slate-500 text-sm px-4 z-10">
                {atsScore >= 80 ? "Excellent! Your resume is well-optimized." :
                  atsScore >= 60 ? "Good job, but there's room for improvement." :
                    "Needs work. Check the suggestions below."}
              </p>
            </div>

            {/* Details Cards */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">

              <ResultCard
                title="Matched Skills"
                icon={<CheckCircle2 className="text-emerald-500" />}
                items={matchedSkills}
                type="success"
              />

              <ResultCard
                title="Missing Keywords"
                icon={<XCircle className="text-rose-500" />}
                items={missingSkills}
                type="danger"
              />

              <ResultCard
                title="Improvement Tips"
                icon={<Lightbulb className="text-amber-500" />}
                items={suggestions}
                type="warning"
              />

              <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100 md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <FileEdit size={20} className="text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">Rewritten Summary</h3>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                    {summary || "No summary generated."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default ResultsSection;