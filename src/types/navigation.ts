export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type QrPayload = {
  type: "ACCUMULATE" | "REDEEM";
  partnerCode: string;
  locationCode: string;
  amount?: number;
  points?: number;
  reference?: string;
};

export type MainStackParamList = {
  Home: undefined;
  Profile: undefined;
  QRScanner: undefined;
  Accumulate: { qrData?: QrPayload };
  Redeem: { qrData?: QrPayload };
};
