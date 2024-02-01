import axios from "axios";

const BASE_URL = "https://strapi-fly-1ldf.fly.dev/api/";

const API_TOKEN = import.meta.env.VITE_API_TOKEN;

export const api = axios.create({ baseURL: BASE_URL });

api.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${API_TOKEN}`;

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
