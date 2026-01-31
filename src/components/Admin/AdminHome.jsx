// components/Admin/HomeSection.jsx
import React, { useEffect, useState } from "react";

function HomeSection() {
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    description: "",
    skills: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  // Show notifications
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  // Load saved data
  useEffect(() => {
    setIsLoading(true);
    fetch("https://portfulio-backend-1.onrender.com/api/home")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setForm({
            title: data.title || "",
            subtitle: data.subtitle || "",
            description: data.description || "",
            skills: data.skills?.join(", ") || "",
          });
          if (data.imageUrl) {
            setImagePreview(data.imageUrl);
          }
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching home data:", err);
        setIsLoading(false);
        showNotification("Failed to load data", "error");
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      
      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit data to server
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.title || !form.subtitle) {
      showNotification("Title and subtitle are required", "error");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("subtitle", form.subtitle);
    formData.append("description", form.description);
    formData.append("skills", form.skills);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await fetch("https://portfulio-backend-1.onrender.com/api/home", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        showNotification("Home page information saved successfully ✅", "success");
      } else {
        throw new Error("Failed to save data");
      }
    } catch (error) {
      console.error("Error saving home data:", error);
      showNotification("An error occurred while saving", "error");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-medium transform transition-all duration-300 ${
          notification.type === "success" ? "bg-green-500" : "bg-red-500"
        }`}>
          {notification.message}
        </div>
      )}

      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Home Page Management</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Main Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter main title"
              value={form.title}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
            <input
              type="text"
              name="subtitle"
              placeholder="Enter subtitle"
              value={form.subtitle}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            placeholder="Enter page description"
            rows="4"
            value={form.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg cursor-pointer hover:bg-indigo-200 transition"
                >
                  Choose Image
                </label>
              </div>
              {imageFile && (
                <span className="text-sm text-gray-600">{imageFile.name}</span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma separated)</label>
            <input
              type="text"
              name="skills"
              placeholder="Example: React, Node.js, Python"
              value={form.skills}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
            />
          </div>
        </div>

        {imagePreview && (
          <div className="flex justify-center">
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-indigo-100 shadow-md">
              <img
                src={imagePreview}
                alt="Image preview"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md"
        >
          Save Information
        </button>
      </form>
    </div>
  );
}

export default HomeSection;