import { api } from './api';

export async function getBalance(documentType: string, documentNumber: string) {
  const response = await api.get(`/accounts/balance/${documentType}/${documentNumber}`);

  return response.data;
}
