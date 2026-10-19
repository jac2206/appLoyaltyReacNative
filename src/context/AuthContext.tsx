import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { AuthContextType, User } from "../types/user";
import { loginRequest, getMeRequest } from "../services/auth.service";
import { setAuthToken } from "../services/api";
import {
  getAuthToken,
  removeAuthToken,
  saveAuthToken,
} from "../services/data/storage.repository";
import {
  authenticateWithBiometrics,
  getBiometricAvailability,
  removeBiometricToken,
  saveBiometricToken,
  verifyBiometrics,
} from "../services/biometric.service";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [biometricLabel, setBiometricLabel] = useState("biometría");
  const [sessionToken, setSessionToken] = useState<string | null>(null);

  const refreshBiometricAvailability = async () => {
    const availability = await getBiometricAvailability();

    setBiometricAvailable(availability.available);
    setBiometricEnabled(availability.enabled);
    setBiometricLabel(availability.label);
  };

  useEffect(() => {
    refreshBiometricAvailability().catch(() => {
      setBiometricAvailable(false);
    });

    async function restoreSession() {
      const token = await getAuthToken();

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setAuthToken(token);
        setSessionToken(token);

        const userData = await getMeRequest(token);

        setUser({
          userName: userData.fullName,
          userEmail: userData.email,
          documentType: userData.documentType,
          documentNumber: userData.documentNumber,
          phone: userData.phone,
        });
      } catch {
        await removeAuthToken();
        setAuthToken("");
        setSessionToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    restoreSession();
  }, []);

  const login = async (email: string, password: string) => {
    const loginData = await loginRequest(email, password);

    const token = loginData.token;

    setAuthToken(token);
    setSessionToken(token);
    await saveAuthToken(token);

    const userData = await getMeRequest(token);

    setUser({
      userName: userData.fullName,
      userEmail: userData.email,
      documentType: userData.documentType,
      documentNumber: userData.documentNumber,
      phone: userData.phone,
    });
  };

  const loginWithBiometrics = async () => {
    const token = await authenticateWithBiometrics();

    if (!token) {
      throw new Error("No se pudo completar la autenticación biométrica.");
    }

    try {
      setAuthToken(token);
      setSessionToken(token);
      await saveAuthToken(token);

      const userData = await getMeRequest(token);

      setUser({
        userName: userData.fullName,
        userEmail: userData.email,
        documentType: userData.documentType,
        documentNumber: userData.documentNumber,
        phone: userData.phone,
      });
    } catch {
      setAuthToken("");
      setSessionToken(null);
      await removeAuthToken();
      await removeBiometricToken();
      await refreshBiometricAvailability();
      throw new Error(
        "Tu sesión biométrica ya no es válida. Inicia sesión con tu correo y contraseña.",
      );
    }
  };

  const enableBiometricLogin = async () => {
    if (!sessionToken || !biometricAvailable) {
      throw new Error("La biometría no está disponible en este dispositivo.");
    }

    if (!(await verifyBiometrics())) {
      throw new Error("No se pudo confirmar tu identidad biométrica.");
    }

    await saveBiometricToken(sessionToken);
    await refreshBiometricAvailability();
  };

  const disableBiometricLogin = async () => {
    await removeBiometricToken();
    await refreshBiometricAvailability();
  };

  const logout = async () => {
    setUser(null);

    setAuthToken("");
    setSessionToken(null);

    await removeAuthToken();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        loginWithBiometrics,
        enableBiometricLogin,
        disableBiometricLogin,
        biometricAvailable,
        biometricEnabled,
        biometricLabel,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }

  return context;
}
