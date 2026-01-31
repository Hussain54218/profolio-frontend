import React, { useContext, useState, lazy, Suspense } from "react";
import { ProjectContext } from "../context/ProjectContext";

// Lazy loaded sections
const ProjectsSection = lazy(() =>
  import("../components/Admin/ProjectsSection")
);
const MessagesSection = lazy(() =>
  import("../components/Admin/MessagesSection")
);
const SkillsSection = lazy(() => import("../components/Admin/SkillsSection"));
const UsersSection = lazy(() => import("../components/Admin/UsersSection"));
const ReportsSection = lazy(() => import("../components/Admin/ReportsSection"));
const SettingsSection = lazy(() =>
  import("../components/Admin/SettingsSection")
);
const HomeSection = lazy(() => import("../components/Admin/AdminHome"));
const AboutSection = lazy(() => import("../components/Admin/AdminAbout"));

// Loading component
const SectionLoading = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
    <span className="mr-3 text-gray-500">در حال بارگذاری...</span>
  </div>
);

function Admin() {
  const { projects, messages } = useContext(ProjectContext);
  const [activeTab, setActiveTab] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const tabLabels = {
    home: "صفحه اصلی",
    about: "درباره من",
    projects: "پروژه‌ها",
    messages: "پیام‌ها",
    skills: "مهارت‌ها",
    users: "کاربران",
    reports: "گزارشات",
    settings: "تنظیمات",
  };

  const itemsCount = {
    home: 0,
    about: 0,
    projects: projects.length,
    messages: messages.length,
    skills: 0,
    users: 0,
    reports: 0,
    settings: 0,
  };

  const tabIcons = {
    home: "🏠",
    about: "ℹ️",
    projects: "📁",
    messages: "✉️",
    skills: "⚡",
    users: "👥",
    reports: "📊",
    settings: "⚙️",
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSidebarOpen(false);
    const contentElement = document.getElementById("admin-content");
    if (contentElement) contentElement.scrollTop = 0;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 bg-indigo-600 text-white rounded-lg shadow-md"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>

      {/* Sidebar for desktop and mobile */}
      <div className={`${sidebarOpen ? 'block' : 'hidden'} lg:block fixed lg:relative inset-0 z-40 lg:z-auto w-64 bg-indigo-800 text-white shadow-lg flex-shrink-0`}>
        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 lg:hidden" 
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}
        
        <div className="relative z-50 h-full bg-indigo-800">
          {/* سایت بار کوچک */}
          <div className="h-16 flex items-center justify-center border-b border-indigo-700">
            <h2 className="text-xl font-bold">پنل مدیریت</h2>
            <button 
              className="lg:hidden absolute left-4 p-1 text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          {/* تب‌ها */}
          <div className="p-2 space-y-2 overflow-auto h-full" style={{ maxHeight: "calc(100vh - 64px)" }}>
            {Object.keys(tabLabels).map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`block w-full text-right p-3 rounded-lg transition-all duration-200 flex items-center justify-between ${
                  activeTab === tab
                    ? "bg-indigo-700 shadow-md"
                    : "hover:bg-indigo-700 hover:bg-opacity-50"
                }`}
              >
                <div className="flex items-center">
                  <span className="ml-2">{tabIcons[tab]}</span>
                  <span>{tabLabels[tab]}</span>
                </div>
                <div className="flex items-center">
                  {itemsCount[tab] > 0 && (
                    <span className="bg-indigo-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                      {itemsCount[tab]}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* User info at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-indigo-700 bg-indigo-900">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                <span className="font-bold">ا</span>
              </div>
              <div className="mr-3">
                <p className="text-sm font-medium">مدیر سیستم</p>
                <p className="text-xs text-indigo-300">سطح دسترسی: کامل</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content با اسکرول مستقل */}
      <div
        id="admin-content"
        className="flex-1 p-4 md:p-6 overflow-auto h-screen lg:ml-0"
      >
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">
            {tabLabels[activeTab]}
          </h1>
          <div className="flex items-center">
            <span className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full">
              {tabIcons[activeTab]} {tabLabels[activeTab]}
            </span>
          </div>
        </div>

        <Suspense fallback={<SectionLoading />}>
          {activeTab === "home" && <HomeSection />}
          {activeTab === "about" && <AboutSection />}
          {activeTab === "projects" && <ProjectsSection />}
          {activeTab === "messages" && <MessagesSection />}
          {activeTab === "skills" && <SkillsSection />}
          {activeTab === "users" && <UsersSection />}
          {activeTab === "reports" && <ReportsSection />}
          {activeTab === "settings" && <SettingsSection />}
        </Suspense>
      </div>
    </div>
  );
}

export default Admin;