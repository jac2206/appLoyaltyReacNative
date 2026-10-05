import { useEffect, type Dispatch, type SetStateAction } from "react";

import { QrPayload } from "../types/navigation";

type QrFormState = {
  partnerCode: string;
  locationCode: string;
  amount?: string;
  points?: string;
  reference: string;
};

type QrRoute = {
  params?: {
    qrData?: QrPayload;
  };
};

type QrNavigation = {
  setParams: (params: { qrData?: undefined }) => void;
};

export function useTypedQRForm<T extends QrFormState>({
  route,
  navigation,
  setForm,
  type,
}: {
  route: QrRoute;
  navigation: QrNavigation;
  setForm: Dispatch<SetStateAction<T>>;
  type: "ACCUMULATE" | "REDEEM";
}) {
  useEffect(() => {
    const qr = route.params?.qrData;

    if (!qr) {
      return;
    }

    if (type === "ACCUMULATE") {
      setForm(
        (current) =>
          ({
            ...current,
            partnerCode: qr.partnerCode,
            locationCode: qr.locationCode,
            amount: qr.amount?.toString() || "",
            reference: qr.reference || "",
          }) as T,
      );
    } else {
      setForm(
        (current) =>
          ({
            ...current,
            partnerCode: qr.partnerCode,
            locationCode: qr.locationCode,
            points: qr.points?.toString() || "",
            reference: qr.reference || "",
          }) as T,
      );
    }

    navigation.setParams({ qrData: undefined });
  }, [navigation, route.params, setForm, type]);
}
