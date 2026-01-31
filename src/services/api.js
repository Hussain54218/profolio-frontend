import axios from "axios";

const API = axios.create({
  baseURL:"https://portfulio-backend-1.onrender.com/api"
})

// اضافه کردن توکن به هدر درخواست‌ها
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token"); 
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
