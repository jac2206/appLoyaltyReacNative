import { useCallback, useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";
import { getTransactionsRequest } from "../services/transaction.service";
import { TransactionRecord, TransactionType } from "../types/transaction";

export type TransactionFilter = "ALL" | TransactionType;

export function useTransactions(filter: TransactionFilter) {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<TransactionRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadTransactions = useCallback(async () => {
    if (!user) {
      setTransactions([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(false);

    try {
      const types: TransactionType[] =
        filter === "ALL" ? ["ACUM", "REDEM"] : [filter];
      const responses = await Promise.all(
        types.map((type) =>
          getTransactionsRequest(user.documentType, user.documentNumber, type),
        ),
      );
      const nextTransactions = responses
        .flatMap((response) => response.transactions)
        .sort(
          (first, second) =>
            new Date(second.createdAt).getTime() -
            new Date(first.createdAt).getTime(),
        );

      setTransactions(nextTransactions);
    } catch {
      setTransactions([]);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [filter, user]);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  return { transactions, loading, error, reload: loadTransactions };
}
