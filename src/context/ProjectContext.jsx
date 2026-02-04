/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from "react";
import API from "../services/api";

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true); // اضافه شد
  const [error, setError] = useState(null); // اضافه شد

  // گرفتن پروژه‌ها
  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await API.get("/projects");
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error.response?.data || error.message);
      setError("Failed to load projects. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // اضافه کردن پروژه
  const addProject = async (formData) => {
    try {
      setError(null);
      const { data } = await API.post("/projects", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProjects((prev) => [data, ...prev]);
      return { success: true, data };
    } catch (error) {
      console.error("Error adding project:", error.response?.data || error.message);
      setError("Failed to add project. Please try again.");
      return { success: false, error: error.response?.data || error.message };
    }
  };

  // حذف پروژه
  const deleteProject = async (id) => {
    try {
      setError(null);
      await API.delete(`/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p._id !== id));
      return { success: true };
    } catch (error) {
      console.error("Error deleting project:", error.response?.data || error.message);
      setError("Failed to delete project. Please try again.");
      return { success: false, error: error.response?.data || error.message };
    }
  };

  // ثبت امتیاز پروژه
  const rateProject = async (id, rating) => {
    try {
      setError(null);
      const { data } = await API.post(`/projects/rate/${id}`, { rating });
      setProjects((prev) => prev.map(p => p._id === id ? data : p));
      return { success: true, data };
    } catch (error) {
      console.error("Error rating project:", error.response?.data || error.message);
      setError("Failed to rate project. Please try again.");
      return { success: false, error: error.response?.data || error.message };
    }
  };

  // پیام‌ها
  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/messages", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(res.data);
    } catch (error) {
      console.error("Error fetching messages:", error.response?.data || error.message);
      setError("Failed to load messages. Please try again.");
    }
  };

  const deleteMessage = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await API.delete(`/messages/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages((prev) => prev.filter((m) => m._id !== id));
      return { success: true };
    } catch (error) {
      console.error("Error deleting message:", error.response?.data || error.message);
      setError("Failed to delete message. Please try again.");
      return { success: false, error: error.response?.data || error.message };
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchMessages();
  }, []);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        messages,
        loading, // اضافه شد
        error, // اضافه شد
        addProject,
        deleteProject,
        fetchProjects,
        fetchMessages,
        deleteMessage,
        rateProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};