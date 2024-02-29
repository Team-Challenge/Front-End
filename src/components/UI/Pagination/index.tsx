import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import { PaginationProps } from '@/types';
import { Icon } from '@iconify/react';
import s from './Pagination.module.scss';

export const Pagination = ({
  itemsPerPage,
  totalItems,
  currentPage,
  paginate,
  nextPage,
  previousPage,
  className,
}: PaginationProps) => {
  const { width } = useWindowDimensions();
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i += 1) {
    pageNumbers.push(i);
  }

  const displayPageNumbers =
    currentPage >= 3
      ? pageNumbers.slice(currentPage - 3, currentPage + 2)
      : pageNumbers.slice(0, 5);

  return (
    <div className={`${s.pagination} ${className || ''}`}>
      {width > 767.98 ? (
        <div className={s.pagination_desktop}>
          <button
            type='submit'
            className={s.pagination_prev}
            onClick={() => previousPage()}
            disabled={currentPage === 1}
          >
            <Icon icon='solar:alt-arrow-left-outline' />
            Попередня сторінка
          </button>
          <div>
            {displayPageNumbers.map((number) => (
              <button
                type='submit'
                key={number}
                onClick={() => paginate(number)}
                className={`
              ${s.pagination_number}
              ${number === currentPage ? s.active : s.inactive}
            `}
              >
                {number}
              </button>
            ))}
          </div>
          <button
            type='submit'
            className={s.pagination_next}
            onClick={() => nextPage()}
            disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}
          >
            Наступна сторінка
            <Icon icon='solar:alt-arrow-right-outline' />
          </button>
        </div>
      ) : (
        <div className={s.pagination_mobile}>
          <button
            type='submit'
            className={s.pagination_prev}
            onClick={() => previousPage()}
            disabled={currentPage === 1}
          >
            <Icon icon='solar:alt-arrow-left-outline' />
          </button>
          <p className={s.pagination_details}>
            Сторінка <span>{currentPage}</span> з{' '}
            <span>{pageNumbers.length}</span>
          </p>
          <button
            type='submit'
            className={s.pagination_next}
            onClick={() => nextPage()}
            disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}
          >
            <Icon icon='solar:alt-arrow-right-outline' />
          </button>
        </div>
      )}
    </div>
  );
};
