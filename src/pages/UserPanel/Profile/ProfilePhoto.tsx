import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import { Icon } from '@iconify/react';
import { openModal } from '@/store/modalSlice';
import { Modal } from '@/components/Modal';
import { OrnamentalTitle } from '@/components/OrnamentalTitle';
import defaultUserPic from '@assets/default-user-pic.svg';
import s from './Profile.module.scss';

export const ProfilePhoto = () => {
  const [img, setImg] = useState<string>(defaultUserPic);
  const isModalOpen = useAppSelector((state) => state.modal.userPhoto);
  const dispatch = useAppDispatch();

  const handleOpenModal = () => {
    dispatch(openModal('userPhoto'));
  };

  const handleAddPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileSize = file.size / 1024 / 1024;
    const allowedExtensions = ['png', 'jpg', 'jpeg', 'webp'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    if (fileSize > 3) {
      alert('Файл повинен бути менше 3 MB');
      return;
    }

    if (!allowedExtensions.includes(fileExtension || '')) {
      alert('Дозволені формати файлів: png, jpg, jpeg, webp');
      return;
    }

    setImg(URL.createObjectURL(file));
  };

  const handleDeletePhoto = () => {
    setImg(defaultUserPic);
  };

  return (
    <div>
      <div className={s.photo_block}>
        <div className={s.photo_img}>
          <img src={img} alt='user' />
        </div>
        <button className={s.photo_button_edit} onClick={handleOpenModal}>
          <Icon icon='solar:pen-new-square-outline' />
        </button>
      </div>
      {isModalOpen && (
        <Modal modalId='userPhoto'>
          <OrnamentalTitle tag='h4' text='Фото профілю' />
          <div className={s.photo_img}>
            <img src={img} alt='user' />
          </div>
          <div className={s.photo_buttons}>
            <label htmlFor='userPhoto'>
              <Icon icon='solar:add-circle-outline' />
              Додати нове
              <input type='file' id='userPhoto' onChange={handleAddPhoto} />
            </label>
            <button onClick={handleDeletePhoto}>
              <Icon icon='solar:trash-bin-trash-outline' />
              Видалити
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};