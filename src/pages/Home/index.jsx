import React from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./Home.module.scss";
import Product from "../../components/Product/index";
import Parameters from "../../components/Parameters/index";
import Error from "../../components/Error/index";
import Pagination from "../../components/Pagination/index";
import { setPaginationId, setPaginationNull } from "../../store/pagination/paginationSlice";
import { setParametersId } from "../../store/filter/filterSlice";
import { setSearchValue } from "../../store/search/searchSlice";
import { fetchItems } from "../../store/products/itemsSlice";
import { fetchCart } from "../../store/cart/cartSlice";
import { fetchFavorite } from "../../store/favorite/favoriteSlice";
import { fetchItemsLength } from "../../store/cartLength/productsLengthSlice";
import ItemSkeleton from "../../components/Skeletons/ItemSkeleton";

const Home = () => {
  const dispatch = useDispatch();
  const parameterId = useSelector((state) => state.filter.parameterId);
  const paginationId = useSelector((state) => state.pagination.paginationId);
  const searchValue = useSelector((state) => state.search.value);
  const { items, status } = useSelector((state) => state.items);
  const productLength = useSelector((state) => state.productsLength.items);
  const {favoriteItems, favoriteStatus} = useSelector((state) => state.favorite);
  const {cartItems, cartStatus} = useSelector((state) => state.cart);
  const [inputValue, setInputValue] = React.useState('');

  const changeParameter = (id) => {
    dispatch(setParametersId(id));
    dispatch(setPaginationNull());
  };

  const changePagination = (id) => {
    dispatch(setPaginationId(id));
  };

  const changeSearchValue = (value) => {
    dispatch(setSearchValue(value));
  };

  const parameter = parameterId > 0 ? `type=${parameterId}` : "";
  const search = searchValue ? `name_like=${searchValue}` : "";
  const paginationValue = `_page=${paginationId}&_limit=8`;

  //получение товаров
  React.useEffect(() => {
    dispatch(
      fetchItems({
        parameter,
        search,
        paginationValue,
      })
    );
    dispatch(fetchCart());
    dispatch(fetchFavorite());
    dispatch(
      fetchItemsLength({
        parameter,
        search,
      })
    );
    setInputValue(searchValue)
  }, [parameter, search, paginationValue]);

  return (
    <>
      <Parameters
        search={search}
        changeParameter={changeParameter}
        changeSearchValue={changeSearchValue}
        setSearchValue={setInputValue}
        searchValue={inputValue}
      />
      <h3>Все товары</h3>
      <div className={styles.productList}>
        {status === "loading"
          ? [...new Array(8)].map(() => <ItemSkeleton />)
          : status === "success" && cartStatus === "success" && favoriteStatus === "success"
          ? items.map((obj) => (
              <Product
                isAddToFavorite={favoriteItems.some(
                  (product) => obj.id === product.id
                )}
                isAddToCart={cartItems.some((product) => obj.id === product.id)}
                key={obj.id}
                favorite={favoriteItems}
                {...obj}
              />
            ))
          : status === "error" || favoriteStatus === "error" || cartStatus === "error" ? (
            <Error header={"#404 Упс! Пустота..."} text={"Не удалось соединиться с сервером"}/>
            ) : null}
      </div>
      {productLength.length >= 8 ? (
        <Pagination
          length={productLength.length}
          search={search}
          selectParameter={parameterId}
          changePagination={changePagination}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Home;
