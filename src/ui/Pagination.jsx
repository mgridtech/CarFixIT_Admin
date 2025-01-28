import React from 'react';
import classNames from 'classnames';

const Pagination = ({ pagination }) => {
    const { currentPage, maxPage, prev, next, goToPage } = pagination;

    // Number of pages to show before and after the current page
    const pageRange = 2;

    // Calculate the start and end page numbers
    const startPage = Math.max(0, currentPage - pageRange);
    const endPage = Math.min(maxPage - 1, currentPage + pageRange);

    return (
        <div className="flex flex-wrap items-center gap-[18px] pb-6 border-b border-input-border">
            {/* Previous Page Button */}
            {currentPage > 0 && (
                <button onClick={prev} aria-label="Previous page">
                    <i className="icon icon-chevrons-left-solid" />
                </button>
            )}
            
            {/* Page Number Buttons */}
            <div className="flex flex-wrap gap-2.5">
                {startPage > 0 && (
                    <>
                        {/* Show first page button if there are skipped pages */}
                        <button
                            className="page-btn subheading-2"
                            onClick={() => goToPage(0)}
                            aria-label="First page"
                        >
                            1
                        </button>
                        {startPage > 1 && <span className="page-btn">...</span>}
                    </>
                )}
                
                {[...Array(endPage - startPage + 1)].map((_, i) => {
                    const page = startPage + i;
                    return (
                        <button
                            className={classNames('page-btn subheading-2', { 'active': page === currentPage })}
                            key={page}
                            onClick={() => goToPage(page)}
                            disabled={page === currentPage}
                            aria-label={`Page ${page + 1}`}
                        >
                            {page + 1}
                        </button>
                    );
                })}
                
                {endPage < maxPage - 1 && (
                    <>
                        {endPage < maxPage - 2 && <span className="page-btn">...</span>}
                        {/* Show last page button if there are skipped pages */}
                        <button
                            className="page-btn subheading-2"
                            onClick={() => goToPage(maxPage - 1)}
                            aria-label="Last page"
                        >
                            {maxPage}
                        </button>
                    </>
                )}
            </div>

            {/* Next Page Button */}
            {currentPage < maxPage - 1 && (
                <button onClick={next} aria-label="Next page">
                    <i className="icon icon-chevrons-right-solid" />
                </button>
            )}
        </div>
    );
};

export default Pagination;
