// type User = {
//   id?: string;
//   documentType: 'CC' | 'CE' | 'NIT' | 'PP';
//   documentNumber: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
// };
export type User = {
  userName: string;
  userEmail: string;
};

export type AuthContextType = {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
};