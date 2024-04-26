import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import ApiService from '../../utils/ApiService';

interface FormInput {
  name: string;
  paymentDate: number;
  paymentAccountId: number;
}

export default function CardForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const res = await ApiService.post('card/register', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column' }}>
      <input {...register('name', { required: true })} />
      <input type="number" {...register('paymentDate', { required: true, min: 0, max: 31 })} />
      {(errors.paymentDate?.type === 'min' || errors.paymentDate?.type === 'max') && (
        <p role="alert">유효한 결제일을 입력해주세요.</p>
      )}
      <input type="number" {...register('paymentAccountId', { required: true })} />
      <button type="submit">등록</button>
    </form>
  );
}
