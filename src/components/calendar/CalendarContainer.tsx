import React, { useEffect, useState } from 'react';
import ApiService from '../../utils/ApiService';
import { DailyStat, MonthlyStatsResponse } from '../../types/ApiResponse.dto';
import dayjs from 'dayjs';
import CalendarLine from './CalendarLine';
import DailyHistoryModal from './DailyHistoryModal';

export default function CalendarContainer() {
  const [data, setData] = useState<DailyStat[][]>([]);
  const [date, setDate] = useState<string>(dayjs().startOf('month').format('YYYY-MM-DD'));
  const [maxDate, setMaxDate] = useState<string>(dayjs().startOf('month').format('YYYY-MM-DD'));
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalDate, setModalDate] = useState<string>('');

  const closeModal = () => {
    setModalOpen(false);
  };

  const openModal = (targetDate: string) => {
    setModalOpen(true);
    setModalDate(targetDate);
  };

  const fetch = async () => {
    const res = await ApiService.get<MonthlyStatsResponse>(`/search/monthly-stats/${dayjs(date).format('YYYY-MM')}`);
    const dailyArray = res.data.dailyStats;
    const unshifTarget = dayjs(res.data.dailyStats[0].date).day();
    const pushTarget = 7 - dayjs(res.data.dailyStats[res.data.dailyStats.length - 1].date).day() - 1;

    for (let i = 0; i < unshifTarget; i += 1) {
      dailyArray.unshift({ date: '', card: 0, expense: 0, income: 0 });
    }

    for (let i = 0; i < pushTarget; i += 1) {
      dailyArray.push({ date: '', card: 0, expense: 0, income: 0 });
    }

    const dividedArrays: DailyStat[][] = [];
    for (let i = 0; i < dailyArray.length; i += 7) {
      const subArray = dailyArray.slice(i, i + 7);
      dividedArrays.push(subArray);
    }

    setData(dividedArrays);
  };

  const prevDate = (dateType: 'month' | 'year') => {
    const newDate = dayjs(date).subtract(1, dateType).startOf('month').format('YYYY-MM-DD');
    setDate(newDate);
  };

  const nextDate = (dateType: 'month' | 'year') => {
    const newDate = dayjs(date).add(1, dateType).startOf('month').format('YYYY-MM-DD');

    if (dayjs(newDate).diff(dayjs(maxDate), 'day') > 0) {
      setDate(dayjs(maxDate).startOf('month').format('YYYY-MM-DD'));
      return;
    }
    setDate(newDate);
  };

  useEffect(() => {
    fetch();
  }, [date]);

  return (
    <div>
      <div
        style={{
          display: 'flex',
        }}
      >
        <div style={{ display: 'flex' }}>
          <div
            onClick={() => {
              prevDate('year');
            }}
          >
            <p>prev</p>
          </div>
          <div>{dayjs(date).year()}</div>
          <div
            onClick={() => {
              nextDate('year');
            }}
          >
            <p>next</p>
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <div
            onClick={() => {
              prevDate('month');
            }}
          >
            <p>prev</p>
          </div>
          <div>{dayjs(date).month() + 1}</div>
          <div
            onClick={() => {
              nextDate('month');
            }}
          >
            <p>next</p>
          </div>
        </div>
      </div>
      {data.map((item) => {
        return <CalendarLine data={item} openModal={openModal} />;
      })}
      {modalOpen && <DailyHistoryModal handleModalClose={closeModal} date={modalDate} />}
    </div>
  );
}
