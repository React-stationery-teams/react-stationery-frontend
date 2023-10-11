import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

import styles from "./CartItem.module.scss";

import { ReactComponent as Plus } from "../../assets/ico/plus.svg";
import { ReactComponent as Minus } from "../../assets/ico/minus.svg";
import { ReactComponent as Delete } from "../../assets/ico/deleteIco.svg";

import {
  setCartItems,
  minusItem,
  removeItem,
  ItemProps,
} from "../../store/cart/cartSlice";

type CartItemProps = {
  id: number;
  itemId: string;
  mainPhoto: string;
  name: string;
  price: number;
  count: number;
};

const CartItem: React.FC<CartItemProps> = ({
  id,
  itemId,
  mainPhoto,
  name,
  price,
  count,
}) => {
  const dispatch = useDispatch();

  const deleteItem = () => {
    axios.delete(`https://e864ead0a6a97fd9.mokky.dev/cart/${id}`);
    dispatch(removeItem(itemId));
  };

  const onClickMinus = () => {
    if (count > 1) {
      dispatch(minusItem(itemId));
    }
  };

  return (
    <div key={itemId} className={styles.Product}>
      <img src={mainPhoto} alt="Товар" />
      <div className={styles.Description}>
        <div className={styles.Text}>
          <h3>{name}</h3>
          <div className={styles.Cost}>Цена:{price * count}р</div>
        </div>
        <div className={styles.Counter}>
          <div onClick={() => dispatch(setCartItems({ itemId } as ItemProps))}>
            <Plus />
          </div>
          <div>{count}</div>
          <div onClick={() => onClickMinus()}>
            <Minus />
          </div>
        </div>
      </div>
      <div onClick={() => deleteItem()} className={styles.DeleteButton}>
        <Delete />
      </div>
    </div>
  );
};

export default CartItem;
