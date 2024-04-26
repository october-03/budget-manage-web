import React, { useEffect, useState } from 'react';
import ApiService from '../../utils/ApiService';
import { AllSimpleStat, AllSimpleStatResponse } from '../../types/ApiResponse.dto';
import dayjs from 'dayjs';
import StatCard from '../../components/home/StatCard';

export default function Home() {
  const [stat, setStat] = useState<AllSimpleStat>({ bank: [], card: [] });

  useEffect(() => {
    const fetchData = async () => {
      const res = await ApiService.get<AllSimpleStatResponse>('search/all');

      setStat(res.data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>{dayjs().format('YYYY년 MM월 현황')}</h1>
      <h3>계좌</h3>
      <div>
        {stat.bank.map((bank) => {
          return <StatCard stat={bank} type="bank" />;
        })}
      </div>
      <h3>카드</h3>
      <div>
        {stat.card.map((card) => {
          return <StatCard stat={card} type="card" />;
        })}
      </div>
    </div>
  );
}
