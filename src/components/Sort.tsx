import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveSortName, SortPropertyEnum, TActiveSort } from '../Redux/Slices/filterSlice';

export type TSortList = {
    name: string,
    sortProperty: SortPropertyEnum,
}

type TActiveName = {
  activeName: TActiveSort,
}

export const sortList: TSortList[] = [
  { name: 'популярности', sortProperty: SortPropertyEnum.RATING },
  { name: 'цене', sortProperty: SortPropertyEnum.PRICE },
  { name: 'алфавиту', sortProperty: SortPropertyEnum.TITLE },
];

const Sort: React.FC<TActiveName> = React.memo(({activeName}) => {
  const dispatch = useDispatch();
  const popup = useRef<HTMLDivElement>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const onClickSortList = (obj: TSortList) => {
    dispatch(setActiveSortName(obj));
    setIsPopupOpen(false);
  };

  useEffect(() => {
    const closePopup = (event: MouseEvent) => {
      const _event = event as MouseEvent & {
        path: Node[];
      };

      if (popup.current && !_event.path.includes(popup.current)) {
        setIsPopupOpen(false);
      }
    };

    if (isPopupOpen) {
      document.body.addEventListener('click', closePopup);
    }

    return () => document.body.removeEventListener('click', closePopup);
  }, [isPopupOpen]);

  return (
    <div className="sort" ref={popup}>
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setIsPopupOpen(!isPopupOpen)}>{activeName.name}</span>
      </div>
      {isPopupOpen && (
        <div className="sort__popup">
          <ul>
            {sortList.map((obj, i) => (
              <li
                key={i}
                className={activeName.name === obj.name ? 'active' : ''}
                onClick={() => onClickSortList(obj)}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default Sort;
