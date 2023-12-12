import { useAppDispatch } from '@/hooks/reduxHook';
import { closeModal } from '@/store/modalSlice';
import { OrnamentalTitle } from '../OrnamentalTitle';
import { ButtonUI } from '../UI/ButtonUI';
import s from './Auth.module.scss';

interface SuccessMessageProps {
  id: string;
}

export const SuccessMessage = ({ id }: SuccessMessageProps) => {
  const dispatch = useAppDispatch();

  const handleCloseModal = (id: string) => {
    dispatch(closeModal(id));
  };

  return (
    <div className={`auth-modal-message ${s.success_message}`}>
      <OrnamentalTitle tag='h4' text='До речі, ласкаво просимо!' />
      <p>
        Раді нарешті представити наш навчальний проєкт, над яким ми так довго
        працювали.
        <span>Приємного вивчення!</span>
      </p>
      <ButtonUI label='Готово' onClick={() => handleCloseModal(id)} />
    </div>
  );
};
