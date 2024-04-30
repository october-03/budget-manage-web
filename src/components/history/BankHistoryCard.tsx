import React from 'react';
import { Bank, Card } from '../../types/ApiResponse.dto';
import dayjs from 'dayjs';

export default function BankHistoryCard(req: PropsType) {
  const { data } = req;
  const { id, amount, account_id, description, transaction_type, transaction_date } = data;
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <p>{description}</p>
        <p>{dayjs(transaction_date).format('YYYY-MM-DD HH:mm')}</p>
      </div>
      <div>{amount}</div>
    </div>
  );
}

type PropsType = {
  data: Bank;
};
