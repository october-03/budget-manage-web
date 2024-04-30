interface DefaultResponse<T> {
  data: T;
  message: string;
  status: number;
}

export interface SimpleStat {
  balance: number;
  id: number;
  name: string;
}

export interface AllSimpleStat {
  bank: SimpleStat[];
  card: SimpleStat[];
}

export interface Bank {
  id: number;
  transaction_type: string;
  amount: number;
  transaction_date: string;
  description: string;
  account_id: number;
}

export interface Card {
  id: number;
  payment_type: string;
  amount: number;
  transaction_date: string;
  description: string;
  card_id: number;
}

export interface BankSearch {
  history: Bank[];
  income_amount: number;
  expense_amount: number;
  total_amount: number;
  total_count: number;
}

export interface CardSearch {
  history: Card[];
  full_amount: number;
  installments_amount: number;
  total_amount: number;
  total_count: number;
}

export interface BankSearchResponse extends DefaultResponse<BankSearch> {}

export interface CardSearchResponse extends DefaultResponse<CardSearch> {}

export interface AllSimpleStatResponse extends DefaultResponse<AllSimpleStat> {}
