export type Transaction = {
  documentType: string;
  documentNumber: string;
  partnerCode: string;
  locationCode: string;
  amount?: number;
  points?: number;
  reference: string;
};
