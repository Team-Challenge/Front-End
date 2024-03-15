import { useState } from 'react';
import { Icon } from '@iconify/react';
import { ProfilePhotoProps } from '@/types';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import {
  deleteProfilePhoto,
  getUserInfo,
  uploadProfilePhoto,
} from '@/store/userProfile/userProfileThunks';
import {
  getStoreInfo,
  deleteStorePhoto,
  uploadStorePhoto,
} from '@/store/storeProfile/storeProfileThunks';
import { openModal } from '@/store/modalSlice';
import { Modal } from '../UI/Modal';
import { OrnamentalTitle } from '../UI/OrnamentalTitle';
import s from './ProfilePhoto.module.scss';

export const ProfilePhoto = ({
  defaultPhoto,
  modalId,
  profilePhoto,
  isUser,
  isStore,
  className,
}: ProfilePhotoProps) => {
  const [defaultImg, setDefaultImg] = useState<string>(defaultPhoto);
  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector((state) =>
    isUser ? state.modal.userPhoto : state.modal.storePhoto,
  );

  const handleOpenModal = () => {
    dispatch(openModal(modalId));
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
        alert(`Дозволені формати файлів: ${allowedExtensions.join(', ')}`);
        return;
      }

      const formData = new FormData();
      formData.append('image', file);

      if (isUser) {
        await dispatch(uploadProfilePhoto(formData));
        dispatch(getUserInfo());
        setDefaultImg(URL.createObjectURL(file));
      }

      if (isStore) {
        await dispatch(uploadStorePhoto(formData));
        dispatch(getStoreInfo());
        setDefaultImg(URL.createObjectURL(file));
      }
    } catch (e) {
      const error = e as Error;
      throw error;
    }
  };

  const handleDeletePhoto = async () => {
    try {
      if (isUser) {
        await dispatch(deleteProfilePhoto());
        dispatch(getUserInfo());
      }

      if (isStore) {
        await dispatch(deleteStorePhoto());
        dispatch(getStoreInfo());
      }

      setDefaultImg(defaultPhoto);
    } catch (error) {
      console.error('Error deleting photo:', error);
    }
  };

  const profilePicture = profilePhoto ? (
    <img src={profilePhoto} alt='user' />
  ) : (
    <img src={defaultImg} alt='user' />
  );

  return (
    <div className={`${s.photo} ${className}`}>
      <div className={s.photo_block}>
        <div className={s.photo_img}>{profilePicture}</div>
        <button
          type='button'
          className={s.photo_button}
          onClick={handleOpenModal}
        >
          <Icon icon='solar:pen-new-square-outline' />
        </button>
      </div>

      {isModalOpen && (
        <Modal modalId={modalId} className={s.modal}>
          <OrnamentalTitle
            tag='h4'
            text={isUser ? 'Фото профілю' : 'Фото магазину'}
          />
          <div className={s.modal_photo}>{profilePicture}</div>
          <div className={s.modal_buttons}>
            <label htmlFor={modalId}>
              <Icon icon='solar:add-circle-outline' />
              Додати нове
              <input type='file' id={modalId} onChange={handleAddPhoto} />
            </label>
            <button type='button' onClick={handleDeletePhoto}>
              <Icon icon='solar:trash-bin-trash-outline' />
              Видалити
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};
