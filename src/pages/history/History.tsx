import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CardSearchHistory } from '../../utils/SearchHistory';
import HistoryContainer from '../../components/history/HistoryContainer';
import dayjs from 'dayjs';
import DateSelector from '../../components/common/DateSelector';

export default function History() {
  const { id, type } = useParams() as ParamsType;
  const [startDate, setStartDate] = useState<string>(dayjs().startOf('month').format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState<string>(dayjs().endOf('month').format('YYYY-MM-DD'));

  const onClick = (currDate: Date) => {
    setStartDate(dayjs(currDate).startOf('month').format('YYYY-MM-DD'));
    setEndDate(dayjs(currDate).endOf('month').format('YYYY-MM-DD'));
  };

  return (
    <div style={{ padding: 10, maxWidth: 420, flex: 1 }}>
      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex', marginBottom: 10 }}>
          <DateSelector onClick={onClick} />
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
