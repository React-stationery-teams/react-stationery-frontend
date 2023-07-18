import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import styles from "./Favorite.module.scss";

import ClearPage from "../../components/ClearPage";

import smile from "../../assets/ico/favorite-smile.png";
import arrow from "../../assets/ico/back.svg";
import Product from "../../components/Product";

const Favorite = () => {
  const [favorite, setFavorite] = React.useState([]);

  React.useEffect(() => {
    async function getData() {
      try {
        const url = "http://192.168.0.104:3001/favorite";

        await axios.get(url).then((res) => setFavorite(res.data));
      } catch (err) {
        console.log(err);
      }
    }

    getData();
  }, []);
  return favorite ? (
    <div className={styles.favorite}>
      <div className={styles.header}>
        <Link to="/" className={styles.back}>
          <img src={arrow} />
        </Link>
        <h3>Мои закладки</h3>
      </div>
      <div className={styles.productList}>
        {favorite.map((obj) => <Product setFavorite={setFavorite} favorite={favorite} isAdd={favorite.some((product) => obj.id === product.id )} key={obj.id} {...obj} />)}
      </div>
    </div>
  ) : (
      <ClearPage
        header={"Закладки пустые"}
        text={"Вероятней всего, вы ещё ничего не добавляли в закладки."}
        smile={smile}
      />
  );
};

export default Favorite;
