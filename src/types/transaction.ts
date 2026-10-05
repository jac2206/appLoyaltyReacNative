export type Transaction = {
  documentType: string;
  documentNumber: string;
  partnerCode: string;
  locationCode: string;
  amount?: number;
  points?: number;
  reference: string;
};

export type TransactionType = "ACUM" | "REDEM";

export type TransactionRecord = {
  id: string;
  partnerCode: string;
  locationCode: string;
  type: TransactionType;
  points: number;
  amount: string;
  reference: string;
  createdAt: string;
};

export type TransactionsResponse = {
  transactions: TransactionRecord[];
};

export type TransactionOperationResponse = {
  message?: string;
  transaction?: TransactionRecord;
};
