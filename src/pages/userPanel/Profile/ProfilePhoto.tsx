import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import { Icon } from '@iconify/react';
import { openModal } from '@/store/modalSlice';
import { Modal } from '@/components/Modal';
import { OrnamentalTitle } from '@/components/OrnamentalTitle';
import defaultUserPic from '@assets/default-user-pic.svg';
import s from './Profile.module.scss';
import {
  deleteProfilePhoto,
  uploadProfilePhoto,
} from '@/store/userProfile/userProfileThunks';

export const ProfilePhoto = () => {
  const [img, setImg] = useState<string>(defaultUserPic);
  const isModalOpen = useAppSelector((state) => state.modal.userPhoto);
  const { profile_picture } = useAppSelector((state) => state.userProfile);
  const dispatch = useAppDispatch();

  const handleOpenModal = () => {
    dispatch(openModal('userPhoto'));
  };

  const handleAddPhoto = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
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

      const formData = new FormData();
      formData.append('image', file);
      await dispatch(uploadProfilePhoto(formData));
      setImg(URL.createObjectURL(file));
    } catch (error) {
      throw error;
    }
  };

  const handleDeletePhoto = () => {
    dispatch(deleteProfilePhoto());
    setImg(defaultUserPic);
  };

  const userProfilePhoto = profile_picture ? (
    <img src={profile_picture} alt='user' />
  ) : (
    <img src={img} alt='user' />
  );

  return (
    <div className={s.photo}>
      <div className={s.photo_block}>
        <div className={s.photo_img}>{userProfilePhoto}</div>
        <button className={s.photo_button_edit} onClick={handleOpenModal}>
          <Icon icon='solar:pen-new-square-outline' />
        </button>
      </div>

      {isModalOpen && (
        <Modal modalId='userPhoto' className={s.modal}>
          <OrnamentalTitle tag='h4' text='Фото профілю' />
          <div className={s.modal_photo}>{userProfilePhoto}</div>
          <div className={s.modal_buttons}>
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
