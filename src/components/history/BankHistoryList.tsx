import React, { useEffect, useState } from 'react';
import {
  BankSearchHistory,
  BankSearchInterface,
  CardSearchHistory,
  CardSearchInterface,
} from '../../utils/SearchHistory';
import { Bank, Card } from '../../types/ApiResponse.dto';
import CardHistoryCard from './CardHistoryCard';
import BankHistoryCard from './BankHistoryCard';

export default function BankHistoryList(req: PropsType) {
  const { id, startDate, endDate, searchKeyword, page, isMore, setPage } = req;

  const [data, setData] = useState<Bank[]>([]);
  const [count, setCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [expense, setExpense] = useState(0);
  const [income, setIncome] = useState(0);
  const [transactionType, setTransactionType] = useState('all');

  const fetch = async () => {
    const request: BankSearchInterface = {
      account_id: Number(id),
      startDate,
      endDate,
      page,
    };

    if (transactionType !== 'all') {
      request.transaction_type = transactionType;
    }

    if (searchKeyword) {
      request.searchKeyword = searchKeyword;
    }

    const res = await BankSearchHistory(request);

    setCount(res.data.total_count);
    setTotalAmount(res.data.total_amount);
    setExpense(res.data.expense_amount);
    setIncome(res.data.income_amount);

    return res.data.history;
  };

  useEffect(() => {
    fetch().then((res) => {
      setData(data.concat(res));
    });
  }, [id, page]);

  useEffect(() => {
    setData([]);
    if (page === 0) {
      fetch().then((res) => {
        setData(res);
      });
    } else {
      setPage(0);
    }
  }, [transactionType, searchKeyword, startDate, endDate]);

  useEffect(() => {
    data.length === count ? isMore(false) : isMore(true);
  }, [data, count]);

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div
          onClick={() => {
            setTransactionType('all');
          }}
        >
          전체
        </div>
        <div
          onClick={() => {
            setTransactionType('INCOME');
          }}
        >
          수입
        </div>
        <div
          onClick={() => {
            setTransactionType('EXPENSE');
          }}
        >
          지출
        </div>
      </div>
      <div>
        <p>차액: {totalAmount.toLocaleString()} 원</p>
        <p>수입: {income.toLocaleString()} 원</p>
        <p>지출: {expense.toLocaleString()} 원</p>
      </div>
      <div>
        {data.map((account) => {
          return <BankHistoryCard data={account} />;
        })}
      </div>
    </div>
  );
}

type PropsType = {
  id: string;
  startDate: string;
  endDate: string;
  searchKeyword?: string;
  page: number;
  isMore: (more: boolean) => void;
  setPage: (page: number) => void;
};
