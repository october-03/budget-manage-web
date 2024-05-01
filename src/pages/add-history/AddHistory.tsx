import React, { useState } from 'react';
import CardForm from '../../components/add-history/CardForm';
import AccountForm from '../../components/add-history/AccountForm';

export default function AddHistory() {
  const [tab, setTab] = useState<'card' | 'account'>('card');

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div>
        <div
          onClick={() => {
            setTab('card');
          }}
        >
          카드
        </div>
        <div
          onClick={() => {
            setTab('account');
          }}
        >
          계좌
        </div>
      </div>
      {tab === 'card' ? <CardForm /> : <AccountForm />}
    </div>
  );
}
