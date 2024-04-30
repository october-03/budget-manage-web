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

export interface BankHistory {
  id: number;
  transaction_type: string;
  amount: number;
  transaction_date: string;
  description: string;
  account_id: number;
}

export interface CardHistory {
  id: number;
  payment_type: string;
  amount: number;
  transaction_date: string;
  description: string;
  card_id: number;
}

export interface BankHistorySearch {
  history: BankHistory[];
  income_amount: number;
  expense_amount: number;
  total_amount: number;
  total_count: number;
}

export interface CardHistorySearch {
  history: CardHistory[];
  full_amount: number;
  installments_amount: number;
  total_amount: number;
  total_count: number;
}

export interface MonthlyStats {
  dailyStats: DailyStat[];
  expense: number;
  income: number;
  card: number;
  balance: number;
}

export interface DailyStat {
  date: string;
  card: number;
  expense: number;
  income: number;
}

export interface Accounts {
  id: number;
  name: string;
  balance: number;
  created_at: string;
}

export interface Cards {
  id: number;
  name: string;
  created_at: string;
}

export interface SearchAccountsResponse extends DefaultResponse<Accounts[]> {}

export interface SearchCardsResponse extends DefaultResponse<Cards[]> {}

export interface MonthlyStatsResponse extends DefaultResponse<MonthlyStats> {}

export interface BankSearchResponse extends DefaultResponse<BankHistorySearch> {}

export interface CardSearchResponse extends DefaultResponse<CardHistorySearch> {}

export interface AllSimpleStatResponse extends DefaultResponse<AllSimpleStat> {}
