import React from "react";
import axios from "axios";

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

import photo from "../../assets/photo-test/bigPhoto.png";

const Cart = () => {
  const [cart, setCart] = React.useState([]);

  React.useEffect(() => {
    async function getData() {
      try {
        const url = "http://192.168.0.104:3001/cart";

        await axios.get(url).then((res) => setCart(res.data));
      } catch (err) {
        console.log(err);
      }
    }

    getData();
  }, []);

  const deleteItem = (id) => {
    axios.delete(`http://192.168.0.104:3001/cart/${id}`);
    setCart(cart.filter((obj) => obj.id !== id));
  }

  return cart.length !== 0 ? (
    <div className={styles.Cart}>
      <div className={styles.CartHeader}>
        <div className={styles.CartText}>
          <img src={cartIco} alt="Корзина" />
          <h2>Корзина</h2>
        </div>
        <div className={styles.CartClear}>
          <img src={clear} alt="Удалить" />
          <p>Очистить корзину</p>
        </div>
      </div>
      <div className={styles.ProductsList}>
        {cart.map((obj) => <div key={obj.id} className={styles.Product}>
          <img src={obj.mainPhoto} alt="Товар" />
          <div className={styles.Description}>
            <h2>{obj.name}</h2>
            <div className={styles.Cost}>Цена:{obj.price}р</div>
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
          <div onClick={() => deleteItem(obj.id)} className={styles.DeleteButton}>
            <Delete />
          </div>
        </div>)

        }
      </div>
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
