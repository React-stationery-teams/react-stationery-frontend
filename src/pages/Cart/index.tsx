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
import Error from "../../components/Error/index";

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
    cartItems.forEach((obj) => axios.delete(`https://e864ead0a6a97fd9.mokky.dev/cart/${obj.id}`))
    dispatch(clearCart());
  }

  return (<>
  {cartItems.length === 0 && cartStatus === "success" ? (
        <ClearPage
          header={"Корзина пуста"}
          text={"Похоже вы еще не добавляли товаров в корзину"}
          smile={smile}
        />
      ) : cartStatus === "success" && cartItems.length !== 0 && <div className={styles.Cart}>
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
          <CartItem key={obj.itemId} {...obj}/>
        ))}
      </div>
      <h2>Сумма: {totalPrice}</h2>
      <div className={styles.CartFooter}>
        <Button text="Вернуться" />
        <div className={styles.ButtonBuy}>Оплатить</div>
      </div>
    </div> }
    {cartStatus === "error" ? <Error header={"#404 Упс!"} text={"Не удалось соединиться с сервером. Попробуйте позже"}/> : null}
  </>
  );
};

export default Cart;
