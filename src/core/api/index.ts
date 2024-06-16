import axios from "axios";
import { appApiUrl, isDev } from "../config";

export const axiosRequest = axios.create({
  baseURL: appApiUrl,
  headers: { "Content-Type": "application/json" },
});

axiosRequest.interceptors.request.use(async (config) => {
  // Log for dev
  if (isDev) {
    console.info("REQUEST: ", config.url);
  }

  return config;
});
