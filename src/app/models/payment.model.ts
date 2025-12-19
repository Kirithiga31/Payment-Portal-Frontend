export interface Card {
  id: number;
  cardNumber: string;
  user: {
    id: number;
    username: string;
    password: string;
  };
}

export interface Payment {
  id: number;
  clientRequestId: string;
  reference: string;
  amount: number;
  currency: string;
  createdAt: string;
  createdBy: string;
  fromCard: Card;
  toCard: Card;
}
