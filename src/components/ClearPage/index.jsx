import React from 'react';

import styles from "./ClearPage.module.scss";
import Button from "../../components/Button/index";

const ClearPage = ({smile, header, text}) => {
  return (
    <div className={styles.profile}>
    <div className={styles.header}>
      <h2>{header}</h2>
      <img src={smile} alt="Смайл" />
    </div>
    <h5>{text}</h5>
    <Button text="Вернуться"/>
  </div>
  )
}

export default ClearPage