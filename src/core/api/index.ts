import axios from 'axios';
import { isDev } from "../config";

export const axiosRequest = axios.create({
  baseURL: process.env.EXPO_PUBLIC_APP_API_URL,
  headers: { 'Content-Type': 'application/json' }
});

axiosRequest.interceptors.request.use(async (config) => {
  // Log for dev
  if (isDev) {
    console.log('REQUEST: ', config.url);
  }

  return config;
});
