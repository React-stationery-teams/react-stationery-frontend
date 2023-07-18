import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import styles from "./Home.module.scss";
import Product from "../../components/Product/index";
import Parameters from "../../components/Parameters/index";
import Cart from "../../components/Cart/index";
import Error from "../../components/Error/index";
import Pagination from "../../components/Pagination/index";
import { setPaginationId } from "../../store/pagination/paginationSlice";
import { setParametersId } from "../../store/filter/filterSlice";

const Home = () => {
  const dispatch = useDispatch();
  const parameterId = useSelector(state => state.filter.parameterId);
  const paginationId = useSelector(state => state.pagination.paginationId);

  const changeParameter = (id) => {
    dispatch(setParametersId(id));
  }

  const changePagination = (id) => {
    dispatch(setPaginationId(id))
  }



  const [products, setProducts] = React.useState([]);
  const [productsLength, setProductLength] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [error, setError] = React.useState("");
  const [favorite, setFavorite] = React.useState([]);

  const parameter = parameterId > 0 ? `type=${parameterId}` : "";
  const searchValue = search ? `name_like=${search}` : "";
  const paginationValue = `_page=${paginationId}&_limit=8`;

  React.useEffect(() => {
  async function getData() {
    try {
      const url = "http://192.168.0.104:3001/favorite";

      await axios.get(url).then((res) => setFavorite(res.data));
    } catch (err) {
      console.log(err);
    }
  }

  getData();
}, []);

  //получение товаров
  React.useEffect(() => {
      try {
        let apiUrl = `http://192.168.0.104:3001/products?${parameter}&${searchValue}&${paginationValue}`;
        axios.get(apiUrl).then((res) => {
          setProducts(res.data);
        });
      } catch (err) {
        setError(err.message);
        console.log(err);
      }
      
  }, [parameter, searchValue, paginationValue]);

  //получение размера массива товаров
  React.useEffect(() => {
    try {
      let apiUrl = `http://192.168.0.104:3001/products?${parameter}&${searchValue}`;
      dispatch(setPaginationId(0))
      axios.get(apiUrl).then((res) => {
        setProductLength(res.data);
      });
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
    
}, [parameter, searchValue]);

  return error !== "" ? (
    <Error
      header={error}
      text={"Похоже возникли непредвиденные обстоятельства :("}
    />
  ) : (
    <>
      <Parameters
        search={search}
        setSearch={setSearch}
        changeParameter={changeParameter}
      />
      <h3>Все товары</h3>
      <div className={styles.productList}>
        {products ? (
          products.map((obj) => <Product setFavorite={setFavorite} favorite={favorite} isAdd={favorite.some((product) => obj.id === product.id )} key={obj.id} {...obj} />)
        ) : (
          <Error
            header={"Упс..Пустота..."}
            text={"Похоже товары подходящие под фильтр отсутсвуют"}
          />
        )}
        {/* пофиксить вывод уведомления об отсутсвии товаров */}
      </div>
      {productsLength.length >=8 ?
        <Pagination
        search={search}
        selectParameter={parameterId}
        length={productsLength.length}
        changePagination={changePagination}
      /> : ""}
    </>
  );
};

export default Home;
