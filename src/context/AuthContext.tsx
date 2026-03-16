import React, { createContext, useContext, useState, ReactNode } from "react";
import { AuthContextType, User } from "../types/user";
import { loginRequest, getMeRequest } from "../services/authService";
import { setAuthToken } from "../services/api";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {

  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {

    try {

      const loginData = await loginRequest(email, password);

      const token = loginData.token;

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

      console.log("Error login:", error);
      throw error;
    }
  };

  const logout = () => {

    setUser(null);

    setAuthToken("");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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