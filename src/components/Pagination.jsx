import React from 'react';

const Pagination = ({ currentPage, totalPages, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <button onClick={() => paginate(currentPage - 1)}>Previous</button>
      )}
      {pageNumbers.map((number) => (
        <button 
          key={number} 
          onClick={() => paginate(number)} 
          className={currentPage === number ? 'active' : ''}
        >
          {number}
        </button>
      ))}
      {currentPage < totalPages && (
        <button onClick={() => paginate(currentPage + 1)}>Next</button>
      )}
    </div>
  );
};

export default Pagination;