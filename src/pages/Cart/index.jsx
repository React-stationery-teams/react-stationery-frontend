import React from "react";
import Button from "../../components/Button";

import styles from "./Cart.module.scss";
import back from "../../assets/ico/back.svg";
import cart from "../../assets/ico/basket-black.svg";
import clear from "../../assets/ico/trash.png";
import { ReactComponent as Plus } from "../../assets/ico/plus.svg";
import { ReactComponent as Minus } from "../../assets/ico/minus.svg";
import { ReactComponent as Delete } from "../../assets/ico/deleteIco.svg";

import photo from "../../assets/photo-test/bigPhoto.png";

const Cart = () => {
  return (
    <div className={styles.Cart}>
      <div className={styles.CartHeader}>
        <div className={styles.CartText}>
          <img src={cart} alt="Корзина" />
          <h2>Корзина</h2>
        </div>
        <div className={styles.CartClear}>
          <img src={clear} alt="Удалить" />
          <p>Очистить корзину</p>
        </div>
      </div>
      <div className={styles.ProductsList}>
        <div className={styles.Product}>
          <img src={photo} alt="Товар" />
          <div className={styles.Description}>
            <h2>Ручка</h2>
            <div className={styles.Cost}>Цена:25р</div>
          </div>
          <div className={styles.Counter}>
            <div>
              <Plus />
            </div>
            <div>1</div>
            <div>
              <Minus />
            </div>
          </div>
          <div className={styles.DeleteButton}>
            <Delete />
          </div>
        </div>
        <div className={styles.Product}>
          <img src={photo} alt="Товар" />
          <div className={styles.Description}>
            <h2>Ручка</h2>
            <div className={styles.Cost}>Цена:25р</div>
          </div>
          <div className={styles.Counter}>
            <div>
              <Plus />
            </div>
            <div>1</div>
            <div>
              <Minus />
            </div>
          </div>
          <div className={styles.DeleteButton}>
            <Delete />
          </div>
        </div>
        <div className={styles.Product}>
          <img src={photo} alt="Товар" />
          <div className={styles.Description}>
            <h2>Ручка</h2>
            <div className={styles.Cost}>Цена:25р</div>
          </div>
          <div className={styles.Counter}>
            <div>
              <Plus />
            </div>
            <div>1</div>
            <div>
              <Minus />
            </div>
          </div>
          <div className={styles.DeleteButton}>
            <Delete />
          </div>
        </div>
      </div>
      <div className={styles.CartFooter}>
        <Button ico={back} text="Вернуться" />
        <div className={styles.ButtonBuy}>Оплатить</div>
      </div>
    </div>
  );
};

export default Cart;
