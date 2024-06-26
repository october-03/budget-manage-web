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
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div style={{ flex: 1 }}>
        <div className="form-input">
          <p>계좌명</p>
          <input {...register('name', { required: true })} />
        </div>
        <div className="form-input">
          <p>초기 잔액</p>
          <input type="number" {...register('initBalance', { required: true })} />
        </div>
      </div>
      <button type="submit" className="form-submit">
        등록
      </button>
    </form>
  );
}
