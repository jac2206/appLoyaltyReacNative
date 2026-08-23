import { useEffect } from "react";

export function useQRForm({
  route,
  navigation,
  setForm,
  type,
}: {
  route: any;
  navigation: any;
  setForm: any;
  type: "ACCUMULATE" | "REDEEM";
}) {
  useEffect(() => {
    if (route.params?.qrData) {
      const qr = route.params.qrData;

      if (type === "ACCUMULATE") {
        setForm({
          partnerCode: qr.partnerCode,
          locationCode: qr.locationCode,
          amount: qr.amount?.toString() || "",
          reference: qr.reference,
        });
      }

      if (type === "REDEEM") {
        setForm({
          partnerCode: qr.partnerCode,
          locationCode: qr.locationCode,
          points: qr.points?.toString() || "",
          reference: qr.reference,
        });
      }

      navigation.setParams({ qrData: undefined });
    }
  }, [route.params]);
}
