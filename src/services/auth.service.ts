import { api } from "./api";

import type {
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  UserProfileResponse,
} from "../types/user";

export async function loginRequest(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/users/login", {
    email,
    password,
  });

  return response.data;
}

export async function getMeRequest(
  token: string,
): Promise<UserProfileResponse> {
  const response = await api.get<UserProfileResponse>("/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function registerRequest(
  data: RegisterRequest,
): Promise<RegisterResponse> {
  const response = await api.post<RegisterResponse>("/users/register", data);

  return response.data;
}
