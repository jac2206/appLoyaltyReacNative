import axios from "axios";

let authToken: string | null = null;

export function setAuthToken(token: string) {
  authToken = token;
}

export const api = axios.create({
  baseURL: "https://loyalty-backend-production-545b.up.railway.app/loyalty/v1",
});

api.interceptors.request.use((config) => {

  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }

  return config;
});