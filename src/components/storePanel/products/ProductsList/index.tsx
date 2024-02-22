import { Icon } from '@iconify/react';
import { useAppSelector } from '@/hooks/reduxHook';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import { formatDate } from '@/utils/formatDate';
import { Tooltip } from '@/components/UI/Tooltip';
import { ProductItemDesktop } from './ProductItemDesktop';
import { ProductItemMobile } from './ProductItemMobile';
import { ChangeProductStatus } from '../ChangeProductStatus';
import s from './ProductsList.module.scss';

export const ProductsList = () => {
  const { width } = useWindowDimensions();
  const { products } = useAppSelector((state) => state.product);
  const isModalOpen = useAppSelector(
    (state) => state.modal.changeProductStatus,
  );

  return (
    <>
      {width >= 1260 ? (
        <div className={s.table}>
          <div className={`${s.headline} ${s.row}`}>
            <p>Фото</p>
            <p>Назва</p>
            <p>Дата</p>
            <p>Код</p>
            <p>Ціна</p>
            <p>Категорія</p>
            <div className={s.headline_status}>
              <p>Статус</p>
              <Tooltip
                text='Щоб змінити статус товару, просто клікніть на поточний статус та оберіть інший'
                className={s.headline_tooltip}
              >
                <Icon icon='solar:info-circle-outline' />
              </Tooltip>
            </div>
          </div>
          {products.map((product) => (
            <div className={`${s.cell} ${s.row}`} key={product.id}>
              <ProductItemDesktop
                photos={product.photos}
                title={product.product_name}
                date={formatDate(product.time_added)}
                code={product.id}
                price={product.price}
                category={product.sub_category_name}
                status={product.product_status}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className={s.block}>
          {products.map((product) => (
            <ProductItemMobile
              photos={product.photos}
              title={product.product_name}
              date={formatDate(product.time_added)}
              code={product.id}
              price={product.price}
              category={product.sub_category_name}
              status={product.product_status}
              key={product.id}
            />
          ))}
        </div>
      )}

      {isModalOpen && <ChangeProductStatus />}
    </>
  );
};
