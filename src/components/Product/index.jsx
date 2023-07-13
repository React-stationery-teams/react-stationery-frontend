import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import styles from "./Product.module.scss";

import{ReactComponent as Add} from "../../assets/ico/add.svg";
import{ReactComponent as Favorite} from "../../assets/ico/favorite.svg";
import fullFavorite from "../../assets/ico/fullFavorite.png";

const Product = ({id, name, price, type, weight, mainPhoto, photos, description, property}) => {
    const [favorite, setFavorite] = React.useState([]);
    const [addToFavorite, setAddToFavorite] = React.useState(false);

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

    const changeStateFavorite = (id) => {
        setAddToFavorite(!addToFavorite);
    }

  return (
    <div className={styles.background}>
        {addToFavorite ? <img onClick={changeStateFavorite(id)} src={fullFavorite} className={styles.fullFavorite} alt="Сердце"/> : <Favorite onClick={changeStateFavorite(id)} className={styles.favorite}/>}
        <img src={mainPhoto} alt="Товар"/>
        <div className={styles.description}>
            <Link to="/product" className={styles.name}>{name}</Link>
            <div className={styles.down}>
                <div> 
                    <div className={styles.cost}>Цена:</div> 
                    <div>{price} р.</div>
                </div>
                <div className={styles.button}>
                    <Add className={styles.add} />
                <div className={styles.text}>В корзину</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Product;