import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import "../scss/app.scss";

const FullPizza = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pizza, setPizza] = React.useState();

  React.useEffect(() => {
    async function fetchFullPizza() {
      try {
        const { data } = await axios.get(
          `https://6536cc68bb226bb85dd2a293.mockapi.io/items/` + id
        );
        setPizza(data);
      } catch (error) {
        alert("Ошибка, такой пиццы не существует");
        navigate(`/`);
      }
    }
    fetchFullPizza();
  }, []);

  if (!pizza) {
    return "загрузка";
  }

  return (
    <div className="full-pizza-div">
      <h1>{pizza.title}</h1>

      <img src={pizza.imageUrl} alt="лого пиццы" />
      <h2>Стоимость {pizza.price} ₽</h2>
    </div>
  );
};

export default FullPizza;
