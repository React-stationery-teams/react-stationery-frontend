import React from 'react';
import { Link } from 'react-router-dom';

import styles from "./Button.module.scss";

const Button = ({text, link='/', ico}) => {
  return (
    <Link to={link} className={styles.background}>
        <div className={styles.text}>{text}</div>
    </Link>
  )
}

export default Button;