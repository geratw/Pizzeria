import React from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setCategoriesId, setFilters } from "../redux/slices/filterSlice";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaComponent from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { SearchContext } from "../App";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { listSort } from "../components/Sort";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMonted = React.useRef(false);

  const { categoriesId, sort } = useSelector((state) => state.filter);
  const sortBy = sort.sortProperty;

  const { searchValue } = React.useContext(SearchContext);
  let [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const onClickCategory = (id) => {
    dispatch(setCategoriesId(id));
  };

  const category = categoriesId > 0 ? `category=${categoriesId}` : "";

  const fetchPizzrs = () => {
    setIsLoading(true);
    axios
      .get(
        `https://6536cc68bb226bb85dd2a293.mockapi.io/items?${category}&sortBy=${sortBy}&order=desc`
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
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
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items_main">{isLoading ? skeleton : pizzaz}</div>
    </>
  );
};

export default Home;
