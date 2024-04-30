import { BankSearchResponse, CardSearchResponse } from '../types/ApiResponse.dto';
import ApiService from './ApiService';

export const CardSearchHistory = async (req: CardSearchInterface) => {
  const res = await ApiService.get<CardSearchResponse>('search/card-logs', {
    params: req,
  });

  return res;
};

export const BankSearchHistory = async (req: BankSearchInterface) => {
  const res = await ApiService.get<BankSearchResponse>('search/account-logs', {
    params: req,
  });

  return res;
};

interface SearchInterface {
  startDate: string;
  endDate: string;
  page: number;
  searchKeyword?: string;
  transaction_type?: string;
}

export interface CardSearchInterface extends SearchInterface {
  card_id?: number;
}

export interface BankSearchInterface extends SearchInterface {
  account_id?: number;
}
