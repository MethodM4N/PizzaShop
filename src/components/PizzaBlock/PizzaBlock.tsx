import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { addToCart, TItems } from '../../Redux/Slices/cartSlice';
import { RootState } from '../../Redux/Store';

import plus from '../../assets/img/plus.svg';

type TPizzaBlock = {
  id: string;
  title: string;
  sizes: number[];
  types: number[];
  price: number;
  imageUrl: string;
};

const PizzaBlock: React.FC<TPizzaBlock> = ({ id, title, imageUrl, types, sizes, price }) => {
  const dispatch = useDispatch();
  const [activeType, setTypeIndex] = useState<number>(0);
  const [activeSize, setSizeIndex] = useState<number>(0);
  const doughType: string[] = ['тонкое', 'традиционное'];

  const count = useSelector((state: RootState) =>
    state.cartSlice.items.find(
      (obj) =>
        obj.id === id + `/${sizes[activeSize]}` + `/${doughType[activeType]}` &&
        obj.size === sizes[activeSize],
    ),
  );

  const checkedCount = count ? count.count : null;

  const onClickAddToCart = () => {
    const pizza: TItems = {
      id,
      title,
      price,
      imageUrl,
      doughType: doughType[activeType],
      size: sizes[activeSize],
      count: 0,
    };
    dispatch(addToCart(pizza));
  };

  return (
    <div className="pizza-block">
      <Link to={`/pizza/${id}`}>
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
      </Link>
      <div className="pizza-block__selector">
        <ul>
          {types.map((type, i) => (
            <li
              key={i}
              className={activeType === i ? 'active' : ''}
              onClick={() => setTypeIndex(i)}>
              {doughType[type]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, i) => (
            <li
              key={i}
              className={activeSize === i ? 'active' : ''}
              onClick={() => setSizeIndex(i)}>
              {size}
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <button onClick={onClickAddToCart} className="button button--outline button--add">
          <img src={plus} alt="plus-button" />
          <span>Добавить</span>
          {checkedCount && <i>{checkedCount}</i>}
        </button>
      </div>
    </div>
  );
};

export default PizzaBlock;
