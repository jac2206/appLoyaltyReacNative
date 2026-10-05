import { useState } from "react";

import { redeemRequest } from "../services/transaction.service";
import { Transaction } from "../types/transaction";

export function useRedeem() {
  const [loading, setLoading] = useState(false);

  const submit = async (data: Transaction): Promise<boolean> => {
    setLoading(true);

    try {
      await redeemRequest(data);
      return true;
    } catch {
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, submit };
}
