import React from "react";
import axios from "axios";
import debounce from "lodash.debounce";

import styles from "./Parameters.module.scss";
import Error from "../Error/index";

import searchImg from "../../assets/ico/search.svg";

type ParameterProps = {
  changeParameter: (id: number) => void,
  changeSearchValue: (value: string) => void,
  setSearchValue: React.Dispatch<React.SetStateAction<string>>,
  searchValue: string
};

const Parameters: React.FC<ParameterProps> = ({
  changeParameter,
  changeSearchValue,
  setSearchValue,
  searchValue,
}) => {
  const [parameters, setParameters] = React.useState([]);
  const [error, setError] = React.useState("");

  //получение параметров фильтрации
  React.useEffect(() => {
    async function getData() {
      let apiUrl = "http://192.168.0.104:3001/parameters";
      try {
        await axios.get(apiUrl).then((res) => {
          setParameters(res.data);
        });
      } catch (err: any) {
        setError(err.message);
        console.log(err);
      }
    }

    getData();
  }, []);

  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      changeSearchValue(str);
    }, 700),
    []
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  const clearSearchValue = () => {
    changeSearchValue("");
    setSearchValue("");
  };

  return error !== "" ? (
    <Error
      header={error}
      text={"Похоже возникли непредвиденные обстоятельства :("}
    />
  ) : (
    <div className={styles.parameters}>
      <div className={styles.parametersBlock}>
        {parameters.map((obj: any) => (
          <div
            key={obj.id}
            onClick={() => changeParameter(obj.id)}
            className={styles.background}
          >
            <div className={styles.text}>{obj.name}</div>
          </div>
        ))}
      </div>
      <div className={styles.search}>
        <img src={searchImg} alt="Поиск" />
        <div className={styles.separator}></div>
        <input
          value={searchValue}
          onChange={onChangeInput}
          placeholder="Название товара..."
        />
        {searchValue ? (
          <div className={styles.clearInput} onClick={() => clearSearchValue()}>
            X
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Parameters;
