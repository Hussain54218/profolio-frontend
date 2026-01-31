import React, { useEffect, useState } from "react";

function AdminAbout() {
  const [aboutData, setAboutData] = useState({
    title: "",
    intro: "",
    details: "",
    frontendSkills: [],
    backendSkills: [],
    experiences: [],
    contact: {
      email: "",
      phone: "",
      location: ""
    },
  });

  const [newExp, setNewExp] = useState({
    company: "",
    role: "",
    period: "",
    description: "",
  });

  const [newFrontendSkill, setNewFrontendSkill] = useState("");
  const [newBackendSkill, setNewBackendSkill] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });
  const [editingExpIndex, setEditingExpIndex] = useState(null);

  // fetch data
  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:5000/api/about")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setAboutData({
            title: data.title || "",
            intro: data.intro || "",
            details: data.details || "",
            frontendSkills: data.frontendSkills || [],
            backendSkills: data.backendSkills || [],
            experiences: data.experiences || [],
            contact: data.contact || { email: "", phone: "", location: "" },
          });
          setEditingId(data._id || null);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
        showNotification("Failed to load data", "error");
      });
  }, []);

  const handleAddExperience = () => {
    if (!newExp.company.trim() || !newExp.role.trim()) {
      showNotification("Company and Role are required", "error");
      return;
    }
    
    if (editingExpIndex !== null) {
      // Editing existing experience
      const updatedExperiences = [...aboutData.experiences];
      updatedExperiences[editingExpIndex] = newExp;
      setAboutData({ ...aboutData, experiences: updatedExperiences });
      setEditingExpIndex(null);
      showNotification("Experience updated successfully", "success");
    } else {
      // Adding new experience
      const updated = [...aboutData.experiences, { ...newExp, id: Date.now() }];
      setAboutData({ ...aboutData, experiences: updated });
      showNotification("Experience added successfully", "success");
    }
    
    setNewExp({ company: "", role: "", period: "", description: "" });
  };

  const handleEditExperience = (index) => {
    setNewExp(aboutData.experiences[index]);
    setEditingExpIndex(index);
  };

  const handleRemoveExperience = (index) => {
    const updated = [...aboutData.experiences];
    updated.splice(index, 1);
    setAboutData({ ...aboutData, experiences: updated });
    showNotification("Experience removed", "success");
  };

  const handleAddSkill = (type) => {
    if (type === 'frontend' && newFrontendSkill.trim()) {
      setAboutData({
        ...aboutData,
        frontendSkills: [...aboutData.frontendSkills, newFrontendSkill.trim()]
      });
      setNewFrontendSkill("");
      showNotification("Frontend skill added", "success");
    } else if (type === 'backend' && newBackendSkill.trim()) {
      setAboutData({
        ...aboutData,
        backendSkills: [...aboutData.backendSkills, newBackendSkill.trim()]
      });
      setNewBackendSkill("");
      showNotification("Backend skill added", "success");
    }
  };

  const handleRemoveSkill = (type, index) => {
    if (type === 'frontend') {
      const updated = [...aboutData.frontendSkills];
      updated.splice(index, 1);
      setAboutData({ ...aboutData, frontendSkills: updated });
    } else {
      const updated = [...aboutData.backendSkills];
      updated.splice(index, 1);
      setAboutData({ ...aboutData, backendSkills: updated });
    }
    showNotification("Skill removed", "success");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `http://localhost:5000/api/about/${editingId}`
        : "http://localhost:5000/api/about";

      const bodyData = {
        ...aboutData,
        experiences: aboutData.experiences || [],
        frontendSkills: aboutData.frontendSkills || [],
        backendSkills: aboutData.backendSkills || [],
        contact: aboutData.contact || {},
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      if (res.ok) {
        const data = await res.json();
        setEditingId(data._id);
        setAboutData(data);
        showNotification("Saved successfully!", "success");
      } else throw new Error("Error saving data");
    } catch (err) {
      console.error(err);
      showNotification("Error saving data", "error");
    }
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-medium transform transition-all duration-300 ${
          notification.type === "success" ? "bg-green-500" : "bg-red-500"
        }`}>
          {notification.message}
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-2xl shadow-lg mb-8 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold">Admin Panel - About</h2>
          <p className="text-indigo-100 mt-2">Manage profile info & experiences</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <label className="block font-semibold text-gray-800">Title</label>
            <input
              type="text"
              value={aboutData.title}
              onChange={(e) => setAboutData({ ...aboutData, title: e.target.value })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
              required
            />
          </div>

          {/* Intro */}
          <div className="space-y-2">
            <label className="block font-semibold text-gray-800">Short Intro</label>
            <textarea
              value={aboutData.intro}
              onChange={(e) => setAboutData({ ...aboutData, intro: e.target.value })}
              className="w-full p-3 border rounded-lg min-h-[100px] focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
              required
            />
          </div>

          {/* Details */}
          <div className="space-y-2">
            <label className="block font-semibold text-gray-800">Details</label>
            <textarea
              value={aboutData.details}
              onChange={(e) => setAboutData({ ...aboutData, details: e.target.value })}
              className="w-full p-3 border rounded-lg min-h-[150px] focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
              required
            />
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-4 text-lg">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={aboutData.contact.email || ""}
                  onChange={(e) => setAboutData({ 
                    ...aboutData, 
                    contact: { ...aboutData.contact, email: e.target.value } 
                  })}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="text"
                  value={aboutData.contact.phone || ""}
                  onChange={(e) => setAboutData({ 
                    ...aboutData, 
                    contact: { ...aboutData.contact, phone: e.target.value } 
                  })}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={aboutData.contact.location || ""}
                  onChange={(e) => setAboutData({ 
                    ...aboutData, 
                    contact: { ...aboutData.contact, location: e.target.value } 
                  })}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Skills Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Frontend Skills */}
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-4">Frontend Skills</h3>
              <div className="flex mb-4">
                <input
                  type="text"
                  placeholder="Add a frontend skill"
                  value={newFrontendSkill}
                  onChange={(e) => setNewFrontendSkill(e.target.value)}
                  className="flex-grow p-3 border rounded-l-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => handleAddSkill('frontend')}
                  className="bg-indigo-600 text-white px-4 rounded-r-lg hover:bg-indigo-700"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {aboutData.frontendSkills.map((skill, i) => (
                  <div key={i} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full flex items-center">
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill('frontend', i)}
                      className="ml-2 text-indigo-600 hover:text-indigo-900"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Backend Skills */}
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-4">Backend Skills</h3>
              <div className="flex mb-4">
                <input
                  type="text"
                  placeholder="Add a backend skill"
                  value={newBackendSkill}
                  onChange={(e) => setNewBackendSkill(e.target.value)}
                  className="flex-grow p-3 border rounded-l-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => handleAddSkill('backend')}
                  className="bg-indigo-600 text-white px-4 rounded-r-lg hover:bg-indigo-700"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {aboutData.backendSkills.map((skill, i) => (
                  <div key={i} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full flex items-center">
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill('backend', i)}
                      className="ml-2 text-purple-600 hover:text-purple-900"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Experiences */}
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-4 text-lg">
              {editingExpIndex !== null ? "Edit Experience" : "Add New Experience"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Company"
                value={newExp.company}
                onChange={(e) => setNewExp({ ...newExp, company: e.target.value })}
                className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Role"
                value={newExp.role}
                onChange={(e) => setNewExp({ ...newExp, role: e.target.value })}
                className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Period (e.g., 2020-2022)"
                value={newExp.period}
                onChange={(e) => setNewExp({ ...newExp, period: e.target.value })}
                className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
              />
              <textarea
                placeholder="Description"
                value={newExp.description}
                onChange={(e) => setNewExp({ ...newExp, description: e.target.value })}
                className="p-3 border rounded-lg col-span-1 md:col-span-2 focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleAddExperience}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                {editingExpIndex !== null ? "Update Experience" : "Add Experience"}
              </button>
              {editingExpIndex !== null && (
                <button
                  type="button"
                  onClick={() => {
                    setNewExp({ company: "", role: "", period: "", description: "" });
                    setEditingExpIndex(null);
                  }}
                  className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>

          {/* List Experiences */}
          <div className="mt-6 space-y-4">
            <h3 className="font-semibold text-gray-800 text-lg">Experiences</h3>
            {aboutData.experiences.map((exp, i) => (
              <div key={i} className="bg-indigo-50 p-4 rounded-lg flex justify-between items-start">
                <div className="flex-grow">
                  <h4 className="font-bold text-indigo-800">{exp.role} - {exp.company}</h4>
                  <p className="text-sm text-gray-600">{exp.period}</p>
                  <p className="text-gray-700 mt-2">{exp.description}</p>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button
                    type="button"
                    onClick={() => handleEditExperience(i)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveExperience(i)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
            {aboutData.experiences.length === 0 && (
              <p className="text-gray-500 text-center py-4">No experiences added yet</p>
            )}
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 rounded-lg font-medium hover:from-green-700 hover:to-teal-700 transition-all"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminAbout;