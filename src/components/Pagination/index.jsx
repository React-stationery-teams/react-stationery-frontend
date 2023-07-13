import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from "./Pagination.module.scss";

const Pagination = ({setPagination, length}) => {

    const clickPagination = (event) => {
        setPagination(event+1)
        window.scrollTo(0, 0);
      }

  return (
    <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => clickPagination(event.selected)}
        pageRangeDisplayed={8}
        pageCount={length/8}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
  )
}

export default Pagination;