import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveSortName, SortPropertyEnum, TActiveSort } from '../Redux/Slices/filterSlice';

import arrow from '../assets/img/arrow-top.svg';

export type TSortList = {
  name: string;
  sortProperty: SortPropertyEnum;
};

type TActiveName = {
  activeName: TActiveSort;
};

type PopupClick = MouseEvent & {
  path: Node[];
};

export const sortList: TSortList[] = [
  { name: 'популярности', sortProperty: SortPropertyEnum.RATING },
  { name: 'цене', sortProperty: SortPropertyEnum.PRICE },
  { name: 'алфавиту', sortProperty: SortPropertyEnum.TITLE },
];

const Sort: React.FC<TActiveName> = React.memo(({ activeName }) => {
  const dispatch = useDispatch();
  const popup = useRef<HTMLDivElement>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const onClickSortList = (obj: TSortList) => {
    dispatch(setActiveSortName(obj));
    setIsPopupOpen(false);
  };

  useEffect(() => {
    const closePopup = (event: MouseEvent) => {
      const _event = event as PopupClick;

      if (popup.current && !_event.composedPath().includes(popup.current)) {
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
        <img src={arrow} alt="arrow" />
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
