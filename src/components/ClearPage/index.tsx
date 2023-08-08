import React from 'react';

import styles from "./ClearPage.module.scss";
import Button from "../Button/index";

type ClearPageProps = {
  smile: string,
  header: string,
  text: string
}

const ClearPage: React.FC<ClearPageProps> = ({smile, header, text}) => {
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