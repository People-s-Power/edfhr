import React, { useState } from "react";

const Pagination = ({ campPerPage, totalCamp, paginate }: { campPerPage: number; totalCamp: number; paginate: any }): JSX.Element => {
  const [currentNum, setCurrentNum] = useState(1);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalCamp / campPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className="m-0">
      <ul className="pagination m-0">
        {pageNumbers.map((number, i) => (
          <li className={`page-item ${number == currentNum ? "active" : ""}`} onClick={() => setCurrentNum(number)} key={i}>
            <span className="page-link" onClick={() => paginate(number)}>
              {number}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
