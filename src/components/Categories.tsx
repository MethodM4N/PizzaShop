import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryIndex } from '../Redux/Slices/filterSlice';
import { RootState } from '../Redux/Store';

const Categories: React.FC = React.memo(() => {
  const category = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];
  const dispatch = useDispatch();
  const categoryIndex = useSelector((state: RootState) => state.filterSlice.categoryIndex);

  return (
    <div className="categories">
      <ul>
        {category.map((value, i) => (
          <li
            key={i}
            onClick={() => dispatch(setCategoryIndex(i))}
            className={categoryIndex === i ? 'active' : ''}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
})

export default Categories;
