import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import ApiService from '../../utils/ApiService';

interface FormInput {
  transactionType: 'INCOME' | 'EXPENSE';
  amount: number;
  accountId: number;
  transactionDate: string;
  description: string;
}

export default function AccountForm() {
  const [transactionType, setTransactionType] = useState<FormInput['transactionType']>('INCOME');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const formData = {
      ...data,
      transactionType,
    };

    const res = await ApiService.post('account/transaction', formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column' }}>
      <div>
        <div
          onClick={() => {
            setTransactionType('INCOME');
          }}
        >
          수입
        </div>
        <div
          onClick={() => {
            setTransactionType('EXPENSE');
          }}
        >
          지출
        </div>
      </div>
      <input {...register('description')} />
      <input {...register('amount', { valueAsNumber: true })} />
      <input {...register('transactionDate')} />
      <input {...register('accountId')} />
      <button type="submit">등록</button>
    </form>
  );
}
