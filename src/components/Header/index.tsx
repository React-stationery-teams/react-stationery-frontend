import React from "react";
import { Link } from "react-router-dom";
import{useSelector} from "react-redux";

import styles from "./Header.module.scss";

import cartImg from "../../assets/ico/basket.svg";
import favorite from "../../assets/ico/favorite.svg";
import profile from "../../assets/ico/profile.svg";
import logo from "../../assets/ico/logo.png";

import { selectCart } from "../../store/cart/cartSlice";

const Header: React.FC = () => {
  const {cartItems} = useSelector(selectCart)

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
            {cartItems.length > 0 ? <div className={styles.backgroundAlert}><div className={styles.textAlert}>{cartItems.length}</div></div> : ''}
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
