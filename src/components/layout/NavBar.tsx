import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
  const navigation = useNavigate();
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        paddingBottom: '10px',
        paddingTop: '10px',
        borderTop: '1px solid #ccc',
      }}
    >
      <div
        onClick={() => {
          navigation('/');
        }}
      >
        홈
      </div>
      <div
        onClick={() => {
          navigation('/calendar');
        }}
      >
        소비캘린더
      </div>
      <div
        onClick={() => {
          navigation('/add');
        }}
      >
        추가
      </div>
      <div
        onClick={() => {
          navigation('/add-history');
        }}
      >
        내역 추가
      </div>
    </div>
  );
}
