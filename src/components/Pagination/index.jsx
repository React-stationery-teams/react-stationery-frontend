import React from 'react';
import ReactPaginate from 'react-paginate';
import axios from "axios";

import styles from "./Pagination.module.scss";

const Pagination = ({setPagination}) => {
    const [products, setProducts] = React.useState([]);

    const clickPagination = (event) => {
        setPagination(event)
        window.scrollTo(0, 0);
      }
//получение товаров что бы узнать количество
      React.useEffect(() => {
        async function getData() {
          try {
            let apiUrl = "http://192.168.0.104:3001/products";
            await axios.get(apiUrl).then((res) => {
              setProducts(res.data);
            });
          } catch (err) {
            console.log(err);
          }
        }
    
        getData();
      }, []);

  return (
    <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => clickPagination(event.selected)}
        pageRangeDisplayed={4}
        pageCount={Math.round(products.length/4)}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
  )
}

export default Pagination;