import css from "./Pagination.module.css"
import ReactPaginate from "react-paginate"

interface PaginationProps {
  totalNumberOfPages: number;
  currentActivePage: number;
  setPage: (page: number) => void;
}

export default function Pagination({ totalNumberOfPages, currentActivePage, setPage }: PaginationProps) {
  const handlePageClick = (data: { selected: number }) => {
    setPage(data.selected + 1);
  };

  return (
    <ReactPaginate
      pageCount={totalNumberOfPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={2}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      containerClassName={css.pagination}
      activeClassName={css.active}
      onPageChange={handlePageClick} // Використовуємо функцію-обробник
      forcePage={currentActivePage - 1}
      renderOnZeroPageCount={null}
    />
  );
}