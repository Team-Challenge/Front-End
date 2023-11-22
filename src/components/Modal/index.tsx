import { useEffect } from 'react';
import { useAppDispatch } from '@/hooks/reduxHook';
import { closeModal } from '@/store/modalSlice';
import { ModalProps } from '@/types';
import { CloseIcon } from '../icons/CloseIcon';
import s from './Modal.module.scss';

export const Modal = ({ children }: ModalProps) => {
  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className={s.modal}>
      <div className={s.modal_wrap}>
        <div className={s.modal_block}>{children}</div>
        <button className={s.modal_close} onClick={handleCloseModal}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};
