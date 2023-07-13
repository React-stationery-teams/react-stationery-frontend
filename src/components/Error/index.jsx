import React from 'react';

import styles from "./Error.module.scss";

import ClearPage from "../ClearPage/index";
import smile from "../../assets/ico/error-smile.png";

const Erorr = ({header, text}) => {
  return (
    <div className={styles.error}>
        <ClearPage
            header={header}
            text={text}
            smile={smile}
        />
    </div>
  )
}

export default Erorr;