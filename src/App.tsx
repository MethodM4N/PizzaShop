import React, { Suspense } from 'react';
import Loadable from 'react-loadable';
import { Route, Routes } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import Main from './pages/Main';
import './scss/app.scss';

const Cart = Loadable({
  loader: () => import(/* webpackChunkName: "Cart" */ './pages/Cart'),
  loading: () => <div>Идет загрузка корзины...</div>,
});

/* const Cart = React.lazy(() => import('./pages/Cart')); */
const PizzaInfo = React.lazy(() => import(/* webpackChunkName: "PizzaInfo" */ './pages/PizzaInfo'));
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Main />} />
        <Route
          path="pizza/:id"
          element={
            <Suspense fallback={<div>Идет загрузка пиццы...</div>}>
              <PizzaInfo />
            </Suspense>
          }
        />
        <Route path="cart" element={<Cart />} />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Переход по ссылке...</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
