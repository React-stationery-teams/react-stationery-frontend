import React from 'react';
import { Link } from 'react-router-dom';

import styles from "./Button.module.scss";

const Button = () => {
  return (
    <Link to="/" className={styles.background}>
        <div className={styles.text}>Вернуться назад</div>
    </Link>
  )
}

export default Button;