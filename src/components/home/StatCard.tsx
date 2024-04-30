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
