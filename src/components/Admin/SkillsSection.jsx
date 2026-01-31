import React, { useState } from "react";
import { FaReact, FaPython, FaQuestion, FaPlus, FaLightbulb, FaCloudUploadAlt, FaFilePdf } from "react-icons/fa";
import { SiJavascript, SiTypescript, SiNodedotjs, SiExpress, SiMongodb, SiMysql, SiHtml5, SiCss3 } from "react-icons/si";

function AdminSkills() {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [cvFile, setCvFile] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState(null);

  // نقشه‌ای از آیکون‌های موجود
  const iconMap = {
    FaReact: <FaReact />,
    FaPython: <FaPython />,
    SiJavascript: <SiJavascript />,
    SiTypescript: <SiTypescript />,
    SiNodedotjs: <SiNodedotjs />,
    SiExpress: <SiExpress />,
    SiMongodb: <SiMongodb />,
    SiMysql: <SiMysql />,
    SiHtml5: <SiHtml5 />,
    SiCss3: <SiCss3 />,
  };

  // اضافه کردن مهارت
  const addSkill = async () => {
    if (!name || !icon) {
      return alert("لطفاً نام و آیکون مهارت را وارد کنید");
    }
    
    await fetch("https://portfulio-backend-1.onrender.com/api/skills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, icon }),
    });
    setName("");
    setIcon("");
    setSelectedIcon(null);
    alert("مهارت با موفقیت اضافه شد ✅");
  };

  // آپلود CV
  const uploadCV = async () => {
    if (!cvFile) return alert("فایل انتخاب نشده");
    const formData = new FormData();
    formData.append("cv", cvFile);

    await fetch("https://portfulio-backend-1.onrender.com/api/skills/upload-cv", {
      method: "POST",
      body: formData,
    });

    alert("رزومه با موفقیت آپلود شد ✅");
    setCvFile(null);
  };

  // انتخاب آیکون
  const handleIconSelect = (iconKey) => {
    setIcon(iconKey);
    setSelectedIcon(iconKey);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
          <h2 className="text-2xl font-bold text-center">مدیریت مهارت‌ها و رزومه</h2>
          <p className="text-center text-indigo-100 mt-2">افزودن مهارت‌های جدید و آپلود رزومه</p>
        </div>
        
        <div className="p-6 space-y-6">
          {/* بخش افزودن مهارت */}
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FaLightbulb className="h-5 w-5 ml-2 text-indigo-600" />
              افزودن مهارت جدید
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">نام مهارت</label>
                <input
                  type="text"
                  placeholder="مثلاً: React, Python, JavaScript"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">انتخاب آیکون</label>
                
                {/* نمایش آیکون انتخاب شده */}
                {selectedIcon && (
                  <div className="flex items-center justify-center p-3 mb-3 bg-indigo-100 rounded-lg">
                    <span className="text-2xl text-indigo-600 mr-2">
                      {iconMap[selectedIcon]}
                    </span>
                    <span className="text-sm text-indigo-800">{selectedIcon}</span>
                  </div>
                )}
                
                {/* لیست آیکون‌های قابل انتخاب */}
                <div className="grid grid-cols-4 gap-2 mt-3 p-3 bg-gray-100 rounded-lg">
                  {Object.entries(iconMap).map(([key, IconComponent]) => (
                    <div
                      key={key}
                      onClick={() => handleIconSelect(key)}
                      className={`p-2 flex flex-col items-center justify-center rounded cursor-pointer transition-all ${
                        selectedIcon === key 
                          ? 'bg-indigo-500 text-white' 
                          : 'bg-white text-gray-700 hover:bg-indigo-100'
                      }`}
                    >
                      <span className="text-lg">{IconComponent}</span>
                      <span className="text-xs mt-1">{key}</span>
                    </div>
                  ))}
                </div>
                
                <p className="text-xs text-gray-500 mt-2">
                  برای اضافه کردن آیکون‌های بیشتر، آن‌ها را به آبجکت iconMap در کامپوننت اضافه کنید.
                </p>
              </div>
              
              <button
                onClick={addSkill}
                disabled={!name || !icon}
                className={`w-full py-3 rounded-lg font-medium transition flex items-center justify-center ${
                  name && icon
                    ? "bg-indigo-600 text-white hover:bg-indigo-700" 
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <FaPlus className="h-5 w-5 ml-2" />
                افزودن مهارت
              </button>
            </div>
          </div>

          {/* بخش آپلود رزومه */}
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FaCloudUploadAlt className="h-5 w-5 ml-2 text-indigo-600" />
              آپلود رزومه (CV)
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-white hover:bg-gray-50 transition">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FaFilePdf className="h-10 w-10 text-red-400 mb-2" />
                    <p className="text-sm text-gray-500">
                      {cvFile ? cvFile.name : "فایل PDF را اینجا رها کنید یا برای انتخاب کلیک کنید"}
                    </p>
                  </div>
                  <input 
                    type="file" 
                    accept=".pdf" 
                    onChange={(e) => setCvFile(e.target.files[0])} 
                    className="hidden" 
                  />
                </label>
              </div>
              
              <button
                onClick={uploadCV}
                disabled={!cvFile}
                className={`w-full py-3 rounded-lg font-medium transition flex items-center justify-center ${
                  cvFile 
                    ? "bg-green-600 text-white hover:bg-green-700" 
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                <FaCloudUploadAlt className="h-5 w-5 ml-2" />
                آپلود رزومه
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSkills;