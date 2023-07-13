import React from "react";
import axios from "axios";

import styles from "./Home.module.scss";

import Product from "../../components/Product/index";
import Parameters from "../../components/Parameters/index";
import Cart from "../../components/Cart/index";
import Erorr from "../../components/Error/index";
import Pagination from "../../components/Pagination/index";

const Home = () => {
  const [products, setProducts] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [selectParameter, setSelectParameter] = React.useState(0);
  const [pagination, setPagination] = React.useState(0);
  const [error, setError] = React.useState("");

  console.log(pagination);

  const parameter = selectParameter > 0 ? `type=${selectParameter}` : "";
  const searchValue = search ? `name_like=${search}` : "";
  const paginationValue = `_page=${pagination + 1}&_limit=4`;

  //получение товаров
  React.useEffect(() => {
      try {
        let apiUrl = "http://192.168.0.104:3001/products";
        axios.get(apiUrl).then((res) => {
          setProducts(res.data);
        });
      } catch (err) {
        setError(err.message);
        console.log(err);
      }
  }, []);

  return error !== "" ? (
    <Erorr
      header={error}
      text={"Похоже возникли непредвиденные обстоятельства :("}
    />
  ) : (
    <>
      <Parameters
        search={search}
        setSearch={setSearch}
        setSelectParameter={setSelectParameter}
      />
      <h3>Все товары</h3>
      <div className={styles.productList}>
        {products ? (
          products.map((obj) => <Product key={obj.id} {...obj} />)
        ) : (
          <Erorr
            header={"Упс..Пустота..."}
            text={"Похоже товары подходящие под фильтр отсутсвуют"}
          />
        )}
        {/* пофиксить вывод уведомления об отсутсвии товаров */}
      </div>
      <Pagination
        search={search}
        selectParameter={selectParameter}
        length={products}
        setPagination={setPagination}
      />
    </>
  );
};

export default Home;
