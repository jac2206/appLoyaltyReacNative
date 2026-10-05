export type User = {
  userName: string;
  userEmail: string;
  documentType: string;
  documentNumber: string;
  phone: string;
};

export type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
};

export type RegisterRequest = {
  documentType: "CC" | "CE" | "NIT" | "PT";
  documentNumber: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export type UserProfileResponse = {
  fullName: string;
  email: string;
  documentType: string;
  documentNumber: string;
  phone: string;
};

export type RegisterResponse = {
  message?: string;
};
