import React from "react";

const Pagination = ({ currentPage, postPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul
      className="pagination"
      style={{
        marginTop: "20px",
        justifyContent: "center",
      }}
    >
      {pageNumbers.map((number) => (
        <li key={number} className="page-item">
          {number !== currentPage ? (
            <span
              className="btn btn-outline-primary m-1 border-3"
              style={{ fontWeight: "bold" }}
              onClick={() => paginate(number)}
            >
              {number}
            </span>
          ) : (
            <span
              className="btn btn-primary m-1 border-3"
              style={{ fontWeight: "bold" }}
              onClick={() => paginate(number)}
            >
              {number}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
