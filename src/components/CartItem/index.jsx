import React from 'react';
import axios from "axios";
import { useDispatch} from "react-redux";

import styles from "./CartItem.module.scss";
import { ReactComponent as Plus } from "../../assets/ico/plus.svg";
import { ReactComponent as Minus } from "../../assets/ico/minus.svg";
import { ReactComponent as Delete } from "../../assets/ico/deleteIco.svg";
import { removeItem } from "../../store/cart/cartSlice"

const CartItem = ({id, mainPhoto, name, price}) => {
    const dispatch = useDispatch();

    const deleteItem = () => {
        axios.delete(`http://192.168.0.104:3001/cart/${id}`);
        dispatch(removeItem(id));
      };

  return (
    <div key={id} className={styles.Product}>
            <img src={mainPhoto} alt="Товар" />
            <div className={styles.Description}>
              <div className={styles.Text}>
                <h3>{name}</h3>
                <div className={styles.Cost}>Цена:{price}р</div>
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
            </div>
            <div
              onClick={() => deleteItem()}
              className={styles.DeleteButton}
            >
              <Delete />
            </div>
          </div>
  )
}

export default CartItem