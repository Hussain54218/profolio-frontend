import React, { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";

function Skills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetch("https://portfulio-backend-1.onrender.com/api/skills")
      .then((res) => res.json())
      .then((data) => setSkills(data))
      .catch((err) => console.error(err));
  }, []);

  const getIcon = (iconName) => {
    return FaIcons[iconName] || SiIcons[iconName] || FaIcons.FaQuestion;
  };

  // Function to determine appropriate color based on skill name
  const getIconColor = (skillName) => {
    const colorMap = {
      // Frontend technologies
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
      
      // Backend technologies
      node: "text-green-600",
      python: "text-blue-800",
      django: "text-green-700",
      flask: "text-gray-500",
      php: "text-purple-600",
      laravel: "text-red-500",
      java: "text-red-700",
      spring: "text-green-600",
      express: "text-gray-600",
      
      // Databases
      mongodb: "text-green-500",
      mysql: "text-blue-600",
      postgresql: "text-blue-700",
      sqlite: "text-blue-400",
      redis: "text-red-600",
      
      // Tools and others
      git: "text-orange-600",
      docker: "text-blue-500",
      aws: "text-orange-400",
      figma: "text-purple-500",
      photoshop: "text-blue-400",
      linux: "text-yellow-700",
    };

    // Search for skill name in colorMap (case insensitive)
    const lowerCaseName = skillName.toLowerCase();
    for (const [key, color] of Object.entries(colorMap)) {
      if (lowerCaseName.includes(key)) {
        return color;
      }
    }

    // Default color if no match found
    return "text-indigo-500";
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-16 px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-500/10 to-transparent"></div>
      <div className="absolute top-1/4 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 -right-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block p-2 mb-6 rounded-xl bg-blue-800/20 backdrop-blur-sm border border-blue-700/30">
            <span className="text-blue-300 text-sm font-semibold tracking-wider">TECHNICAL EXPERTISE</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            My Skills
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto">
            A collection of technologies and expertise I use in my projects
          </p>
        </div>

        {/* Download CV Button */}
        <div className="text-center mb-16">
          <a
            href="https://portfulio-backend-1.onrender.com/api/skills/download-cv"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Resume
          </a>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {skills.map((skill, index) => {
            const IconComponent = getIcon(skill.icon);
            const iconColor = getIconColor(skill.name);
            
            return (
              <div
                key={index}
                className="group relative flex flex-col items-center justify-center p-6 bg-slate-800/60 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-700/50"
              >
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300"></div>
                
                {/* Icon */}
                <div className="relative z-10 p-3 mb-4 rounded-xl bg-slate-700/40 group-hover:bg-slate-700/60 transition-colors duration-300">
                  <IconComponent className={`w-8 h-8 ${iconColor} transition-colors duration-300`} />
                </div>
                
                {/* Skill Name */}
                <span className="relative z-10 text-sm font-medium text-blue-100 group-hover:text-white transition-colors duration-300 text-center">
                  {skill.name}
                </span>
                
                {/* Hover Animation */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-16 transition-all duration-300 rounded-t-full"></div>
              </div>
            );
          })}
        </div>

        {/* Footer Section */}
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