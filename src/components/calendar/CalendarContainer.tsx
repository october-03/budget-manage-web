import React, { useEffect, useState } from 'react';
import ApiService from '../../utils/ApiService';
import { DailyStat, MonthlyStatsResponse } from '../../types/ApiResponse.dto';
import dayjs from 'dayjs';
import CalendarLine from './CalendarLine';
import DailyHistoryModal from './DailyHistoryModal';
import DateSelector from '../common/DateSelector';

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

  const onClick = (currDate: Date) => {
    setDate(dayjs(currDate).startOf('month').format('YYYY-MM-DD'));
  };

  useEffect(() => {
    fetch();
  }, [date]);

  return (
    <div>
      <div
        style={{
          padding: 20,
        }}
      >
        <DateSelector onClick={onClick} />
      </div>
      {data.map((item) => {
        return <CalendarLine data={item} openModal={openModal} />;
      })}
      {modalOpen && <DailyHistoryModal handleModalClose={closeModal} date={modalDate} />}
    </div>
  );
}
