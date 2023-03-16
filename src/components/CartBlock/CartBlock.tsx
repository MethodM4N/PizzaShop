import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearItems, selectCart } from '../../Redux/Slices/cartSlice';

import trash from '../../assets/img/trash.svg';
import arrow from '../../assets/img/grey-arrow-left.svg';

import CartItem from './CartItem';
import CartEmpty from './CartEmpty';

export const CartBlock: React.FC = () => {
  const dispatch = useDispatch();
  const { items, fullCount, fullPrice } = useSelector(selectCart);
  const onClickClear = () => {
    if (window.confirm('Вы действительно хотите очистить корзину?')) {
      dispatch(clearItems());
    }
  };

  if (!fullPrice) {
    return <CartEmpty />;
  }

  return (
    <div className="container container__cart">
      <div className="cart__top">
        <h2 className="content__title">Корзина</h2>
        <div className="cart__clear" onClick={onClickClear}>
          <img src={trash} alt="trash" />
          <span>Очистить корзину</span>
        </div>
      </div>
      <div className="content__items">
        {items.map((obj) => (
          <CartItem key={obj.id} {...obj} />
        ))}
      </div>
      <div className="cart__bottom">
        <div className="cart__bottom-details">
          <span>
            Всего пицц: <b>{fullCount} шт.</b>
          </span>
          <span>
            Сумма заказа: <b>{fullPrice} ₽</b>
          </span>
        </div>
        <div className="cart__bottom-buttons">
          <Link to="/" className="button button--outline button--add go-back-btn">
            <img src={arrow} alt="backArrow" />
            <span>Вернуться назад</span>
          </Link>
          <div className="button pay-btn">
            <span>Оплатить сейчас</span>
          </div>
        </div>
      </div>
    </div>
  );
};
