import { useState } from 'react';
import { PaginationHookProps } from '@/types';

export const usePagination = <T>(
  items: T[],
  itemsPerPage: number,
): PaginationHookProps<T> => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const changePage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const pageData = (): T[] => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    return currentItems;
  };

  return {
    currentPage,
    changePage,
    nextPage,
    previousPage,
    pageData,
  };
};
