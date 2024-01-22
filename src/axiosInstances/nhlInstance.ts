import axios from "axios";

export const nhlInstance = axios.create({
  baseURL: process.env.NHL_BASE_URL,
  timeout: 5000,
});
