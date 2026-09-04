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
