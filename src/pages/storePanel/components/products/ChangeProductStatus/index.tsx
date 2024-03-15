import { useState } from 'react';
import { useAppDispatch } from '@/hooks/reduxHook';
import { closeModal } from '@/store/modalSlice';
import { changeProductInfo } from '@/store/productPage/productPageThunks';
import { setProductStatus } from '@/store/productPage/productPageSlice';
import { mutableProductStatuses } from '@/constants/statusesList';
import { Modal, OrnamentalTitle, ButtonUI } from '@/components/UI';
import s from './ChangeProductStatus.module.scss';

export const ChangeProductStatus = ({ productId }: { productId: number }) => {
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState<string>('');

  const handleSaveProductStatus = (productStatus: string) => {
    if (status) {
      dispatch(
        changeProductInfo({
          data: { product_status: productStatus },
          product_id: productId,
        }),
      );

      dispatch(setProductStatus({ productId, productStatus }));
    }
    dispatch(closeModal('changeProductStatus'));
  };

  return (
    <Modal modalId='changeProductStatus' className={s.modal}>
      <OrnamentalTitle tag='h4' text='Статус товару' />
      <p className={s.modal_subtitle}>
        Оберіть статус вашого товару та збережіть зміни
      </p>
      <ul className={s.status_list}>
        {mutableProductStatuses.map(({ id, text }) => (
          <li className={s.status_item} key={id}>
            <label className={s.status_label}>
              <input
                type='radio'
                id={id}
                name='status'
                className={s.status_input}
                onClick={() => setStatus(id)}
              />
              {text}
            </label>
          </li>
        ))}
      </ul>
      <ButtonUI
        label='Зберегти'
        className={s.modal_button}
        onClick={() => handleSaveProductStatus(status)}
      />
    </Modal>
  );
};
