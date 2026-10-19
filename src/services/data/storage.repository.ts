import AsyncStorage from "@react-native-async-storage/async-storage";

import * as SecureStore from "expo-secure-store";

import { STORAGE_KEYS } from "../../constants/storageKeys";

export async function saveItem<T>(key: string, value: T) {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.log("Error saving item:", error);
  }
}

export async function getItem<T>(key: string): Promise<T | null> {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.log("Error getting item:", error);
    return null;
  }
}

export async function removeItem(key: string) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log("Error removing item:", error);
  }
}

export async function saveSecureItem<T>(key: string, value: T): Promise<void> {
  try {
    await SecureStore.setItemAsync(key, JSON.stringify(value), {
      keychainAccessible: SecureStore.WHEN_UNLOCKED,
    });
  } catch (error) {
    console.log("Error saving secure item:", error);
  }
}

export async function getSecureItem<T>(key: string): Promise<T | null> {
  try {
    const jsonValue = await SecureStore.getItemAsync(key);

    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.log("Error getting secure item:", error);
    return null;
  }
}

export async function removeSecureItem(key: string): Promise<void> {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log("Error removing secure item:", error);
  }
}

export async function isSecureStorageAvailable(): Promise<boolean> {
  return SecureStore.isAvailableAsync();
}

export async function saveAuthToken(token: string): Promise<void> {
  if (await isSecureStorageAvailable()) {
    await saveSecureItem(STORAGE_KEYS.TOKEN, token);
    return;
  }

  await saveItem(STORAGE_KEYS.TOKEN, token);
}

export async function getAuthToken(): Promise<string | null> {
  if (await isSecureStorageAvailable()) {
    const secureToken = await getSecureItem<string>(STORAGE_KEYS.TOKEN);

    if (secureToken) {
      return secureToken;
    }
  }

  const legacyToken = await getItem<string>(STORAGE_KEYS.TOKEN);

  if (legacyToken && (await isSecureStorageAvailable())) {
    await saveSecureItem(STORAGE_KEYS.TOKEN, legacyToken);
    await removeItem(STORAGE_KEYS.TOKEN);
  }

  return legacyToken;
}

export async function removeAuthToken(): Promise<void> {
  await removeSecureItem(STORAGE_KEYS.TOKEN);
  await removeItem(STORAGE_KEYS.TOKEN);
}
