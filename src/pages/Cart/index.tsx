import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "../../components/Button";
import styles from "./Cart.module.scss";
import cartIco from "../../assets/ico/basket-black.svg";
import clear from "../../assets/ico/trash.png";
import ClearPage from "../../components/ClearPage";
import smile from "../../assets/ico/favorite-smile.png";
import { selectCart } from "../../store/cart/cartSlice";

import { clearCart, fetchCart } from "../../store/cart/cartSlice";
import CartItem from "../../components/CartItem";
import axios from "axios";

const Cart: React.FC = () => {
  const {totalPrice, cartItems} = useSelector(selectCart)
  const dispatch = useDispatch();
  console.log(cartItems)

  React.useEffect(() => {
    dispatch(//@ts-ignore
    fetchCart())
  }, []);

  const clearAllCart = () => {
    cartItems.forEach((obj: any) => axios.delete(`http://192.168.0.104:3001/cart/${obj.id}`))
    dispatch(clearCart());
  }

  return cartItems.length !== 0 ? (
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
        {cartItems.map((obj: any) => (
          <CartItem key={obj.id} {...obj}/>
        ))}
      </div>
      <h2>Сумма: {totalPrice}</h2>
      <div className={styles.CartFooter}>
        <Button text="Вернуться" />
        <div className={styles.ButtonBuy}>Оплатить</div>
      </div>
    </div>
  ) : (
    <ClearPage
      header={"Корзина пуста"}
      text={"Похоже вы еще не добавляли товаров в корзину"}
      smile={smile}
    />
  );
};

export default Cart;
