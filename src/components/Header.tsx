import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/img/pizza-logo.svg';
import cart from '../assets/img/cart.svg';
import { useSelector } from 'react-redux';

import Search from './Search/Search';

import { RootState } from '../Redux/Store';

const Header: React.FC = () => {
  const location = useLocation();
  const { fullCount, fullPrice, items } = useSelector((state: RootState) => state.cartSlice);
  const firstMount = useRef(true);

  const isPizzaPath = () => {
    while (location.pathname[location.pathname.length - 1] !== '/') {
      return location.pathname.substring(0, location.pathname.length - 1);
    }
  };

  useEffect(() => {
    if (!firstMount.current) {
      const json = JSON.stringify(items);
      localStorage.setItem('cart', json);
    }
    firstMount.current = false;
  }, [items]);

  return (
    <div className="header">
      <div className="container">
        <div className="header__logo">
          <Link to="/">
            <img width="38" src={logo} alt="Pizza logo" />
            <div>
              <h1>Pizza shop</h1>
              <p>самая вкусная пицца во вселенной</p>
            </div>
          </Link>
        </div>
        {(location.pathname !== '/cart' || isPizzaPath() == '/pizza/') && <Search />}
        {(location.pathname == '/cart' || isPizzaPath() == '/pizza/') && fullCount === 0 ? null : (
          <div className="header__cart">
            <Link to="/cart" className="button button__cart">
              <div>
                <span>{fullPrice} ₽</span>
              </div>
              <div>
                <img src={cart} alt="cart" />
                <span>{fullCount}</span>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
