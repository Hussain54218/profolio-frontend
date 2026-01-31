/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from "react";
import API from "../services/api";

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);

  // گرفتن پروژه‌ها
  const fetchProjects = async () => {
    try {
      const { data } = await API.get("/projects");
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error.response?.data || error.message);
    }
  };

  // اضافه کردن پروژه
  const addProject = async (formData) => {
    try {
      const { data } = await API.post("/projects", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProjects((prev) => [data, ...prev]);
    } catch (error) {
      console.error("Error adding project:", error.response?.data || error.message);
    }
  };

  // حذف پروژه
  const deleteProject = async (id) => {
    try {
      await API.delete(`/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Error deleting project:", error.response?.data || error.message);
    }
  };

  // ثبت امتیاز پروژه
  const rateProject = async (id, rating) => {
    try {
      const { data } = await API.post(`/projects/rate/${id}`, { rating });
      setProjects((prev) => prev.map(p => p._id === id ? data : p));
    } catch (error) {
      console.error("Error rating project:", error.response?.data || error.message);
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
    }
  };

  const deleteMessage = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await API.delete(`/messages/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages((prev) => prev.filter((m) => m._id !== id));
    } catch (error) {
      console.error("Error deleting message:", error.response?.data || error.message);
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
