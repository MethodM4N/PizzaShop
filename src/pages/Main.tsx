import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import qs from 'qs';

import { sortList } from '../components/Sort';
import { Categories, Sort, PizzaBlock, Skeleton } from '../components/index';

import { setPathParams, selectFilter, TActiveSort } from '../Redux/Slices/filterSlice';
import { fetchPizzas } from '../Redux/Slices/apiSlice';
import { RootState, useAppDispatch } from '../Redux/Store';

const Main: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const firstMount = useRef(true);
  const isPath = useRef(false);
  const { categoryIndex, activeSort, searchValue } = useSelector(selectFilter);
  const { pizzas, status } = useSelector((state: RootState) => state.apiSlice);

  const category = categoryIndex !== 0 ? `category=${categoryIndex}` : ``;
  const search = searchValue ? `&search=${searchValue}` : ``;

  const getPizzas = async () => {
    dispatch(fetchPizzas({ category, search, activeSort }));

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (window.location.search) {
      const path = qs.parse(window.location.search.substring(1)) as unknown as TActiveSort;
      const activeSort = sortList.find((obj) => obj.sortProperty === path.sortProperty);
      if (activeSort) {
        dispatch(setPathParams({ ...path, activeSort }));
        isPath.current = true;
      }
    }
  }, []);

  useEffect(() => {
    if (!isPath.current) {
      getPizzas();
    }
    isPath.current = false;
    window.scrollTo(0, 0);
  }, [categoryIndex, activeSort, searchValue]);

  useEffect(() => {
    if (!firstMount.current) {
      const queryString = qs.stringify({
        sortProperty: activeSort.sortProperty,
        categoryIndex,
      });
      navigate(`?${queryString}`);
    }
    firstMount.current = false;
  }, [categoryIndex, activeSort]);

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories />
          <Sort activeName={activeSort} />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {status !== 'error' && status !== 'loading' && pizzas.length == 0 ? (
            <div className="content__error">
              <h2>По вашему поисковому запросу пицц не найдено 😕</h2>
            </div>
          ) : status === 'error' ? (
            <div className="content__error">
              <h2>Произошла непредвиденная ошибка при загрузке пицц 😕</h2>
              <p>Мы уже занимаемся этим вопросом, попробуйте повторить попытку немного позже</p>
            </div>
          ) : status === 'loading' ? (
            [...new Array(6)].map((_, i) => <Skeleton key={i} />)
          ) : (
            pizzas.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
          )}
        </div>
      </div>
    </>
  );
};

export default Main;
