import React from 'react';

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  // Compute visible page range (always 3 pages max)
  let startPage = Math.max(currentPage - 1, 1);
  let endPage = startPage + 2;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(endPage - 2, 1);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="overflow-x-auto w-full">
      <div className="flex justify-center items-center gap-1 sm:gap-2 mt-4 px-2 w-max sm:w-full mx-auto">
        {/* Previous button */}
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="btn btn-sm px-3 py-1 border rounded disabled:opacity-50 whitespace-nowrap"
        >
          Prev
        </button>

        {/* Page numbers */}
        {startPage > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="btn btn-sm px-3 py-1 border rounded whitespace-nowrap"
            >
              1
            </button>
            {startPage > 2 && <span className="text-sm px-1">...</span>}
          </>
        )}

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`btn btn-sm px-3 py-1 border rounded whitespace-nowrap ${
              currentPage === page ? 'bg-green-500 text-white' : ''
            }`}
          >
            {page}
          </button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="text-sm px-1">...</span>}
            <button
              onClick={() => onPageChange(totalPages)}
              className="btn btn-sm  py-1 border rounded whitespace-nowrap"
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Next button */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="btn btn-sm py-1 border rounded disabled:opacity-50 whitespace-nowrap"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
