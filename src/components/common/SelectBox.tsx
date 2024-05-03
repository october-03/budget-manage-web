import React, { useState } from 'react';

export default function SelectBox(props: PropsType) {
  const { data, onClick } = props;
  const [selected, setSelected] = useState(data[0].value);

  const handleClick = (value: string) => {
    setSelected(value);
    onClick(value);
  };

  return (
    <div className="select-container">
      {data.map((item) => {
        return (
          <button
            onClick={() => handleClick(item.value)}
            type="button"
            className={selected === item.value ? 'select-choose' : ''}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

type PropsType = {
  data: DataType[];
  onClick: (data: string) => void;
};

type DataType = {
  value: string;
  label: string;
};
