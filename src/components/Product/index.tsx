import React from "react";
import { Link } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import{ useDispatch} from "react-redux";

import styles from "./Product.module.scss";

import { ReactComponent as Add } from "../../assets/ico/add.svg";
import { ReactComponent as Favorite } from "../../assets/ico/favorite.svg";
import fullFavorite from "../../assets/ico/fullFavorite.png";

import { setItems, removeItem, FavoriteItem } from "../../store/favorite/favoriteSlice";
import { setCartItems } from "../../store/cart/cartSlice";

type ProductProps = {
  id: string,
  name: string,
  price: number,
  type: number,
  weight: number,
  mainPhoto: string,
  photos: string[],
  description: string,
  property: string,
  favorite: FavoriteItem[],
  isAddToFavorite: boolean,
  isAddToCart: boolean,
}

type Data = {
  id: string,
  name: string,
  price: number,
  type: number,
  weight: number,
  mainPhoto: string,
  photos: string[],
  description: string
}

const Product: React.FC<ProductProps> = ({
  id,
  name,
  price,
  type,
  weight,
  mainPhoto,
  photos,
  description,
  property,
  favorite,
  isAddToFavorite = false,
  isAddToCart = false,
}) => {
  const [isAddedToFavorite, setIsAddedToFavorite] = React.useState(isAddToFavorite);
  const [isAddedToCart, setIsAddedToCart] = React.useState(isAddToCart);
  const dispatch = useDispatch();

  const changeToFavorite = async () => {
    if (favorite.find((obj) => obj.id === id)) {
      await axios.delete(`http://192.168.0.102:3001/favorite/${id}`);
      dispatch(removeItem(id));
    } else {
      await axios
        .post("http://192.168.0.102:3001/favorite", {
          id: id,
          name: name,
          price: price,
          type: type,
          weight: weight,
          mainPhoto: mainPhoto,
          photos: photos,
          description: description,
          property: property,
        }).then((response: AxiosResponse) =>dispatch(setItems(response.data)))
        .catch((error) => console.log(error));
    }
    setIsAddedToFavorite(!isAddedToFavorite);
  };

  const addToCart = async () => {
  await axios
        .post("http://192.168.0.102:3001/cart", {
          id: id,
          name: name,
          price: price,
          type: type,
          weight: weight,
          mainPhoto: mainPhoto,
          photos: photos,
          description: description,
          property: property,
          count: 1
        }).then((response: AxiosResponse) => dispatch(setCartItems(response.data)))
        .catch((error) => console.log(error));
    setIsAddedToCart(true);
  };

  return (
    <div className={styles.background}>
      {isAddedToFavorite ? (
        <img
          onClick={() => changeToFavorite()}
          src={fullFavorite}
          className={styles.fullFavorite}
          alt="Сердце"
        />
      ) : (
        <Favorite
          onClick={() => changeToFavorite()}
          className={styles.favorite}
        />
      )}
      <img src={mainPhoto} alt="Товар" />
      <div className={styles.description}>
        <Link to="/product" className={styles.name}>
          {name}
        </Link>
      </div>
      <div className={styles.down}>
        <div className={styles.price}>
          Цена: <div className={styles.cost}>{price} р.</div>
        </div>
        {isAddedToCart ? (
          <div className={styles.buttonAdded}>
            <div className={styles.text}>В корзине</div>
          </div>
        ) : (
          <div onClick={() => addToCart()} className={styles.button}>
            <Add className={styles.add} />
            <div className={styles.text}>В корзину</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
