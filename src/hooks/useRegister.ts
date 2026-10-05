import { useState } from "react";

import { registerRequest } from "../services/auth.service";
import { RegisterRequest } from "../types/user";

export function useRegister() {
  const [loading, setLoading] = useState(false);

  const submit = async (data: RegisterRequest): Promise<boolean> => {
    setLoading(true);

    try {
      await registerRequest(data);
      return true;
    } catch {
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, submit };
}
