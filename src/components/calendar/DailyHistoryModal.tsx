import React, { useState } from 'react';
import HistoryContainer from '../history/HistoryContainer';
import SelectBox from '../common/SelectBox';

export default function DailyHistoryModal(props: PropsType) {
  const { handleModalClose, date } = props;
  const [type, setType] = useState<'card' | 'bank'>('card');

  const handleClick = (value: string) => {
    setType(value as 'card' | 'bank');
  };

  const typeData = [
    { value: 'card', label: '카드' },
    { value: 'bank', label: '계좌' },
  ];

  return (
    <div className="daily-history-modal">
      <div onClick={handleModalClose} />
      <div>
        <div style={{ padding: 10, flex: 1, maxWidth: 420 }}>
          <div style={{ marginBottom: 10 }}>
            <SelectBox data={typeData} onClick={handleClick} />
          </div>
          <HistoryContainer startDate={date} endDate={date} type={type} />
        </div>
      </div>
    </div>
  );
}

type PropsType = {
  handleModalClose: () => void;
  date: string;
};
