import React from "react";

function Paginaton({ studentsPerPage, totalStudents, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalStudents / studentsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination"
        style={{
          display: "flex",
          textAlign: "center",
          margin: "auto",
          width: "200px",
          color:'var(--primary-color)'
        }}
      >
        {pageNumbers.map((number) => {
          return (
            <li key={number} style={{ listStyle: "none" }}>
              <span
                style={{
                  padding: "5px 7px",
                  border: "1px solid var(--primary-color)",
                  margin: "0 10px",
                  cursor: 'pointer'
                }}
                onClick={() => paginate(number)}
              >
                {number}
              </span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Paginaton;
