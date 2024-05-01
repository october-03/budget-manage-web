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
    <div style={{ padding: 10 }}>
      <h3 className="home-card-title">계좌</h3>
      <div className="home-container">
        {stat.bank.map((bank) => {
          return <StatCard stat={bank} type="bank" />;
        })}
      </div>
      <h3 className="home-card-title">카드</h3>
      <div className="home-container">
        {stat.card.map((card) => {
          return <StatCard stat={card} type="card" />;
        })}
      </div>
    </div>
  );
}
