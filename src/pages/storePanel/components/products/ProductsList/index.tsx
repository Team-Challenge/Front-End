import { useState } from 'react';
import { formatDate } from '@/utils/formatDate';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import { openModal } from '@/store/modalSlice';
import { Icon } from '@iconify/react';
import { Tooltip } from '@/components/UI';
import { ProductItemDesktop } from './ProductItemDesktop';
import { ProductItemMobile } from './ProductItemMobile';
import { ChangeProductStatus } from '../ChangeProductStatus';
import s from './ProductsList.module.scss';

export const ProductsList = ({
  selectedStatus,
}: {
  selectedStatus: string;
}) => {
  const [activeProductId, setActiveProductId] = useState<number | null>(null);
  const { width } = useWindowDimensions();
  const { products } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector(
    (state) => state.modal.changeProductStatus,
  );

  const filteredProducts = products.filter((product) => {
    if (selectedStatus === 'Всі') {
      return true;
    }

    if (selectedStatus === 'В наявності') {
      return product.product_status === 'В наявності' && product.is_active;
    }

    if (selectedStatus === 'Нема в наявності') {
      return (
        product.product_status === 'Нема в наявності' || !product.is_active
      );
    }

    if (selectedStatus === 'Під замовлення') {
      return product.product_status === 'Під замовлення' && product.is_active;
    }

    if (selectedStatus === 'В єдиному екземплярі') {
      return product.is_unique && product.is_active;
    }

    return false;
  });

  const openChangeProductStatusModal = (productId: number) => {
    dispatch(openModal('changeProductStatus'));
    setActiveProductId(productId);
  };

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
          {filteredProducts.map((product) => (
            <div className={`${s.cell} ${s.row}`} key={product.id}>
              <ProductItemDesktop
                photos={product.photos}
                title={product.product_name}
                date={formatDate(product.time_added)}
                code={product.id}
                price={product.price}
                categoryId={product.category_id}
                status={product.product_status}
                onClick={() => openChangeProductStatusModal(product.id)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className={s.block}>
          {filteredProducts.map((product) => (
            <ProductItemMobile
              photos={product.photos}
              title={product.product_name}
              date={formatDate(product.time_added)}
              code={product.id}
              price={product.price}
              categoryId={product.category_id}
              status={product.product_status}
              key={product.id}
              onClick={() => openChangeProductStatusModal(product.id)}
            />
          ))}
        </div>
      )}

      {isModalOpen && (
        <ChangeProductStatus productId={activeProductId as number} />
      )}
    </>
  );
};
