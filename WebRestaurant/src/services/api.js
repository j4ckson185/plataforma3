import axios from "axios";
import Strings from "../constants/Strings";

const baseURL = process.env.API_BASE_URL || "http://18.222.213.75";

const api = axios.create({
  baseURL: baseURL,
});

api.interceptors.request.use(async (config) => {
  const toe = `Bearer ${localStorage.getItem(Strings.token_jwt)}`;

  if (toe) {
    config.headers.Authorization = toe;
  }
  return config;
});

export default api;
