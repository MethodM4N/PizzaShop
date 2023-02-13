import { Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';

import MainLayout from './layouts/MainLayout';
import Main from './pages/Main';
import PizzaInfo from './pages/PizzaInfo';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import './scss/app.scss';

export const SearchContext = React.createContext();

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Main />} />
        <Route path="pizza/:id" element={<PizzaInfo />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
