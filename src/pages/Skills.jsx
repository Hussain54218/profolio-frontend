import React, { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";

function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://portfulio-backend-1.onrender.com/api/skills")
      .then((res) => res.json())
      .then((data) => {
        setSkills(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const getIcon = (iconName) => {
    return FaIcons[iconName] || SiIcons[iconName] || FaIcons.FaQuestion;
  };

  const getIconColor = (skillName) => {
    const colorMap = {
      react: "text-blue-500",
      javascript: "text-yellow-500",
      typescript: "text-blue-600",
      html: "text-orange-500",
      css: "text-blue-400",
      sass: "text-pink-500",
      bootstrap: "text-purple-500",
      tailwind: "text-teal-400",
      vue: "text-green-500",
      angular: "text-red-600",

      node: "text-green-600",
      python: "text-blue-800",
      django: "text-green-700",
      flask: "text-gray-500",
      php: "text-purple-600",
      laravel: "text-red-500",
      java: "text-red-700",
      spring: "text-green-600",
      express: "text-gray-600",

      mongodb: "text-green-500",
      mysql: "text-blue-600",
      postgresql: "text-blue-700",
      sqlite: "text-blue-400",
      redis: "text-red-600",

      git: "text-orange-600",
      docker: "text-blue-500",
      aws: "text-orange-400",
      figma: "text-purple-500",
      photoshop: "text-blue-400",
      linux: "text-yellow-700",
    };

    const lowerCaseName = skillName.toLowerCase();
    for (const [key, color] of Object.entries(colorMap)) {
      if (lowerCaseName.includes(key)) {
        return color;
      }
    }
    return "text-indigo-500";
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-16 px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-500/10 to-transparent"></div>
      <div className="absolute top-1/4 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 -right-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block p-2 mb-6 rounded-xl bg-blue-800/20 border border-blue-700/30">
            <span className="text-blue-300 text-sm font-semibold tracking-wider">
              TECHNICAL EXPERTISE
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            My Skills
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto">
            A collection of technologies and expertise I use in my projects
          </p>
        </div>

        {/* Download CV */}
        <div className="text-center mb-16">
          <a
            href="https://portfulio-backend-1.onrender.com/api/skills/download-cv"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1"
          >
            Download Resume
          </a>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-6"></div>
            <p className="text-blue-200 text-lg">Loading skills...</p>
          </div>
        )}

        {/* Skills Grid */}
        {!loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {skills.map((skill, index) => {
              const IconComponent = getIcon(skill.icon);
              const iconColor = getIconColor(skill.name);

              return (
                <div
                  key={index}
                  className="group relative flex flex-col items-center justify-center p-6 bg-slate-800/60 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-700/50"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300"></div>

                  <div className="relative z-10 p-3 mb-4 rounded-xl bg-slate-700/40">
                    <IconComponent className={`w-8 h-8 ${iconColor}`} />
                  </div>

                  <span className="relative z-10 text-sm font-medium text-blue-100 text-center">
                    {skill.name}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-16">
          <p className="text-blue-200/80">
            Continuously expanding my knowledge and skills
          </p>
        </div>
      </div>
    </section>
  );
}

export default Skills;
