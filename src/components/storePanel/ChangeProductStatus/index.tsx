import { Modal } from '@/components/Modal';
import s from './ChangeProductStatus.module.scss';
import { OrnamentalTitle } from '@/components/OrnamentalTitle';
import { ButtonUI } from '@/components/UI/ButtonUI';

const statuses = [
  {
    id: 'available',
    text: 'В наявності',
  },
  {
    id: 'out_of_stock',
    text: 'Під замовлення',
  },
  {
    id: 'preorder',
    text: 'Нема в наявності',
  },
];

export const ChangeProductStatus = () => {
  const handleSaveProductStatus = () => {
    console.log('status change');
  };

  return (
    <Modal modalId='changeProductStatus' className={s.modal}>
      <OrnamentalTitle tag='h4' text='Статус товару' />
      <p className={s.modal_subtitle}>
        Оберіть статус вашого товару та збережіть зміни
      </p>
      <ul className={s.status_list}>
        {statuses.map(({ id, text }) => (
          <li className={s.status_item} key={id}>
            <label className={s.status_label}>
              <input
                type='radio'
                id={id}
                name='status'
                className={s.status_input}
              />
              {text}
            </label>
          </li>
        ))}
      </ul>
      <ButtonUI
        label='Зберегти'
        className={s.modal_button}
        onClick={handleSaveProductStatus}
      />
    </Modal>
  );
};
