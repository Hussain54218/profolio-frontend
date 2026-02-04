import React, { useContext, useState, useRef, useEffect } from "react";
import { ProjectContext } from "../context/ProjectContext";
import ProjectCard from "../components/ProjectCard";

function Projects() {
  const { projects, loading } = useContext(ProjectContext); // loading اضافه شد
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [visibleProjects, setVisibleProjects] = useState(3);
  const projectsSectionRef = useRef(null);

  // Filter projects based on category and search
  const filteredProjects = projects.filter(project => {
    const matchesCategory = activeFilter === "all" || project.category === activeFilter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (project.technologies && project.technologies.some(tech => 
                           tech.toLowerCase().includes(searchTerm.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  // Extract unique categories from projects
  const categories = ["all", ...new Set(projects.map(p => p.category).filter(Boolean))];

  // Function to show/hide projects
  const toggleProjectsVisibility = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setVisibleProjects(filteredProjects.length);
    } else {
      setVisibleProjects(3);
      // Scroll to projects section
      setTimeout(() => {
        if (projectsSectionRef.current) {
          projectsSectionRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  // When projects are filtered, adjust display state
  useEffect(() => {
    if (filteredProjects.length <= 3) {
      setVisibleProjects(filteredProjects.length);
      setIsExpanded(true);
    } else {
      setVisibleProjects(3);
      setIsExpanded(false);
    }
  }, [filteredProjects.length]);

  // اگر در حال لودینگ هستیم، اسکلت نمایش دهیم
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white overflow-hidden relative">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-500/10 to-transparent"></div>
        <div className="absolute top-1/4 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
        
        <section className="relative z-10 container mx-auto px-4 py-16">
          {/* Header Section Skeleton */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6 shadow-lg animate-pulse">
              <div className="h-10 w-10 bg-white/20 rounded"></div>
            </div>
            <div className="h-12 bg-white/10 rounded-xl w-64 mx-auto mb-6 animate-pulse"></div>
            <div className="h-6 bg-white/5 rounded-lg w-96 max-w-full mx-auto animate-pulse"></div>
          </div>

          {/* Filter and Search Section Skeleton */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 mb-12 border border-white/10 shadow-2xl">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Search Bar Skeleton */}
              <div className="relative flex-grow max-w-xl">
                <div className="h-14 bg-white/5 rounded-xl animate-pulse"></div>
              </div>
              
              {/* Category Filters Skeleton */}
              <div className="flex flex-wrap gap-3 justify-center">
                {[1, 2, 3, 4].map(i => (
                  <div 
                    key={i}
                    className="h-10 w-24 bg-white/5 rounded-xl animate-pulse"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Projects Grid Skeleton */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div 
                key={i}
                className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 shadow-xl animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <div className="h-48 bg-white/10 rounded-xl mb-6"></div>
                <div className="h-6 bg-white/10 rounded-lg w-3/4 mb-4"></div>
                <div className="h-4 bg-white/5 rounded-lg w-full mb-3"></div>
                <div className="h-4 bg-white/5 rounded-lg w-2/3 mb-6"></div>
                <div className="flex gap-2 mb-6">
                  <div className="h-6 bg-white/10 rounded-full w-16"></div>
                  <div className="h-6 bg-white/10 rounded-full w-20"></div>
                  <div className="h-6 bg-white/10 rounded-full w-14"></div>
                </div>
                <div className="flex gap-3">
                  <div className="h-10 bg-white/10 rounded-lg flex-1"></div>
                  <div className="h-10 bg-white/10 rounded-lg flex-1"></div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Collaboration CTA Skeleton */}
          <div className="mt-20 bg-gradient-to-r from-blue-600/30 to-purple-600/30 backdrop-blur-md rounded-2xl p-12 border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-400/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-400/10 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="h-10 bg-white/10 rounded-lg w-80 max-w-full mx-auto mb-6 animate-pulse"></div>
              <div className="h-5 bg-white/5 rounded-lg w-96 max-w-full mx-auto mb-8 animate-pulse"></div>
              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <div className="h-12 bg-white/10 rounded-xl w-48 animate-pulse"></div>
                <div className="h-12 bg-white/5 rounded-xl w-48 animate-pulse"></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white overflow-hidden relative">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-500/10 to-transparent"></div>
      <div className="absolute top-1/4 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 -right-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
      
      <section className="relative z-10 container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
            My Projects
          </h2>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto leading-relaxed">
            A curated collection of projects showcasing my skills and experiences
          </p>
        </div>

        {/* Filter and Search Section */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 mb-12 border border-white/10 shadow-2xl">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-grow max-w-xl">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-blue-200/70"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                    activeFilter === category
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                      : "bg-white/5 text-blue-200 hover:bg-white/10 border border-white/5 shadow-sm"
                  }`}
                >
                  {category === "all" ? "All Projects" : category}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Projects List */}
        <div ref={projectsSectionRef}>
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl">
              <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 mb-6">
                <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">No Projects Found</h3>
              <p className="text-blue-200/80">No projects match your search criteria.</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.slice(0, visibleProjects).map(project => (
                  <ProjectCard 
                    key={project._id} 
                    project={project} 
                    hasLiveDemo={true}
                  />
                ))}
              </div>
              
              {/* Show More/Less Button */}
              {filteredProjects.length > 3 && (
                <div className="text-center mt-12">
                  <button 
                    onClick={toggleProjectsVisibility}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3.5 px-10 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center gap-2"
                  >
                    {isExpanded ? (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7"></path>
                        </svg>
                        Show Less
                      </>
                    ) : (
                      <>
                        View All Projects
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Collaboration Call-to-Action */}
        <div className="text-center mt-20 bg-gradient-to-r from-blue-600/30 to-purple-600/30 backdrop-blur-md rounded-2xl p-12 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-400/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-400/10 rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">Have a project idea?</h3>
            <p className="text-blue-200 mb-8 max-w-2xl mx-auto text-lg">
              Let's collaborate to turn creative ideas into reality!
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <a 
                href="#contact" 
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium py-3.5 px-10 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Start New Project
              </a>
              <a 
                href="#projects" 
                className="bg-transparent border-2 border-white/30 text-white font-medium py-3.5 px-10 rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              >
                View Resume
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Projects;