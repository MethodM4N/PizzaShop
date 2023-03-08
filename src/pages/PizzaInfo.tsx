import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const PizzaInfo: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const { data } = await axios('https://63b464300f49ecf50889ba66.mockapi.io/items/' + id);
        setPizza(data);
      } catch (err) {
        alert('Произошла ошибка, пицца не найдена, вы будете переведены на главную страницу');
        navigate('/');
      }
    };

    fetchPizza();
  }, []);

  if (!pizza) {
    return (
      <div className="container">
        <h2>Загрузка...</h2>
      </div>
    );
  } else {
    return (
      <>
        <div className="container">
          <img src={pizza.imageUrl} />
          <h2>{pizza.title}</h2>
          <p>Некое описание какой то пиццы</p>
          <h4>{pizza.price} ₽</h4>
        </div>
        <Link to="/" className="button button--outline button--add go-back-btn">
          <span>Вернуться назад</span>
        </Link>
      </>
    );
  }
};

export default PizzaInfo;
