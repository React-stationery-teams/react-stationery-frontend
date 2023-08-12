import React from "react";
import { Link } from "react-router-dom";
import { useSelector} from "react-redux";

import styles from "./Favorite.module.scss";

import ClearPage from "../../components/ClearPage";

import smile from "../../assets/ico/favorite-smile.png";
import arrow from "../../assets/ico/back.svg";
import Product from "../../components/Product";
import Error from "../../components/Error/index";

import { fetchFavorite } from "../../store/favorite/favoriteSlice";
import { fetchCart } from "../../store/cart/cartSlice";
import ItemSkeleton from "../../components/Skeletons/ItemSkeleton";
import { selectCart } from "../../store/cart/cartSlice";
import { selectFavorite } from "../../store/favorite/favoriteSlice";
import { useAppDispatch } from "../../store/store";

const Favorite: React.FC = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchFavorite());
    dispatch(fetchCart());
  }, []);

  const { favoriteItems, favoriteStatus} = useSelector(selectFavorite);
  const {cartStatus, cartItems}= useSelector(selectCart);

  return (
    <div className={styles.favorite}>
      <div className={styles.header}>
        <Link to="/" className={styles.back}>
          <img src={arrow} alt="Вернуться" />
        </Link>
        <h3>Мои закладки</h3>
      </div>
      <div className={styles.productList}>
      {favoriteStatus === 'loading' && cartStatus === "loading" ? [...new Array(4)].map(() => <ItemSkeleton />) : favoriteStatus === "success" && cartStatus === "success" ? (
          favoriteItems.map((obj:any) => (
            <Product
              cart={cartItems}
              favorite={favoriteItems}
              isAddToFavorite={favoriteItems.some(
                (product: any) => obj.id === product.id
              )}
              isAddToCart={cartItems.some((product:any) => obj.id === product.id)}
              key={obj.id}
              {...obj}
            />
          ))
        ) : <Error header={"#404 Упс! Пустота..."} text={"Не удалось соединиться с сервером"}/>}
      </div>
    </div>
  )
};

export default Favorite;

