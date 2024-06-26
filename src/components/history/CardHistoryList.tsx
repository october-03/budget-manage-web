import React, { useEffect, useState } from 'react';
import { CardSearchHistory, CardSearchInterface } from '../../utils/SearchHistory';
import { CardHistory } from '../../types/ApiResponse.dto';
import CardHistoryCard from './CardHistoryCard';
import SelectBox from '../common/SelectBox';

export default function CardHistoryList(req: PropsType) {
  const { id, startDate, endDate, searchKeyword, page, isMore, setPage } = req;

  const [data, setData] = useState<CardHistory[]>([]);
  const [count, setCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [fullAmount, setFullAmount] = useState(0);
  const [installMentAmount, setInstallmentAmount] = useState(0);
  const [transactionType, setTransactionType] = useState('all');

  const fetch = async () => {
    const request: CardSearchInterface = {
      startDate,
      endDate,
      page,
    };

    if (id) {
      request.card_id = Number(id);
    }

    if (transactionType !== 'all') {
      request.transaction_type = transactionType;
    }

    if (searchKeyword) {
      request.searchKeyword = searchKeyword;
    }

    const res = await CardSearchHistory(request);

    setCount(res.data.total_count);
    setTotalAmount(res.data.total_amount);
    setFullAmount(res.data.full_amount);
    setInstallmentAmount(res.data.installments_amount);

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

  const transactionTypeData = [
    { value: 'all', label: '전체' },
    { value: 'FULL', label: '일시불' },
    { value: 'INSTALLMENTS', label: '할부' },
  ];

  const onClick = (value: string) => {
    setTransactionType(value);
  };

  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        <SelectBox data={transactionTypeData} onClick={onClick} />
      </div>
      <div>
        <p>총 지출: {totalAmount.toLocaleString()} 원</p>
        <p>일시불: {fullAmount.toLocaleString()} 원</p>
        <p>할부: {installMentAmount.toLocaleString()} 원</p>
      </div>
      <div>
        {data.map((card) => {
          return <CardHistoryCard data={card} />;
        })}
      </div>
    </div>
  );
}

type PropsType = {
  id?: string;
  startDate: string;
  endDate: string;
  searchKeyword?: string;
  page: number;
  isMore: (more: boolean) => void;
  setPage: (page: number) => void;
};
