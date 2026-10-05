import { api } from "./api";

import type { BalanceResponse } from "../types/account";

export async function getBalance(
  documentType: string,
  documentNumber: string,
): Promise<BalanceResponse> {
  const response = await api.get<BalanceResponse>(
    `/accounts/balance/${documentType}/${documentNumber}`,
  );

  return response.data;
}
