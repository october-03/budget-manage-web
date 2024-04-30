import React, { useState } from 'react';
import HistoryContainer from '../history/HistoryContainer';

export default function DailyHistoryModal(props: PropsType) {
  const { handleModalClose, date } = props;
  const [type, setType] = useState<'card' | 'bank'>('bank');

  return (
    <div className="daily-history-modal">
      <div onClick={handleModalClose} />
      <div>
        <div>
          <div>
            <div
              onClick={() => {
                setType('card');
              }}
            >
              카드
            </div>
            <div
              onClick={() => {
                setType('bank');
              }}
            >
              계좌
            </div>
          </div>
        </div>
        <HistoryContainer startDate={date} endDate={date} type={type} id="1" />
      </div>
    </div>
  );
}

type PropsType = {
  handleModalClose: () => void;
  date: string;
};
