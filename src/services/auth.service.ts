import { api } from "./api";

export async function loginRequest(email: string, password: string) {
  const response = await api.post("/users/login", {
    email,
    password,
  });

  return response.data;
}

export async function getMeRequest(token: string) {
  const response = await api.get("/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function registerRequest(data: {
  documentType: "CC" | "CE" | "NIT" | "PT";
  documentNumber: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
}) {
  const response = await api.post("/users/register", data);

  return response.data;
}
