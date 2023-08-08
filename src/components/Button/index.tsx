import React from 'react';
import { Link } from 'react-router-dom';

import styles from "./Button.module.scss";

type ButtonProps = {
  text: string,
  ico?: string
}

const Button: React.FC<ButtonProps> = ({text, ico}) => {
  return (
    <Link to="/" className={styles.background}>
        <div className={styles.text}>{text}</div>
    </Link>
  )
}

export default Button;