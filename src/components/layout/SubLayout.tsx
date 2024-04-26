import React from 'react';
import { Outlet } from 'react-router-dom';

export default function SubLayout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div>Header</div>
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
    </div>
  );
}
