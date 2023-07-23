import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import styles from "./Product.module.scss";

import { ReactComponent as Add } from "../../assets/ico/add.svg";
import { ReactComponent as Favorite } from "../../assets/ico/favorite.svg";
import fullFavorite from "../../assets/ico/fullFavorite.png";

const Product = ({
  id,
  name,
  price,
  type,
  weight,
  mainPhoto,
  photos,
  description,
  property,
  isAdd = false,
  setFavorite,
  favorite,
}) => {
  const [isAdded, setIsAdded] = React.useState(isAdd);

  const changeToFavorite = async () => {
    if (favorite.find((obj) => obj.id === id)) {
      await axios.delete(`http://192.168.0.104:3001/favorite/${id}`);
      setFavorite(favorite.filter((obj) => obj.id !== id));
    } else {
      const { data } = await axios
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
      setFavorite((prev) => [...prev, data]);
    }
    setIsAdded(!isAdded);
  };

  return (
    <div className={styles.background}>
      {isAdded ? (
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
        <div className={styles.price}>Цена: <div className={styles.cost}>{price} р.</div></div>
        <div className={styles.button}>
          <Add className={styles.add} />
          <div className={styles.text}>В корзину</div>
        </div>
      </div>
    </div>
  );
};

export default Product;
