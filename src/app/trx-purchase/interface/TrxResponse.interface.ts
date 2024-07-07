export interface ITrxDetailResponse {
  id: string;
  createdAt: Date;
  totalTransactionPrice: number;
  user: {
    id: string;
    name: string;
    email: string;
  };
  transactionDetails: {
    id: string;
    totalPrice: number;
    quantity: number;
    motorcycle: {
      id: string;
      name: string;
    };
  }[];
}
