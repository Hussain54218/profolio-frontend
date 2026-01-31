import React, { useEffect, useState } from "react";

function Home() {
  const [data, setData] = useState(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    fetch("https://portfulio-backend-1.onrender.com/api/home")
      .then((res) => res.json())
      .then((info) => setData(info))
      .catch((err) => console.error(err));

  }, []);

  if (!data) return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-400 mx-auto mb-4"></div>
        <p className="text-blue-200 text-lg font-light">Loading...</p>
      </div>
    </div>
  );

  const imageSrc = data.image && !imageError
  ? data.image.startsWith("http")
    ? data.image
    : `https://portfulio-backend-1.onrender.com${data.image}` // Just prepend host
  : "/default-profile.png";


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden relative">
      {/* Background elements - هماهنگ با صفحه Projects */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-500/10 to-transparent"></div>
      <div className="absolute top-1/4 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 -right-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
      
      <section className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center">
        {/* Profile image with elegant frame */}
        <div className="relative mb-12 group">
          <div className="absolute -inset-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-70 blur-lg group-hover:opacity-90 transition duration-700 group-hover:duration-300"></div>
          <div className="relative w-48 h-48 mx-auto rounded-full bg-gradient-to-r from-blue-600 to-purple-600 p-1.5">
            <img
              src={imageSrc}
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-4 border-gray-900/50 group-hover:scale-105 transition-transform duration-500"
              onError={() => setImageError(true)}
            />
          </div>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-3 bg-blue-400/30 blur-md rounded-full"></div>
        </div>

        {/* Text content */}
        <div className="text-center max-w-3xl space-y-6 mb-10">
          <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300 py-2">
            {data.title}
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-blue-200">
            {data.subtitle}
          </h2>
          <p className="text-lg text-blue-100/90 leading-relaxed max-w-2xl mx-auto">
            {data.description}
          </p>
        </div>

        {/* Skills section */}
        <div className="mt-8 w-full max-w-3xl">
          <div className="flex flex-wrap justify-center gap-3">
            {data.skills?.map((skill, index) => (
              <div 
                key={index}
                className="relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
                <span className="relative px-5 py-2.5 bg-white/5 backdrop-blur-sm rounded-xl text-sm font-medium border border-white/10 group-hover:border-transparent transition-all duration-500">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative elements - هماهنگ با صفحه Projects */}
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-60 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </section>
    </div>
  );
}

export default Home;