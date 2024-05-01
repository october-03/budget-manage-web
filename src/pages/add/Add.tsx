import React, { useState } from 'react';
import CardForm from '../../components/add/CardForm';
import AccountForm from '../../components/add/AccountForm';
import { useForm } from 'react-hook-form';

export default function Add() {
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
