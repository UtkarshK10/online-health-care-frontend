import React, { useState, useEffect } from 'react';

export default function Pagination({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
}) {
  const [pageNumbers, setPageNumbers] = useState([]);
  useEffect(() => {
    const pages = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pages.push(i);
    }
    setPageNumbers([...pages]);
  }, [totalItems, itemsPerPage]);

  if (totalItems / itemsPerPage > 1) {
    return (
      <ul className='pagination'>
        {pageNumbers.map((pageNumber, idx) => {
          return (
            <li
              key={pageNumber}
              // className={`${
              //   currentPage === idx + 1 ? 'active' : 'waves-effect'
              // }`}
            >
              <a
                style={{ padding: '0px', marginRight: '5px' }}
                onClick={(e) => {
                  e.preventDefault();
                  paginate(pageNumber);
                }}
                href='!#'
              >
                {/* {totalDoctors > 3 ? pageNumber : ''} */}
                <span
                  className='bgsecondary highlight'
                  style={{ fontSize: '24px', padding: '5px' }}
                >
                  {' '}
                  {pageNumber}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    );
  } else {
    return null;
  }
}
