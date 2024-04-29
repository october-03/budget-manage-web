import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import SubLayout from './components/layout/SubLayout';
import Home from './pages/home/Home';
import Add from './pages/add/Add';
import AddHistory from './pages/add-history/AddHistory';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/add-history" element={<AddHistory />} />
      </Route>
      <Route element={<SubLayout />}>
        <Route path="sub" element={<div>SUB</div>} />
      </Route>
    </Routes>
  );
}

export default App;
