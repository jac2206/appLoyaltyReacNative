type User = {
  id?: string;
  documentType: 'CC' | 'CE' | 'NIT' | 'PP';
  documentNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};