import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "../../components/Button";
import styles from "./Cart.module.scss";
import back from "../../assets/ico/back.svg";
import cartIco from "../../assets/ico/basket-black.svg";
import clear from "../../assets/ico/trash.png";
import ClearPage from "../../components/ClearPage";
import smile from "../../assets/ico/favorite-smile.png";
import { ReactComponent as Plus } from "../../assets/ico/plus.svg";
import { ReactComponent as Minus } from "../../assets/ico/minus.svg";
import { ReactComponent as Delete } from "../../assets/ico/deleteIco.svg";

import { clearCart, fetchCart } from "../../store/cart/cartSlice";
import CartItem from "../../components/CartItem";
import axios from "axios";

const Cart = () => {
  const totalPrice = useSelector(state => state.cart.totalPrice)
  const cart = useSelector(state => state.cart.cartItems)
  const dispatch = useDispatch();
  console.log(cart)

  React.useEffect(() => {
    dispatch(fetchCart())
  }, []);

  const clearAllCart = () => {
    cart.forEach((obj) => axios.delete(`http://192.168.0.104:3001/cart/${obj.id}`))
    dispatch(clearCart());
  }

  return cart.length !== 0 ? (
    <div className={styles.Cart}>
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
        {cart.map((obj) => (
          <CartItem key={obj.id} {...obj}/>
        ))}
      </div>
      <h2>Сумма: {totalPrice}</h2>
      <div className={styles.CartFooter}>
        <Button ico={back} text="Вернуться" />
        <div className={styles.ButtonBuy}>Оплатить</div>
      </div>
    </div>
  ) : (
    <ClearPage
      header={"Корзина пуста"}
      text={"Вероятней всего, вы ещё ничего не добавляли в корзину."}
      smile={smile}
    />
  );
};

export default Cart;
