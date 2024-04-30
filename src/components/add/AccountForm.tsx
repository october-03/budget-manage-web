import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import ApiService from '../../utils/ApiService';

interface FormInput {
  name: string;
  initBalance: number;
}

export default function AccountForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const res = await ApiService.post('account/register', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column' }}>
      <div>
        <p>계좌명</p>
        <input {...register('name', { required: true })} />
      </div>
      <div>
        <p>초기 잔액</p>
        <input type="number" {...register('initBalance', { required: true })} />
      </div>
      <button type="submit">등록</button>
    </form>
  );
}
