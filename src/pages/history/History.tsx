import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CardSearchHistory } from '../../utils/SearchHistory';
import HistoryContainer from '../../components/history/HistoryContainer';
import dayjs from 'dayjs';

export default function History() {
  const { id, type } = useParams() as ParamsType;
  const [startDate, setStartDate] = useState<string>(dayjs().startOf('month').format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState<string>(dayjs().endOf('month').format('YYYY-MM-DD'));
  const [maxDate, setMaxDate] = useState<string>(dayjs().startOf('month').format('YYYY-MM-DD'));

  const prevDate = (dateType: 'month' | 'year') => {
    const newStartDate = dayjs(startDate).subtract(1, dateType).startOf('month').format('YYYY-MM-DD');
    const newEndDate = dayjs(startDate).subtract(1, dateType).endOf('month').format('YYYY-MM-DD');
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  const nextDate = (dateType: 'month' | 'year') => {
    const newStartDate = dayjs(startDate).add(1, dateType).startOf('month').format('YYYY-MM-DD');
    const newEndDate = dayjs(startDate).add(1, dateType).endOf('month').format('YYYY-MM-DD');

    if (dayjs(newStartDate).diff(dayjs(maxDate), 'day') > 0) {
      setStartDate(dayjs(maxDate).startOf('month').format('YYYY-MM-DD'));
      setEndDate(dayjs(maxDate).endOf('month').format('YYYY-MM-DD'));
      return;
    }
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex' }}>
          <div
            onClick={() => {
              prevDate('year');
            }}
          >
            Prev
          </div>
          <div>{dayjs(startDate).year()}</div>
          {dayjs(startDate).year() !== dayjs(maxDate).year() && (
            <div
              onClick={() => {
                nextDate('year');
              }}
            >
              Next
            </div>
          )}
        </div>
        <div style={{ display: 'flex' }}>
          <div
            onClick={() => {
              prevDate('month');
            }}
          >
            Prev
          </div>
          <div>{dayjs(startDate).month() + 1}</div>
          {dayjs(startDate).diff(dayjs(maxDate), 'day') < 0 && (
            <div
              onClick={() => {
                nextDate('month');
              }}
            >
              Next
            </div>
          )}
        </div>
      </div>
      <HistoryContainer type={type} id={id} startDate={startDate} endDate={endDate} />
    </div>
  );
}

type ParamsType = {
  type: 'card' | 'bank';
  id: string;
};
