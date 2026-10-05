import { useState } from "react";

import { accumulateRequest } from "../services/transaction.service";
import { Transaction } from "../types/transaction";

export function useAccumulate() {
  const [loading, setLoading] = useState(false);

  const submit = async (data: Transaction): Promise<boolean> => {
    setLoading(true);

    try {
      await accumulateRequest(data);
      return true;
    } catch {
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, submit };
}
