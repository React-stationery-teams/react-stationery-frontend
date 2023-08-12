import React from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { selectPaginationId } from '../../store/pagination/paginationSlice';

import styles from "./Pagination.module.scss";

type PaginationProps = {
  changePagination: (page: number) => void,
  length: number
}

const Pagination: React.FC<PaginationProps> = ({changePagination, length}) => {

    const {paginationId} = useSelector(selectPaginationId)

    const clickPagination = (event: number) => {
        changePagination(event+1)
        window.scrollTo(0, 0);
      }

  return (
    <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => clickPagination(event.selected)}
        pageRangeDisplayed={2}
        pageCount={length/8}
        previousLabel="<"
        renderOnZeroPageCount={null}
        forcePage={paginationId-1}
      />
  )
}

export default Pagination;