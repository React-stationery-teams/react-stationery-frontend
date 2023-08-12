import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import styles from "./Cart.module.scss";


import cartIco from "../../assets/ico/basket-black.svg";
import clear from "../../assets/ico/trash.png";
import smile from "../../assets/ico/favorite-smile.png";

import Button from "../../components/Button";
import ClearPage from "../../components/ClearPage";
import CartItem from "../../components/CartItem";

import { selectCart } from "../../store/cart/cartSlice";
import { clearCart, fetchCart } from "../../store/cart/cartSlice";
import { useAppDispatch } from "../../store/store";

const Cart: React.FC = () => {
  const {totalPrice, cartItems, cartStatus} = useSelector(selectCart)
  const dispatch = useAppDispatch();
  console.log(cartItems)

  React.useEffect(() => {
    dispatch(fetchCart())
  }, []);

  const clearAllCart = () => {
    cartItems.forEach((obj) => axios.delete(`http://192.168.0.104:3001/cart/${obj.id}`))
    dispatch(clearCart());
  }

  return (<>
  {cartItems.length === 0 && cartStatus === "success" ? (
        <ClearPage
          header={"Корзина пуста"}
          text={"Похоже вы еще не добавляли товаров в корзину"}
          smile={smile}
        />
      ) : <div className={styles.Cart}>
      <div className={styles.CartHeader}>
        <div className={styles.CartText}>
          <img src={cartIco} alt="Корзина" />
          <h2>Корзина</h2>
        </div>
        <div onClick={() => clearAllCart()} className={styles.CartClear}>
          <img src={clear} alt="Удалить" />
          <p>Очистить корзину</p>
        </div>
      </div>
      <div className={styles.ProductsList}>
        {cartItems.map((obj) => (
          <CartItem key={obj.id} {...obj}/>
        ))}
      </div>
      <h2>Сумма: {totalPrice}</h2>
      <div className={styles.CartFooter}>
        <Button text="Вернуться" />
        <div className={styles.ButtonBuy}>Оплатить</div>
      </div>
    </div> }
  </>
  );
};

export default Cart;
