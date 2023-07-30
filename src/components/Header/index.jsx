import React from "react";
import { Link } from "react-router-dom";
import{useSelector} from "react-redux";

import styles from "./Header.module.scss";

import cartImg from "../../assets/ico/basket.svg";
import favorite from "../../assets/ico/favorite.svg";
import profile from "../../assets/ico/profile.svg";
import logo from "../../assets/ico/logo.png";

const Header = () => {
  const cart = useSelector(state => state.cart.cartItems)

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
          <Link to="/cart">
            {cart.length > 0 ? <div className={styles.backgroundAlert}><div className={styles.textAlert}>{cart.length}</div></div> : ''}
            <img src={cartImg} alt="Корзина" />
          </Link>
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
