import axios from "axios";

const BACKEND_URL = process.env.VITE_BACKEND_URL;

export const axiosInstance = axios.create({
  baseURL: `${BACKEND_URL}/api`,
});
