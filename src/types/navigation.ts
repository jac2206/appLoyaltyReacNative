export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type MainStackParamList = {
  Home: undefined;
  Profile: undefined;
  QRScanner: undefined;
  Accumulate: { qrData?: any };
  Redeem: { qrData?: any };
};