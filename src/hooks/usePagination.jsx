// import {useState, useEffect} from 'react';

// const usePagination = (data, itemsPerPage = 10) => {
//     const [currentPage, setCurrentPage] = useState(0);
//     const maxPage = Math.ceil(data.length / itemsPerPage);

//     const currentItems = () => {
//         const begin = (currentPage) * itemsPerPage;
//         const end = begin + itemsPerPage;
//         return data.slice(begin, end);
//     };

//     useEffect(() => {
//         if (currentPage > maxPage - 1) {
//             setCurrentPage(maxPage - 1);
//         } else if (currentPage < 0 && maxPage > 0) {
//             setCurrentPage(0);
//         }
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [currentItems()]);

//     const next = () => {
//         setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
//     };

//     const prev = () => {
//         setCurrentPage((currentPage) => Math.max(currentPage - 1, 0));
//     };

//     const goToPage = (page) => {
//         const pageNumber = Math.max(0, page);
//         setCurrentPage(() => Math.min(pageNumber, maxPage));
//     }

//     const showingOf = () => {
//         const begin = (currentPage) * itemsPerPage;
//         const end = data.length > itemsPerPage ? begin + itemsPerPage : data.length;
//         return data.length > 0 ?
//             <>
//                 <span className="font-semibold">{end}</span>/{data.length}
//             </>
//             : '';
//     }

//     return {next, prev, goToPage, showingOf, currentItems, currentPage, setCurrentPage, maxPage};
// }

// export default usePagination


import { useState, useEffect } from 'react';

const usePagination = (data = [], itemsPerPage = 20) => {
    const [currentPage, setCurrentPage] = useState(0);

    // Ensure data is an array
    const safeData = Array.isArray(data) ? data : [];

    const maxPage = Math.ceil(safeData.length / itemsPerPage);

    const currentItems = () => {
        const begin = currentPage * itemsPerPage;
        const end = begin + itemsPerPage;
        return safeData.slice(begin, end);
    };

    useEffect(() => {
        if (currentPage > maxPage - 1) {
            setCurrentPage(maxPage - 1);
        } else if (currentPage < 0 && maxPage > 0) {
            setCurrentPage(0);
        }
    }, [safeData.length, currentPage, maxPage]);

    const next = () => {
        setCurrentPage((prev) => Math.min(prev + 1, maxPage - 1));
    };

    const prev = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 0));
    };

    const goToPage = (page) => {
        setCurrentPage(Math.max(0, Math.min(page, maxPage - 1)));
    };

    const showingOf = () => {
        const begin = currentPage * itemsPerPage;
        const end = Math.min(begin + itemsPerPage, safeData.length);
        return safeData.length > 0 ? (
            <>
                <span className="font-semibold">{end}</span>/{safeData.length}
            </>
        ) : '';
    };

    return { next, prev, goToPage, showingOf, currentItems, currentPage, setCurrentPage, maxPage };
};

export default usePagination;
