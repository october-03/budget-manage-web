import React from 'react';

export default function NavBar() {
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
      <div>홈</div>
      <div>소비캘린더</div>
      <div>추가</div>
    </div>
  );
}
