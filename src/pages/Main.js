import React, { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';

import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

import { setPathParams, selectFilter } from '../Redux/Slices/filterSlice';
import { fetchPizzas } from '../Redux/Slices/apiSlice';

function Main() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const firstMount = useRef(true);
  const isPath = useRef(false);
  const { categoryIndex, activeSort, searchValue } = useSelector(selectFilter);
  const { pizzas, status } = useSelector((state) => state.apiSlice);

  const category = categoryIndex !== 0 ? `category=${categoryIndex}` : ``;
  const search = searchValue ? `&search=${searchValue}` : ``;

  const getPizzas = async () => {
    dispatch(fetchPizzas({ category, search, activeSort }));

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (window.location.search) {
      const path = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((obj) => obj.sortProperty === path.sortProperty);
      dispatch(setPathParams({ ...path, sort }));
      isPath.current = true;
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
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {status === 'error' ? (
            <div className="content__error">
              {' '}
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
}

export default Main;
