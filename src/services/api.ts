import axios from "axios";
import { getItem } from "./storage";

export const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

api.interceptors.request.use(async (config) => {
  const token = await getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
