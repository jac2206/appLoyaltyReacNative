import * as LocalAuthentication from "expo-local-authentication";
import { Platform } from "react-native";

import { STORAGE_KEYS } from "../constants/storageKeys";
import {
  getSecureItem,
  isSecureStorageAvailable,
  removeSecureItem,
  saveSecureItem,
} from "./data/storage.repository";

const BIOMETRIC_TOKEN_KEY = STORAGE_KEYS.BIOMETRIC_TOKEN;

export type BiometricAvailability = {
  available: boolean;
  enabled: boolean;
  label: string;
};

function getBiometricLabel(
  authenticationTypes: LocalAuthentication.AuthenticationType[],
): string {
  if (
    authenticationTypes.includes(
      LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION,
    )
  ) {
    return "Face ID o reconocimiento facial";
  }

  return "huella digital";
}

export async function getBiometricAvailability(): Promise<BiometricAvailability> {
  if (Platform.OS === "web") {
    return {
      available: false,
      enabled: false,
      label: "biometría",
    };
  }

  const secureStoreAvailable = await isSecureStorageAvailable();

  if (!secureStoreAvailable) {
    return {
      available: false,
      enabled: false,
      label: "biometría",
    };
  }

  const [hasHardware, isEnrolled, authenticationTypes, token] = await Promise.all([
    LocalAuthentication.hasHardwareAsync(),
    LocalAuthentication.isEnrolledAsync(),
    LocalAuthentication.supportedAuthenticationTypesAsync(),
    getSecureItem<string>(BIOMETRIC_TOKEN_KEY),
  ]);

  return {
    available: hasHardware && isEnrolled,
    enabled: Boolean(token),
    label: getBiometricLabel(authenticationTypes),
  };
}

export async function verifyBiometrics(): Promise<boolean> {
  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: "Confirma tu identidad para activar el acceso biométrico",
    cancelLabel: "Cancelar",
    disableDeviceFallback: true,
  });

  return result.success;
}

export async function saveBiometricToken(token: string): Promise<void> {
  if (Platform.OS === "web" || !(await isSecureStorageAvailable())) {
    return;
  }

  await saveSecureItem(BIOMETRIC_TOKEN_KEY, token);
}

export async function removeBiometricToken(): Promise<void> {
  if (Platform.OS === "web" || !(await isSecureStorageAvailable())) {
    return;
  }

  await removeSecureItem(BIOMETRIC_TOKEN_KEY);
}

export async function authenticateWithBiometrics(): Promise<string | null> {
  if (!(await verifyBiometrics())) {
    return null;
  }

  return getSecureItem<string>(BIOMETRIC_TOKEN_KEY);
}
