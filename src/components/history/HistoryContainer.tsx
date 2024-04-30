import React, { useState } from 'react';
import CardHistoryList from './CardHistoryList';
import BankHistoryList from './BankHistoryList';

export default function HistoryContainer(req: PropsType) {
  const { type, id, startDate, endDate } = req;

  const [page, setPage] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isMore, setIsMore] = useState(true);

  const handlePage = () => {
    setPage(page + 1);
  };

  return (
    <div>
      <input
        value={searchKeyword}
        onChange={(e) => {
          setSearchKeyword(e.target.value);
        }}
      />
      {type === 'card' ? (
        <CardHistoryList
          startDate={startDate}
          endDate={endDate}
          id={id}
          page={page}
          isMore={setIsMore}
          searchKeyword={searchKeyword}
          setPage={setPage}
        />
      ) : (
        <BankHistoryList
          startDate={startDate}
          endDate={endDate}
          id={id}
          page={page}
          isMore={setIsMore}
          searchKeyword={searchKeyword}
          setPage={setPage}
        />
      )}
      {isMore && (
        <button onClick={handlePage} type="button">
          더 보기
        </button>
      )}
    </div>
  );
}

type PropsType = {
  type: 'bank' | 'card';
  id?: string;
  startDate: string;
  endDate: string;
};
