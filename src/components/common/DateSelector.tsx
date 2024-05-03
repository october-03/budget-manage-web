/* eslint-disable @typescript-eslint/no-use-before-define */
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa6';

export default function DateSelector(props: DateSelectorProps) {
  const { onClick } = props;
  const [date, setDate] = useState(new Date());

  const onClickYear = (isPrev: boolean) => {
    const newDate = dayjs(date)
      .add(isPrev ? -1 : 1, 'year')
      .toDate();

    onClick(newDate);
    setDate(newDate);
  };

  const onClickMonth = (isPrev: boolean) => {
    const newDate = dayjs(date)
      .add(isPrev ? -1 : 1, 'month')
      .toDate();

    onClick(newDate);
    setDate(newDate);
  };

  const monthDisabled = dayjs().endOf('month').isSame(dayjs(date).endOf('month'));

  return (
    <div style={{ display: 'flex' }}>
      <DateComponent
        value={date.getFullYear()}
        onClick={onClickYear}
        disabled={date.getFullYear() === dayjs().year()}
        unit="년"
      />
      <DateComponent value={date.getMonth() + 1} onClick={onClickMonth} disabled={monthDisabled} unit="월" />
    </div>
  );
}

function DateComponent(props: DateComponentProps) {
  const { disabled, onClick, value, unit } = props;

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <FaCaretLeft
        onClick={() => {
          onClick(true);
        }}
      />
      <div>
        {value} {unit}
      </div>
      <FaCaretRight
        color={disabled ? 'gray' : 'black'}
        onClick={() => {
          if (!disabled) {
            onClick(false);
          }
        }}
      />
    </div>
  );
}

type DateComponentProps = {
  disabled: boolean;
  onClick: (isPrev: boolean) => void;
  value: number;
  unit: string;
};

type DateSelectorProps = {
  onClick: (date: Date) => void;
};
