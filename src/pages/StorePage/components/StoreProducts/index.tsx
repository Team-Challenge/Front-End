import { useEffect } from 'react';
import { usePagination } from '@/hooks/usePagination';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import { getAllProductsInfo } from '@/store/productPage/productPageThunks';
import { Sorting } from '@/components/Sorting';
import { ProductCard } from '@/components/ProductCard';
import { Pagination } from '@/components/UI/Pagination';
import s from './StoreProducts.module.scss';

export const StoreProducts = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.product);
  const isProducts = products.length > 0;

  const itemsPerPage = 2;
  const { currentPage, changePage, pageData, nextPage, previousPage } =
    usePagination(products, itemsPerPage);

  useEffect(() => {
    dispatch(getAllProductsInfo());
  }, []);

  return (
    <div
      className={`${s.products} ${
        isProducts ? s.products_full : s.products_empty
      }`}
    >
      {isProducts ? (
        <>
          <Sorting />
          <ul className={s.products_list}>
            {pageData().map((product) => (
              <li key={product.id}>
                <ProductCard
                  photos={product.photos}
                  productName={product.product_name}
                  status={product.product_status}
                  price={product.price}
                  isUnique={product.is_unique}
                />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className={s.products_empty_text}>
          Ой, тут поки пусто.
          <br />
          Запрошуємо зазирнути пізніше, щоб обрати ідеальну прикрасу саме для
          вас!
        </p>
      )}

      {products.length > 2 && (
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={products.length}
          paginate={changePage}
          currentPage={currentPage}
          nextPage={nextPage}
          previousPage={previousPage}
        />
      )}
    </div>
  );
};
