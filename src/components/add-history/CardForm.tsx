import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import ApiService from '../../utils/ApiService';

interface FormInput {
  paymentType: 'FULL' | 'INSTALLMENTS';
  amount: number;
  cardId: number;
  transactionDate: string;
  installmentMonths?: number;
  description: string;
}

export default function CardForm() {
  const [paymentType, setPaymentType] = useState<FormInput['paymentType']>('FULL');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const formData = {
      ...data,
      paymentType,
    };

    const res = await ApiService.post('card/transaction', formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column' }}>
      <div>
        <div
          onClick={() => {
            setPaymentType('FULL');
          }}
        >
          일시불
        </div>
        <div
          onClick={() => {
            setPaymentType('INSTALLMENTS');
          }}
        >
          할부
        </div>
      </div>
      {paymentType === 'INSTALLMENTS' && <input {...register('installmentMonths')} />}
      <input {...register('description')} />
      <input {...register('amount', { valueAsNumber: true })} />
      <input {...register('transactionDate')} />
      <input {...register('cardId')} />
      <button type="submit">등록</button>
    </form>
  );
}
