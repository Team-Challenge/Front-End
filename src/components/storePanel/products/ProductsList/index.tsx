import { useAppSelector } from '@/hooks/reduxHook';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import { Tooltip } from '@/components/UI/Tooltip';
import { ProductItemDesktop } from './ProductItemDesktop';
import { ProductItemMobile } from './ProductItemMobile';
import { ChangeProductStatus } from '../ChangeProductStatus';
import { Icon } from '@iconify/react';
import s from './ProductsList.module.scss';

const products = [
  {
    photo: '',
    title: 'First product',
    date: '30.01.2024',
    code: '452158',
    price: '655',
    category: 'на руки',
    status: 'В наявності',
  },
  {
    photo: '',
    title: 'Second product',
    date: '30.01.2024',
    code: '452158',
    price: '655',
    category: 'на руки',
    status: 'В наявності',
  },
  {
    photo: '',
    title: 'Third product',
    date: '30.01.2024',
    code: '452158',
    price: '655',
    category: 'на руки',
    status: 'В наявності',
  },
];

export const ProductsList = () => {
  const { width } = useWindowDimensions();
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
          {products.map((product, index) => (
            <div className={`${s.cell} ${s.row}`} key={index}>
              <ProductItemDesktop {...product} />
            </div>
          ))}
        </div>
      ) : (
        <div className={s.block}>
          {products.map((product, index) => (
            <ProductItemMobile {...product} key={index} />
          ))}
        </div>
      )}

      {isModalOpen && <ChangeProductStatus />}
    </>
  );
};
