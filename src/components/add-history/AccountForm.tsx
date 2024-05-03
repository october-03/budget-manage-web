import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import ApiService from '../../utils/ApiService';
import { Accounts, SearchAccountsResponse } from '../../types/ApiResponse.dto';
import dayjs from 'dayjs';
import SelectBox from '../common/SelectBox';

interface FormInput {
  transactionType: 'INCOME' | 'EXPENSE';
  amount: number;
  accountId: number;
  transactionDate: string;
  description: string;
}

export default function AccountForm() {
  const [transactionType, setTransactionType] = useState<FormInput['transactionType']>('INCOME');
  const [accountList, setAccountList] = useState<Accounts[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const formData = {
      ...data,
      transactionType,
      transactionDate: dayjs(data.transactionDate).format('YYYY-MM-DD HH:mm'),
    };

    const res = await ApiService.post('account/transaction', formData);
  };

  const fetch = async () => {
    const res = await ApiService.get<SearchAccountsResponse>('account/all');
    setAccountList(res.data);
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleClick = (value: string) => {
    setTransactionType(value as 'INCOME' | 'EXPENSE');
  };

  const typeData = [
    { value: 'INCOME', label: '수입' },
    { value: 'EXPENSE', label: '지출' },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div style={{ flex: 1 }}>
        <div style={{ marginBottom: 20 }}>
          <SelectBox data={typeData} onClick={handleClick} />
        </div>
        <div className="form-input">
          <p>설명</p>
          <input {...register('description', { required: true })} />
        </div>
        <div className="form-input">
          <p>금액</p>
          <input {...register('amount', { valueAsNumber: true, required: true })} />
        </div>
        <div className="form-input">
          <p>거래일</p>
          <input type="datetime-local" {...register('transactionDate', { required: true })} />
        </div>
        <div className="form-input">
          <p>계좌</p>
          {/* <input {...register('accountId')} /> */}
          <select {...register('accountId', { required: true })}>
            {accountList.map((account) => {
              return (
                <option key={account.id} value={account.id}>
                  {account.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <button type="submit" className="form-submit">
        등록
      </button>
    </form>
  );
}
