import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import ApiService from '../../utils/ApiService';
import { Cards, SearchCardsResponse } from '../../types/ApiResponse.dto';
import dayjs from 'dayjs';
import SelectBox from '../common/SelectBox';

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
  const [cards, setCards] = useState<Cards[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const formData = {
      ...data,
      paymentType,
      transactionDate: dayjs(data.transactionDate).format('YYYY-MM-DD HH:mm'),
    };

    const res = await ApiService.post('card/transaction', formData);
  };

  const fetch = async () => {
    const res = await ApiService.get<SearchCardsResponse>('card/all');
    setCards(res.data);
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleClick = (value: string) => {
    setPaymentType(value as 'FULL' | 'INSTALLMENTS');
  };

  const typeData = [
    { value: 'FULL', label: '일시불' },
    { value: 'INSTALLMENTS', label: '할부' },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div style={{ flex: 1 }}>
        <div style={{ marginBottom: 20 }}>
          <SelectBox data={typeData} onClick={handleClick} />
        </div>
        {paymentType === 'INSTALLMENTS' && (
          <div className="form-input">
            <p>할부 개월 수</p>
            <input {...register('installmentMonths', { required: true })} />
          </div>
        )}
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
          <p>카드</p>
          {/* <input {...register('cardId')} /> */}
          <select {...register('cardId', { required: true })}>
            {cards.map((card) => {
              return (
                <option key={card.id} value={card.id}>
                  {card.name}
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
