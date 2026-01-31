import React, { useEffect, useState } from "react";

function About() {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    fetch("https://portfulio-backend-1.onrender.com/api/about")
      .then((res) => res.json())
      .then((data) => setAboutData(data))
      .catch((err) => console.error(err));
  }, []);

  if (!aboutData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto"></div>
          <p className="mt-6 text-blue-100 text-lg font-light">Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block p-3 rounded-2xl bg-blue-800/20 backdrop-blur-sm border border-blue-700/30 mb-8">
            <span className="text-blue-300 text-sm font-semibold tracking-wider">PROFESSIONAL PROFILE</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            {aboutData.title}
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed font-light">
            Exploring professional experiences and technical expertise
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-slate-800/60 backdrop-blur-lg rounded-3xl shadow-2xl border border-slate-700/50 p-6 sm:p-8 lg:p-12">
          {/* Introduction */}
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-full mr-4"></div>
              <h2 className="text-3xl font-bold text-white">Introduction</h2>
            </div>
            <div className="space-y-6 text-lg text-blue-100 leading-relaxed">
              <p className="bg-slate-700/40 p-6 rounded-2xl border-l-4 border-blue-500 shadow-lg">
                {aboutData.intro}
              </p>
              <p className="bg-slate-700/40 p-6 rounded-2xl border-l-4 border-cyan-500 shadow-lg">
                {aboutData.details}
              </p>
            </div>
          </div>

          {/* Work Experience */}
          {aboutData.experiences?.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center mb-8">
                <div className="w-2 h-8 bg-gradient-to-b from-indigo-500 to-purple-400 rounded-full mr-4"></div>
                <h2 className="text-3xl font-bold text-white">Work Experience</h2>
              </div>
              <div className="grid gap-6 lg:grid-cols-2">
                {aboutData.experiences.map((exp, i) => (
                  <div
                    key={i}
                    className="group p-8 bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl border border-slate-600 shadow-lg hover:shadow-xl hover:border-blue-500/30 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="flex flex-col mb-4">
                      <h3 className="text-2xl font-bold text-white mb-2">{exp.role}</h3>
                      <span className="text-lg font-semibold text-blue-300">{exp.company}</span>
                    </div>
                    <span className="inline-block bg-blue-900/40 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
                      {exp.period}
                    </span>
                    <p className="text-blue-100 leading-relaxed border-t border-slate-600 pt-4">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills Section */}
          <div className="mb-12">
            <div className="flex items-center mb-8">
              <div className="w-2 h-8 bg-gradient-to-b from-green-500 to-teal-400 rounded-full mr-4"></div>
              <h2 className="text-3xl font-bold text-white">Technical Skills</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Frontend Skills */}
              <div className="bg-slate-700/40 p-8 rounded-2xl border border-slate-600 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Frontend Development</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {aboutData.frontendSkills.map((skill, i) => (
                    <div key={i} className="flex items-center p-3 bg-slate-800/60 rounded-xl shadow-sm hover:bg-slate-800 transition-all duration-200">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 animate-pulse"></div>
                      <span className="text-blue-300 font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Backend Skills */}
              <div className="bg-slate-700/40 p-8 rounded-2xl border border-slate-600 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-teal-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Backend Development</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {aboutData.backendSkills.map((skill, i) => (
                    <div key={i} className="flex items-center p-3 bg-slate-800/60 rounded-xl shadow-sm hover:bg-slate-800 transition-all duration-200">
                      <div className="w-2 h-2 bg-teal-400 rounded-full mr-3 animate-pulse"></div>
                      <span className="text-green-300 font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-blue-800/40 to-cyan-800/40 p-8 rounded-3xl shadow-2xl text-white border border-slate-700/50">
            <h3 className="text-2xl font-bold mb-4">Always Learning & Growing 📚</h3>
            <p className="text-lg opacity-90">
              Continuously developing new skills and exploring challenging projects
            </p>
            <div className="mt-6 flex justify-center space-x-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;