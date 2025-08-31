import React from "react";
import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  totalPages: number;
  page: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ totalPages, page, onPageChange }: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={2}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      containerClassName={css.pagination}
      activeClassName={css.active}
      onPageChange={(data) => onPageChange(data.selected + 1)}
      forcePage={page - 1}
      renderOnZeroPageCount={null}
    />
  );
}
