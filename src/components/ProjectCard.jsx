import React, { useContext, useState } from "react";
import { ProjectContext } from "../context/ProjectContext";

function ProjectCard({ project, hasLiveDemo = false }) {
  const { rateProject } = useContext(ProjectContext);
  const [userRating, setUserRating] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleRate = (star) => {
    setUserRating(star);
    rateProject(project._id, star);
  };

  // محاسبه رنگ بر اساس امتیاز
  const getRatingColor = () => {
    const rating = userRating || Math.round(project.rating);
    if (rating <= 2) return "text-red-500";
    if (rating <= 4) return "text-yellow-500";
    return "text-green-500";
  };

  return (
    <div 
      className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* بخش تصویر پروژه */}
      <div className="relative overflow-hidden">
        {project.image && (
          <img
            src={project.image.startsWith("http") ? project.image : `https://portfulio-backend-1.onrender.com${project.image}`}
            alt={project.title}
            className={`h-48 w-full object-cover transition-transform duration-700 ${isHovered ? "scale-110" : "scale-100"}`}
          />
        )}
        {/* افکت hover روی تصویر */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 ${isHovered ? "opacity-100" : ""}`}></div>
        
        {/* دکمه‌های اکشن */}
        <div className="absolute top-3 right-3 flex gap-2">
          {hasLiveDemo && project.liveDemo && (
            <a 
              href={project.liveDemo} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-green-500 text-white p-2 rounded-full shadow-md hover:bg-green-600 transition-colors"
              title="مشاهده دموی زنده"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </a>
          )}
          {project.github && (
            <a 
              href={project.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-900 transition-colors"
              title="مشاهده کد در گیت‌هاب"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          )}
        </div>
        
        {/* دسته‌بندی پروژه */}
        {project.category && (
          <span className="absolute bottom-3 left-3 bg-blue-500/90 text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
            {project.category}
          </span>
        )}
      </div>

      {/* محتوای کارت */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{project.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">{project.description}</p>
        
        {/* تکنولوژی‌ها */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 4).map((tech, idx) => (
                <span 
                  key={idx} 
                  className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                  +{project.technologies.length - 4} بیشتر
                </span>
              )}
            </div>
          </div>
        )}

        {/* بخش امتیازدهی */}
        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex mr-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    onClick={() => handleRate(star)}
                    className="focus:outline-none"
                  >
                    <svg 
                      className={`w-5 h-5 transition-transform hover:scale-125 ${star <= (userRating || Math.round(project.rating)) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                ))}
              </div>
              <span className={`text-sm font-medium ${getRatingColor()}`}>
                {project.rating.toFixed(1)}
              </span>
            </div>
            <span className="text-xs text-gray-500">({project.votes} رأی)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;