import { useEffect } from 'react';
import { useAppDispatch } from '@/hooks/reduxHook';
import { closeModal } from '@/store/modalSlice';
import { Icon } from '@iconify/react';
import { ModalProps } from '@/types';
import s from './Modal.module.scss';

export const Modal = ({ children, modalId, className }: ModalProps) => {
  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    dispatch(closeModal(modalId));
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className={`${s.modal} ${className}`}>
      <div className={s.modal_wrap}>
        <div className={s.modal_block}>{children}</div>
        <button className={s.modal_close} onClick={handleCloseModal}>
          <Icon icon='pajamas:close' />
        </button>
      </div>
    </div>
  );
};
