import React from "react";
import { useSelector} from "react-redux";

import styles from "./Home.module.scss";
import Product from "../../components/Product/index";
import Parameters from "../../components/Parameters/index";
import Error from "../../components/Error/index";
import Pagination from "../../components/Pagination/index";
import { selectPaginationId, setPaginationId, setPaginationNull } from "../../store/pagination/paginationSlice";
import { selectParametersId, setParametersId } from "../../store/filter/filterSlice";
import { selectSearch, setSearchValue } from "../../store/search/searchSlice";
import { fetchItems } from "../../store/products/itemsSlice";
import { fetchCart } from "../../store/cart/cartSlice";
import { fetchFavorite, selectFavorite } from "../../store/favorite/favoriteSlice";
import { fetchItemsLength, selectAllProducts } from "../../store/productsLength/productsLengthSlice";
import ItemSkeleton from "../../components/Skeletons/ItemSkeleton";
import { selectCart } from "../../store/cart/cartSlice";
import { selectItems } from "../../store/products/itemsSlice";
import { useAppDispatch } from "../../store/store";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const {parameterId} = useSelector(selectParametersId);
  const {paginationId} = useSelector(selectPaginationId);
  const {value} = useSelector(selectSearch);
  const { items, status } = useSelector(selectItems);
  const {allItems} = useSelector(selectAllProducts);
  const {favoriteItems, favoriteStatus} = useSelector(selectFavorite);
  const {cartItems, cartStatus} = useSelector(selectCart);
  const [inputValue, setInputValue] = React.useState('');

  const changeParameter = (id: number) => {
    dispatch(setParametersId(id));
    dispatch(setPaginationNull());
  };

  const changePagination = (id: number) => {
    dispatch(setPaginationId(id));
  };

  const changeSearchValue = (value: string) => {
    dispatch(setSearchValue(value));
  };

  const parameter = parameterId > 0 ? `type=${parameterId}` : "";
  const search = value ? `name_like=${value}` : "";
  const paginationValue = `_page=${paginationId}&_limit=8`;

  //получение товаров
  React.useEffect(() => {
    dispatch(fetchItems({parameter,search,paginationValue})
    );
    dispatch(fetchCart());
    dispatch(fetchFavorite());
    dispatch(fetchItemsLength({ parameter, search}));
    setInputValue(value)
  }, [parameter, search, paginationValue]);

  return (
    <>
      <Parameters
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
          ? items.map((obj: any) => (
              <Product
                isAddToFavorite={favoriteItems.some(
                  (product:any) => obj.id === product.id
                )}
                isAddToCart={cartItems.some((product: any) => obj.id === product.id)}
                key={obj.id}
                favorite={favoriteItems}
                {...obj}
              />
            ))
          : status === "error" || favoriteStatus === "error" || cartStatus === "error" ? (
            <Error header={"#404 Упс! Пустота..."} text={"Не удалось соединиться с сервером"}/>
            ) : null}
      </div>
      {allItems.length >= 8 ? (
        <Pagination
          length={allItems.length}
          changePagination={changePagination}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Home;
