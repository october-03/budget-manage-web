import React, { useState } from 'react';
import CardForm from '../../components/add/CardForm';
import AccountForm from '../../components/add/AccountForm';
import { useForm } from 'react-hook-form';
import SelectBox from '../../components/common/SelectBox';

export default function Add() {
  const [tab, setTab] = useState<'card' | 'account'>('account');

  const handleClick = (value: string) => {
    setTab(value as 'card' | 'account');
  };

  const typeData = [
    { value: 'account', label: '계좌' },
    { value: 'card', label: '카드' },
  ];

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ padding: 10, flex: 1, maxWidth: 420 }}>
          <SelectBox data={typeData} onClick={handleClick} />
        </div>
      </div>
      {tab === 'card' ? <CardForm /> : <AccountForm />}
    </div>
  );
}
