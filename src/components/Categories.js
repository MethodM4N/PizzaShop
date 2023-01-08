import { useSelector, useDispatch } from 'react-redux';
import { setCategoryIndex } from '../Redux/Slices/filterSlice';

function Categories() {
  const category = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];
  const dispatch = useDispatch();
  const categoryIndex = useSelector((state) => state.filterSlice.categoryIndex);

  return (
    <div className="categories">
      <ul>
        {category.map((value, i) => (
          <li
            key={i}
            onClick={() => dispatch(setCategoryIndex(i))}
            className={categoryIndex === i ? 'active' : null}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
