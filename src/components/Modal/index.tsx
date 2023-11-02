import { ModalProps } from '@/types';
import s from './Modal.module.scss';

export const Modal = ({
  isOpen,
  onClose,
  children,
  buttonText,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={s.modal}>
      <div className={s.modal_block}>
        {children}
        {buttonText && (
          <button type='submit' className={s.modal_btn} onClick={onClose}>
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};
