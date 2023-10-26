import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { setCategoriesId } from "../redux/slices/filterSlice";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaComponent from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { SearchContext } from "../App";

const Home = () => {
  const dispatch = useDispatch();
  const categoriesId = useSelector((state) => state.filter.categoriesId);

  const { searchValue } = React.useContext(SearchContext);
  let [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [sortType, setSortType] = React.useState({
    name: "популярности",
    sortProperty: "rating",
  });

  const onClickCategory = (id) => {
    dispatch(setCategoriesId(id));
  };
  const categoty = categoriesId > 0 ? `category=${categoriesId}` : "";
  const sortBy = sortType.sortProperty;
  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://6536cc68bb226bb85dd2a293.mockapi.io/items?${categoty}&sortBy=${sortBy}&order=desc`
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoty, sortBy]);

  const skeleton = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const pizzaz = items
    .filter((obj) => {
      return obj.title.toLowerCase().includes(searchValue.toLowerCase());
    })
    .map((obj) => <PizzaComponent key={obj.id} {...obj} />);

  return (
    <>
      <div className="content__top">
        <Categories
          value={categoriesId}
          onClickCategory={(id) => onClickCategory(id)}
        />
        <Sort value={sortType} onClickSort={(id) => setSortType(id)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items_main">{isLoading ? skeleton : pizzaz}</div>
    </>
  );
};

export default Home;
