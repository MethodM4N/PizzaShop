import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function PizzaInfo() {
  const [pizza, setPizza] = useState();
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
      <div className="container">
        <img src={pizza.imageUrl} />
        <h2>{pizza.title}</h2>
        <p>Некое описание какой то пиццы</p>
        <h4>{pizza.price} ₽</h4>
      </div>
    );
  }
}

export default PizzaInfo;
