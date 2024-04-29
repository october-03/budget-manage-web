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
      <input {...register('name', { required: true })} />
      <input type="number" {...register('initBalance', { required: true })} />
      <button type="submit">등록</button>
    </form>
  );
}