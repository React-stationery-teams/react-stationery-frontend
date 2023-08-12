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
  id: string;
  mainPhoto: string;
  name: string;
  price: number;
  count: number;
};

const CartItem: React.FC<CartItemProps> = ({
  id,
  mainPhoto,
  name,
  price,
  count,
}) => {
  const dispatch = useDispatch();

  const deleteItem = () => {
    axios.delete(`http://192.168.0.104:3001/cart/${id}`);
    dispatch(removeItem(id));
  };

  const onClickMinus = () => {
    if (count > 1) {
      dispatch(minusItem(id));
    }
  };

  return (
    <div key={id} className={styles.Product}>
      <img src={mainPhoto} alt="Товар" />
      <div className={styles.Description}>
        <div className={styles.Text}>
          <h3>{name}</h3>
          <div className={styles.Cost}>Цена:{price * count}р</div>
        </div>
        <div className={styles.Counter}>
          <div onClick={() => dispatch(setCartItems({ id } as ItemProps))}>
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
