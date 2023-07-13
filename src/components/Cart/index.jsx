import React from "react";

import styles from "./Cart.module.scss";
import close from "../../assets/ico/close.png";
import photo from "../../assets/img-test/zakladka.png";

const Cart = ({setOpenCart}) => {
  return (
    <div className={styles.cart}>
      <div className={styles.header}>
        <div className={styles.backgroundButton}>
          <img src={close} />
        </div>
        <h3 className={styles.text}>Корзина</h3>
      </div>
      <div className={styles.products}>
        <div className={styles.background}>
          <img src={photo}/>
          <div className={styles.description}>
            <div className={styles.name}>Закладка "Звездная ночь"</div>
            <div className={styles.price}>
              <div className={styles.cost}>Цена:</div>
              <div>25 р.</div>
            </div>
            <div className={styles.calculator}>
                <div className={styles.backgroundCalculator}>
                    <div className={styles.sign}>+</div>
                </div>
                <h5>1</h5>
                <div className={styles.backgroundCalculator}>
                    <div className={styles.sign}>-</div>
                </div>
            </div>
          </div>
          <div className={styles.backgroundButton}>
          <img src={close} />
        </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
