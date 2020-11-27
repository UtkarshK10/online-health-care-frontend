import React, { useState, useEffect } from 'react';

export default function Pagination({ itemsPerPage, totalItems, paginate, currentPage }) {
  const [pageNumbers, setPageNumbers] = useState([]);
  useEffect(() => {
    const pages = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pages.push(i);
    }
    setPageNumbers([...pages])
  }, [totalItems, itemsPerPage])

  if (totalItems / itemsPerPage > 1) {
    return (
      <ul className='pagination'>
        {pageNumbers.map((pageNumber, idx) => {
          return (
            <li key={pageNumber} className={`${currentPage === (idx + 1) ? "active" : "waves-effect"}`}>
              <a
                style={{ fontSize: '2rem' }}
                onClick={(e) => {
                  e.preventDefault();
                  paginate(pageNumber);
                }}
                href='!#'
              >
                {/* {totalDoctors > 3 ? pageNumber : ''} */}
                {pageNumber}
              </a>
            </li>
          );
        })}
      </ul>
    );
  } else {
    return null
  }
}
