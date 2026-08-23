import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getBalance } from "../services/account.service";
import { useFocusEffect } from "@react-navigation/native";

export function useBalance() {
  const { user } = useAuth();

  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  // useEffect(() => {

  //   async function loadBalance() {

  //     if (!user) return;

  //     try {

  //       const data = await getBalance(
  //         user.documentType,
  //         user.documentNumber
  //       );

  //       setBalance(data.balance);

  //     } catch (error) {
  //       console.log("Error loading balance", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   loadBalance();

  // }, [user]);

  useFocusEffect(
    useCallback(() => {
      async function loadBalance() {
        if (!user) return;

        try {
          const data = await getBalance(user.documentType, user.documentNumber);

          setBalance(data.balance);
        } catch (error) {
          console.log("Error loading balance", error);
        } finally {
          setLoading(false);
        }
      }

      loadBalance();
    }, [user]),
  );

  return {
    balance,
    loading,
  };
}
