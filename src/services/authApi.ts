import axios from "axios";

export const authApi = axios.create({
  baseURL: "http://192.168.18.12:8080/auth",
});
