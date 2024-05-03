import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export default function SubLayout() {
  const navigation = useNavigate();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div>
        <div
          onClick={() => {
            navigation(-1);
          }}
        >
          Back
        </div>
      </div>
      <div style={{ flex: 1, justifyContent: 'center', display: 'flex' }}>
        <Outlet />
      </div>
    </div>
  );
}
