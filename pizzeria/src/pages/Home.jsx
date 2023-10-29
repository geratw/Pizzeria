import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { setCategoriesId, setFilters } from "../redux/slices/filterSlice";
import { axiosPizza } from "../redux/slices/pizzaSlice";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaComponent from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import qs from "qs";
import { Link, useNavigate } from "react-router-dom";
import { listSort } from "../components/Sort";
import { selectFilter } from "../redux/slices/cartSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMonted = React.useRef(false);
  const { item, status } = useSelector((state) => state.pizza);
  const { categoriesId, sort, searchValue } = useSelector(selectFilter);
  const sortBy = sort.sortProperty;

  const onClickCategory = (id) => {
    dispatch(setCategoriesId(id));
  };

  const category = categoriesId > 0 ? `category=${categoriesId}` : "";

  const fetchPizzrs = async () => {
    dispatch(
      axiosPizza({
        category,
        sortBy,
      })
    );
    console.log(item);
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = listSort.find(
        (obj) => obj.sortProperty === params.sortProperty
      );
      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchPizzrs();
    }
    isSearch.current = false;
  }, [category, sortBy]);

  React.useEffect(() => {
    if (isMonted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoriesId,
      });
      navigate(`?${queryString}`);
    }

    isMonted.current = true;
  }, [category, sortBy]);

  const skeleton = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const pizzaz = item
    .filter((obj) => {
      return obj.title.toLowerCase().includes(searchValue.toLowerCase());
    })
    .map((obj) => <PizzaComponent {...obj} />);

  return (
    <>
      <div className="content__top">
        <Categories
          value={categoriesId}
          onClickCategory={(id) => onClickCategory(id)}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error">
          <h2>Произошла ошибка</h2>
          <p>Не удалось получить пиццы.</p>
        </div>
      ) : (
        <div className="content__items_main">
          {status === "loading" ? skeleton : pizzaz}
        </div>
      )}
    </>
  );
};

export default Home;
