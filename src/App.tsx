import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import SubLayout from './components/layout/SubLayout';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<div>HOME</div>} />
      </Route>
      <Route element={<SubLayout />}>
        <Route path="sub" element={<div>SUB</div>} />
      </Route>
    </Routes>
  );
}

export default App;
