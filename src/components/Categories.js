import { useState } from 'react';

function Categories() {
  const [categoryIndex, setCategoryIndex] = useState(0);

  const category = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {category.map((value, i) => (
          <li
            key={i}
            onClick={() => setCategoryIndex(i)}
            className={categoryIndex === i ? 'active' : null}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
