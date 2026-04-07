import axios from "axios";
// import { removeToken } from "./data/storage";
import { Alert } from "react-native";
import { removeItem } from "./data/storage.repository";
import { STORAGE_KEYS } from "../constants/storageKeys";

export const api = axios.create({
  baseURL: "https://loyalty-backend-production-545b.up.railway.app/loyalty/v1",
});

let authToken: string | null = null;

export function setAuthToken(token: string) {
  authToken = token;
}

api.interceptors.request.use((config) => {
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

let onUnauthorized: (() => void) | null = null;

export function setUnauthorizedHandler(cb: () => void) {
  onUnauthorized = cb;
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {

    if (error.response?.status === 401) {
      console.log("Token expirado");

      Alert.alert(
        "Sesión expirada",
        "Tu sesión ha expirado, por favor inicia sesión nuevamente"
      );

      // await removeToken();
      await removeItem(STORAGE_KEYS.TOKEN);

      onUnauthorized?.();
    }

    return Promise.reject(error);
  }
);