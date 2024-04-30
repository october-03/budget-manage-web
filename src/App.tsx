import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import SubLayout from './components/layout/SubLayout';
import Home from './pages/home/Home';
import Add from './pages/add/Add';
import AddHistory from './pages/add-history/AddHistory';
import History from './pages/history/History';
import Calendar from './pages/calendar/Calendar';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/add-history" element={<AddHistory />} />
        <Route path="/calendar" element={<Calendar />} />
      </Route>
      <Route element={<SubLayout />}>
        <Route path="/history/:type/:id" element={<History />} />
      </Route>
    </Routes>
  );
}

export default App;
