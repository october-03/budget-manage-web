import React from 'react';
import { DailyStat } from '../../types/ApiResponse.dto';
import CalendarBox from './CalendarBox';

export default function CalendarLine(props: PropsType) {
  const { data } = props;

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {data.map((item) => {
        return <CalendarBox data={item} />;
      })}
    </div>
  );
}

type PropsType = {
  data: DailyStat[];
};
