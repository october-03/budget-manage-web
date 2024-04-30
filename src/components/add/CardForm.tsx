import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import ApiService from '../../utils/ApiService';
import { Accounts, SearchAccountsResponse } from '../../types/ApiResponse.dto';

interface FormInput {
  name: string;
  paymentDate: number;
  paymentAccountId: number;
}

export default function CardForm() {
  const [accountList, setAccountList] = useState<Accounts[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const res = await ApiService.post('card/register', data);
  };

  const fetch = async () => {
    const res = await ApiService.get<SearchAccountsResponse>('account/all');
    setAccountList(res.data);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column' }}>
      <div>
        <p>카드명</p>
        <input {...register('name', { required: true })} />
      </div>
      <div>
        <p>결제일</p>
        <input type="number" {...register('paymentDate', { required: true, min: 0, max: 31 })} />
      </div>
      {(errors.paymentDate?.type === 'min' || errors.paymentDate?.type === 'max') && (
        <p role="alert">유효한 결제일을 입력해주세요.</p>
      )}
      <div>
        <p>결제계좌</p>
        <select {...register('paymentAccountId', { required: true })}>
          {accountList.map((account) => {
            return (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            );
          })}
        </select>
      </div>
      {errors.paymentAccountId && <p role="alert">결제계좌를 선택해주세요.</p>}
      <button type="submit">등록</button>
    </form>
  );
}
