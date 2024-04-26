import React from 'react';
import { SimpleStat } from '../../types/ApiResponse.dto';

export default function StatCard(props: PropsType) {
  const { stat, type } = props;

  return (
    <div style={{ display: 'flex' }}>
      <div>
        <div>
          <p>{stat.name}</p>
        </div>
        <div>
          <p>{stat.balance} 원</p>
        </div>
      </div>
    </div>
  );
}

type PropsType = {
  stat: SimpleStat;
  type: 'bank' | 'card';
};
