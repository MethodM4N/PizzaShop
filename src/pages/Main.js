import React, { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import qs from 'qs';

import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

import { setPathParams } from '../Redux/Slices/filterSlice';
import { SearchContext } from '../App';

function Main() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const firstMount = useRef(true);
  const isPath = useRef(false);
  const { searchValue } = useContext(SearchContext);
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { categoryIndex, activeSort } = useSelector((state) => state.filterSlice);

  const category = categoryIndex !== 0 ? `category=${categoryIndex}` : ``;
  const search = searchValue ? `&search=${searchValue}` : ``;

  const fetchPizzas = () => {
    setIsLoading(true);
    axios
      .get(
        `https://63b464300f49ecf50889ba66.mockapi.io/items?sortBy=${activeSort.sortProperty}&order=desc&${category}${search}
      `,
      )
      .then((arr) => {
        setPizzas(arr.data);
        setIsLoading(false);
      });
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
      fetchPizzas();
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
          {isLoading
            ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
            : pizzas.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
        </div>
      </div>
    </>
  );
}

export default Main;
