import React from 'react';
import { DailyStat } from '../../types/ApiResponse.dto';
import dayjs from 'dayjs';

export default function CalendarBox(props: PropsType) {
  const { data } = props;

  return (
    <div className="calendar-box">
      <div>{data.date !== '' && <p style={{ textAlign: 'center' }}>{dayjs(data.date).date()}</p>}</div>
      <div>
        {data.card !== 0 && (
          <div className="calendar-box-amount-box">
            <p className="calendar-box-amount" style={{ backgroundColor: 'yellow' }}>
              {data.card.toLocaleString()}
            </p>
          </div>
        )}
        {data.income !== 0 && (
          <div className="calendar-box-amount-box">
            <p className="calendar-box-amount" style={{ backgroundColor: 'red' }}>
              {data.income.toLocaleString()}
            </p>
          </div>
        )}
        {data.expense !== 0 && (
          <div className="calendar-box-amount-box">
            <p className="calendar-box-amount" style={{ backgroundColor: 'green' }}>
              {data.expense.toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

type PropsType = {
  data: DailyStat;
};
