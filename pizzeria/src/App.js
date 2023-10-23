import React from "react";
import "./scss/app.scss";
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaComponent from "./components/PizzzaBlock";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div s="content">
        <div s="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
          <PizzaComponent title="Мексиканская" price="300"/>
          <PizzaComponent title="Мексиканская" price= {300}/>
          
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
