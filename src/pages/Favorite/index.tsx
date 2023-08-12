import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./Favorite.module.scss";

import arrow from "../../assets/ico/back.svg";
import smile from "../../assets/ico/favorite-smile.png";

import ItemSkeleton from "../../components/Skeletons/ItemSkeleton";
import Product from "../../components/Product";
import Error from "../../components/Error/index";
import ClearPage from "../../components/ClearPage";

import { fetchFavorite } from "../../store/favorite/favoriteSlice";
import { fetchCart } from "../../store/cart/cartSlice";
import { selectCart } from "../../store/cart/cartSlice";
import { selectFavorite } from "../../store/favorite/favoriteSlice";
import { useAppDispatch } from "../../store/store";

const Favorite: React.FC = () => {
  const dispatch = useAppDispatch();
  console.log(smile);

  React.useEffect(() => {
    dispatch(fetchFavorite());
    dispatch(fetchCart());
  }, []);

  const { favoriteItems, favoriteStatus } = useSelector(selectFavorite);
  const { cartStatus, cartItems } = useSelector(selectCart);

  return (<>
    <div className={styles.favorite}>
      <div className={styles.header}>
        <Link to="/" className={styles.back}>
          <img src={arrow} alt="Вернуться" />
        </Link>
        <h3>Мои закладки</h3>
      </div>
      <div className={styles.productList}>
        {favoriteStatus === "loading" &&
          cartStatus === "loading" &&
          [...new Array(4)].map(() => <ItemSkeleton />)}
        {favoriteStatus === "success" &&
          cartStatus === "success" &&
          favoriteItems.length !== 0 &&
          favoriteItems.map((obj) => (
            <Product
              favorite={favoriteItems}
              isAddToFavorite={favoriteItems.some(
                (product) => obj.id === product.id
              )}
              isAddToCart={cartItems.some((product) => obj.id === product.id)}
              key={obj.id}
              {...obj}
            />
          ))}
      </div>
    </div>
    {favoriteItems.length === 0 &&
      favoriteStatus === "success" &&
      cartStatus === "success" && (
        <ClearPage
          header={"Пустота..."}
          text={"Похоже вы еще не добавляли товаров в закладки"}
          smile={smile}
        />
      )}
      {favoriteStatus === "error" || cartStatus === "error" ? <Error header={"#404 Упс!"} text={"Не удалось соединиться с сервером. Попробуйте позже"}/> : null}</>
  );
};

export default Favorite;
