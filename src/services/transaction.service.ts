import {
  Transaction,
  TransactionsResponse,
  TransactionType,
} from "../types/transaction";
import type { TransactionOperationResponse } from "../types/transaction";
import { api } from "./api";

export async function accumulateRequest(
  data: Transaction,
): Promise<TransactionOperationResponse> {
  const response = await api.post<TransactionOperationResponse>(
    "/transactions/accumulate",
    data,
  );

  return response.data;
}

export async function redeemRequest(
  data: Transaction,
): Promise<TransactionOperationResponse> {
  const response = await api.post<TransactionOperationResponse>(
    "/transactions/redeem",
    data,
  );

  return response.data;
}

export async function getTransactionsRequest(
  documentType: string,
  documentNumber: string,
  type: TransactionType,
): Promise<TransactionsResponse> {
  const response = await api.get<TransactionsResponse>(
    `/transactions/${documentType}/${documentNumber}`,
    {
      params: { type },
    },
  );

  return response.data;
}
