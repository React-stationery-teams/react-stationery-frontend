import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import{ useDispatch, useSelector} from "react-redux";

import styles from "./Product.module.scss";

import { ReactComponent as Add } from "../../assets/ico/add.svg";
import { ReactComponent as Favorite } from "../../assets/ico/favorite.svg";
import fullFavorite from "../../assets/ico/fullFavorite.png";

import { setItems, removeItem } from "../../store/favorite/favoriteSlice";
import { setCartItems } from "../../store/cart/cartSlice";

type ProductProps = {
  id: string,
  name: string,
  price: number,
  type: number,
  weight: string,
  mainPhoto: string,
  photos: string[],
  description: string,
  property: string,
  favorite: [],
  isAddToFavorite: boolean,
  isAddToCart: boolean,
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
    if (favorite.find((obj: any) => obj.id === id)) {
      await axios.delete(`http://192.168.0.104:3001/favorite/${id}`);
      dispatch(removeItem(id));
    } else {
      const resp: any = await axios
        .post("http://192.168.0.104:3001/favorite", {
          id: id,
          name: name,
          price: price,
          type: type,
          weight: weight,
          mainPhoto: mainPhoto,
          photos: photos,
          description: description,
          property: property,
        })
        .catch((error) => console.log(error));
      dispatch(setItems(resp.data))
    }
    setIsAddedToFavorite(!isAddedToFavorite);
  };

  const addToCart = async () => {
      const resp: any = await axios
        .post("http://192.168.0.104:3001/cart", {
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
        })
        .catch((error) => console.log(error));
        dispatch(setCartItems(resp.data))

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
