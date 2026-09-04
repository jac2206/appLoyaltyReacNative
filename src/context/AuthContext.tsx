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
import { saveToken, getToken, removeToken } from "../services/data/storage";
import { getItem, removeItem, saveItem } from "../services/data/storage.repository";
import { STORAGE_KEYS } from "../constants/storageKeys";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function restoreSession() {
      // const token = await getToken();
      const token = await getItem<string>(STORAGE_KEYS.TOKEN);

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setAuthToken(token);

        const userData = await getMeRequest(token);

        setUser({
          userName: userData.fullName,
          userEmail: userData.email,
          documentType: userData.documentType,
          documentNumber: userData.documentNumber,
          phone: userData.phone,
        });
      } catch (error) {
        console.log("Token invÃ¡lido");

        // await removeToken();
        await removeItem(STORAGE_KEYS.TOKEN);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    restoreSession();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const loginData = await loginRequest(email, password);

      const token = loginData.token;

      setAuthToken(token);
      await saveItem(STORAGE_KEYS.TOKEN, token);
      // await saveToken(token);

      const userData = await getMeRequest(token);

      setUser({
        userName: userData.fullName,
        userEmail: userData.email,
        documentType: userData.documentType,
        documentNumber: userData.documentNumber,
        phone: userData.phone,
      });
    } catch (error) {
      console.log("Error login:", error);
      throw error;
    }
  };

  const logout = async () => {
    setUser(null);

    setAuthToken("");

    // await removeToken();
    await removeItem(STORAGE_KEYS.TOKEN);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
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
