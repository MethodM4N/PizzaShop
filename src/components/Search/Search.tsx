import styles from './Search.module.scss';
import React, { useRef, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';

import { setSearchValue } from '../../Redux/Slices/filterSlice';

import searchIco from '../../assets/img/searchIco.svg';
import cross from '../../assets/img/search-cross.svg';

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [localSearchValue, setLocalSearchValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const onCloseClick = () => {
    setLocalSearchValue('');
    dispatch(setSearchValue(''));
    // два варианта обхода исхода с null в useRef,
    //либо обычным if
    // либо оператором опциональной последовательности, знак вопроса "?"
    /*     if (inputRef.current) {
      inputRef.current.focus();
    } */
    inputRef.current?.focus();
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  const updateSearchValue = useCallback(
    debounce((e) => {
      dispatch(setSearchValue(e));
    }, 600),
    [],
  );

  return (
    <div className={styles.root}>
      <img className={styles.ico} src={searchIco} alt="searchIco" />
      <input
        ref={inputRef}
        value={localSearchValue}
        onChange={(e) => onChangeInput(e)}
        className={styles.input}
        placeholder="Поиск пиццы ..."
      />
      {localSearchValue ? (
        <img
          className={styles.clearIco}
          onClick={() => onCloseClick()}
          src={cross}
          alt="clear-button"
        />
      ) : null}
    </div>
  );
};

export default Search;
