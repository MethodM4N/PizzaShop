import React from 'react';
import { useDispatch } from 'react-redux';

import { addToCart, removeItem, minusItem, TItems } from '../../Redux/Slices/cartSlice';

import cross from '../../assets/img/cross.svg';
import minus from '../../assets/img/minus.svg';
import plus from '../../assets/img/plus.svg';

type TCartItem = {
  id: string;
  title: string;
  size: number;
  doughType: string;
  price: number;
  count: number;
  imageUrl: string;
};

const CartItem: React.FC<TCartItem> = ({ id, title, size, doughType, price, count, imageUrl }) => {
  const dispatch = useDispatch();

  const onClickAddToCart = () => {
    const item = { id, price } as TItems;
    dispatch(addToCart(item));
  };

  const onClickMinusFromCart = () => {
    const item = id;
    dispatch(minusItem(item));
  };

  const onClickRemoveFromCart = () => {
    if (window.confirm('Вы действительно хотите удалить продукт из корзины?')) {
      const item = id;
      dispatch(removeItem(item));
    }
  };

  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </div>
      <div className="cart__item-info">
        <h3>{title}</h3>
        <p>
          {doughType}, {size} см.
        </p>
      </div>
      <div className="cart__item-count">
        <button
          className="button button--outline button--circle cart__item-count-minus"
          onClick={count === 1 ? onClickRemoveFromCart : onClickMinusFromCart}>
          <img src={minus} alt="minus-button" />
        </button>
        <b>{count}</b>
        <div
          className="button button--outline button--circle cart__item-count-plus"
          onClick={onClickAddToCart}>
          <img src={plus} alt="plus-button" />
        </div>
      </div>
      <div className="cart__item-price">
        <b>{price * count} ₽</b>
      </div>
      <div className="cart__item-remove">
        <div className="button button--outline button--circle" onClick={onClickRemoveFromCart}>
          <img src={cross} alt="cross-button" />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
