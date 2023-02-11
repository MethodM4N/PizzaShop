import { Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';

import Header from './components/Header';
import Main from './pages/Main';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import './scss/app.scss';

export const SearchContext = React.createContext();

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
