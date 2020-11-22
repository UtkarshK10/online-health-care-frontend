import React from 'react'

export default function Pagination({ doctorsPerPage, totalDoctors, paginate }) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalDoctors / doctorsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <ul className="list-inline">
            {pageNumbers.map(pageNumber => {
                return (
                    <li key={pageNumber}>
                        <a style={{ "fontSize": "2rem" }} onClick={e => {
                            e.preventDefault();
                            paginate(pageNumber);
                        }} href='!#'>
                            {pageNumber}
                        </a>
                    </li>
                )
            })}
        </ul>
    )
}
