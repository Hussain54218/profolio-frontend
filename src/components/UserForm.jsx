import React, { useState } from "react";
import api from "../services/api";

function UserForm({ onUserCreated }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/register", { username, password });
      setMessage("User created successfully!");
      setUsername("");
      setPassword("");
      if (onUserCreated) onUserCreated(data);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error creating user");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md w-full max-w-md">
      <h3 className="text-xl font-bold mb-4">Create User</h3>
      {message && <p className="mb-2">{message}</p>}
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          className="border p-2 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Create
        </button>
      </form>
    </div>
  );
}

export default UserForm;
