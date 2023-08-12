import React from "react";
import debounce from "lodash.debounce";

import styles from "./Parameters.module.scss";

import searchImg from "../../assets/ico/search.svg";

const parameters = [
  {
    id: 0,
    name: "Все",
  },
  {
    id: 1,
    name: "Для школы",
  },
  {
    id: 2,
    name: "Для офиса",
  },
  {
    id: 3,
    name: "Для черчения",
  },
  {
    id: 4,
    name: "Календари",
  },
  {
    id: 5,
    name: "Альбомы",
  },
  {
    id: 6,
    name: "Обложки и закладки",
  },
  {
    id: 7,
    name: "Блокноты и ежедневники",
  },
];

type ParameterProps = {
  changeParameter: (id: number) => void;
  changeSearchValue: (value: string) => void;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  searchValue: string;
};

const Parameters: React.FC<ParameterProps> = ({
  changeParameter,
  changeSearchValue,
  setSearchValue,
  searchValue,
}) => {
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

  return (
    <div className={styles.parameters}>
      <div className={styles.parametersBlock}>
        {parameters.map((obj) => (
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
