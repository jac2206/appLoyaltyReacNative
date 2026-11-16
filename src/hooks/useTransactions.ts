import { useCallback, useEffect, useRef, useState } from "react";

import { useAuth } from "../context/AuthContext";
import { getTransactionsRequest } from "../services/transaction.service";
import type { TransactionRecord, TransactionType } from "../types/transaction";

export type TransactionFilter = "ALL" | TransactionType;

export function useTransactions(filter: TransactionFilter) {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<TransactionRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const requestVersion = useRef(0);

  const loadTransactions = useCallback(async () => {
    const version = ++requestVersion.current;
    if (!user) {
      setTransactions([]);
      setError(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(false);

    try {
      const types: TransactionType[] = filter === "ALL" ? ["ACUM", "REDEM"] : [filter];
      const responses = await Promise.all(
        types.map((type) =>
          getTransactionsRequest(user.documentType, user.documentNumber, type),
        ),
      );
      const nextTransactions = responses
        .flatMap((response) => response.transactions)
        .sort(
          (first, second) =>
            new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime(),
        );

      if (version === requestVersion.current) setTransactions(nextTransactions);
    } catch {
      if (version === requestVersion.current) {
        setTransactions([]);
        setError(true);
      }
    } finally {
      if (version === requestVersion.current) setLoading(false);
    }
  }, [filter, user]);

  useEffect(() => {
    void loadTransactions();
    return () => {
      requestVersion.current += 1;
    };
  }, [loadTransactions]);

  return { transactions, loading, error, reload: loadTransactions };
}
