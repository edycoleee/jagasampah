import { Button } from "@material-ui/core";
import React from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const onPage = (number) => {
    paginate(number);
  };

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <Button color="primary"  onClick={() => onPage(number)} key={number}>{number}</Button>
          // <button onClick={() => onPage(number)} key={number}>
          //   {" "}
          //   {number}
          // </button>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
