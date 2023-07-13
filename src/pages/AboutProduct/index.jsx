import React from "react";
import styles from "./AboutProduct.module.scss";

import bigPhoto from "../../assets/photo-test/bigPhoto.png";
import { ReactComponent as Add } from "../../assets/ico/add.svg";
import{ReactComponent as Favorite} from "../../assets/ico/favorite.svg";

const AboutProduct = () => {
  return (
    <div className={styles.product}>
      <div className={styles.top}>
        <div className={styles.picturesBlock}>
          <Favorite className={styles.favorite}/>
          <img src={bigPhoto} className={styles.firstPicture} alt="Товар" />
          <div className={styles.pictures}>
            <img className={styles.picture} src={bigPhoto} alt="Товар" />
            <img className={styles.picture} src={bigPhoto} alt="Товар" />
            <img className={styles.picture} src={bigPhoto} alt="Товар" />
            <img className={styles.picture} src={bigPhoto} alt="Товар" />
          </div>
        </div>
        <div className={styles.description}>
          <h1>Закладка «Звёздная ночь»</h1>
          <div className={styles.parameters}>Артикул: р6557496</div>
          <h3>Характеристики:</h3>
          <div className={styles.parameters}>Раздел: Школьные</div>
          <div className={styles.parameters}>Формат: 40x205 мм</div>
          <div className={styles.parameters}>Вес: 0.00 кг</div>
          <div className={styles.cost}>
            <div className={styles.text}>Цена:</div>
            <div className={styles.price}>25 р.</div>
          </div>
          <div className={styles.button}>
            <Add className={styles.add} />
            <div className={styles.text}>В корзину</div>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.header}>
          <div className={styles.separator}></div>
          <h4>Описание</h4>
        </div>
        <div className={styles.text}>
          <p>
            {" "}
            Знаете ли вы, что самое раннее упоминание книжных закладок относится
            к XVI-му веку? Серебряную закладку для книг подарили королеве Англии
            Елизавете I. С тех пор появилось множество разных видов закладок.
            Например, такой, из гибкого пластика. Закладку украшает репродукция
            картины Ван Гога «Звёздная ночь». С ней вы точно не потеряете
            интересное место в книге.{" "}
          </p>
          <br />
          Размер: 4 х 20 см
          <br />
          Материал: пластик
          <br />
          Страна-производитель: Китай.
        </div>
      </div>
    </div>
  );
};

export default AboutProduct;
