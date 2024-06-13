import axios from "axios";
import { appApiUrl } from "../config";

export const axiosRequest = axios.create({
  baseURL: appApiUrl,
  headers: { "Content-Type": "application/json" },
});
