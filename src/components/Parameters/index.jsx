import React from "react";
import axios from "axios";

import styles from "./Parameters.module.scss";
import Erorr from "../Error/index";

import searchImg from "../../assets/ico/search.svg";

const Parameters = ({changeParameter, search, setSearch}) => {
  const [parameters, setParameters] = React.useState([]);
  const [error, setError] = React.useState('');

  //получение параметров фильтрации
  React.useEffect(() => {
    async function getData(){
      let apiUrl = "http://192.168.0.104:3001/parameters";
      try{
      await axios.get(apiUrl).then((res) => {
        setParameters(res.data);
      })
      }catch(err){
        setError(err.message);
        console.log(err);
      }
    }

    getData();
  }, [])

  return (error !== '' ? <Erorr
    header={error}
    text={"Похоже возникли непредвиденные обстоятельства :("}
  /> : <div className={styles.parameters}>
    <div className={styles.parametersBlock}>
      {parameters.map((obj) => <div key={obj.id} onClick={() => changeParameter(obj.id)} className={styles.background}><div className={styles.text}>{obj.name}</div></div>)}
    </div>
    <div className={styles.search}>
      <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Название товара..." />
      <div className={styles.separator}></div>
      <img src={searchImg} alt="Поиск" />
    </div>
  </div>
  );
};

export default Parameters;
