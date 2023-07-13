import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import styles from "./Header.module.scss";

import cartImg from "../../assets/ico/basket.svg";
import favorite from "../../assets/ico/favorite.svg";
import profile from "../../assets/ico/profile.svg";
import logo from "../../assets/ico/logo.png";

const Header = ({setOpenCart}) => {
  const [cart, setCart] = React.useState([]);

  React.useEffect(() => {
    async function getData() {
    try{
        const url = "http://192.168.0.104:3001/cart";

        await axios.get(url).then((res) => setCart(res.data));
      }catch(err){
      console.log(err);
    }}

    getData();
  }, [])

  return (
    <header>
      <div className={styles.left}>
        <Link to="/">
          <img src={logo} alt="Логотип" />
        </Link>
      </div>
      <div className={styles.right}>
        <div className={styles.cost}>
          <h5>1578 р.</h5>
          <div>
            {cart.length > 0 ? <div className={styles.backgroundAlert}><div className={styles.textAlert}>{cart.length}</div></div> : ''}
            <img src={cartImg} alt="Корзина" />
          </div>
        </div>
        <Link to="/favorite">
          <img src={favorite} alt="Закладки" />
        </Link>
        <Link to="/profile">
          <img src={profile} alt="Профиль" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
