import React from 'react';
import { SimpleStat } from '../../types/ApiResponse.dto';
import { useNavigate } from 'react-router-dom';

export default function StatCard(props: PropsType) {
  const { stat, type } = props;

  const navigation = useNavigate();

  const handleClick = () => {
    navigation(`/history/${type}/${stat.id}`);
  };

  return (
    <div style={{ display: 'flex' }} onClick={handleClick}>
      <div>
        <div style={{ marginBottom: 4 }}>
          <p style={{ color: '#4F5968', fontSize: 12 }}>{stat.name}</p>
        </div>
        <div>
          <p style={{ color: '#333D4B', fontWeight: '600', fontSize: 14 }}>{stat.balance.toLocaleString()} 원</p>
        </div>
      </div>
    </div>
  );
}

type PropsType = {
  stat: SimpleStat;
  type: 'bank' | 'card';
};
