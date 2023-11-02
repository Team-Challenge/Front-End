import { useState } from 'react';
import { Modal } from '@/components/Modal';
import { EditIcon } from '@/components/icons/EditIcon';
import s from './Profile.module.scss';

export const ProfilePhoto = () => {
  const [img, setImg] = useState<string>(
    'https://cdn-icons-png.flaticon.com/512/266/266134.png',
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAdd = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleDelete = () => {
    console.log('delete');
  };

  return (
    <div>
      <div className={s.photo_block}>
        <div className={s.photo_img}>
          <img src={img} alt='user' />
        </div>
        <button type='submit' className={s.photo_btn} onClick={toggleModal}>
          <EditIcon />
        </button>
      </div>
      {isModalOpen && (
        <Modal isOpen={isModalOpen}>
          <div className={s.modal}>
            <div className={s.modal_header}>
              <h2 className='user-panel-subtitle'>Фото профілю</h2>
              <button
                type='submit'
                className={s.modal_close}
                onClick={toggleModal}
              >
                X
              </button>
            </div>
            <div className={s.modal_img}>
              <img src={img} alt='user' />
            </div>
            <div className={s.modal_buttons}>
              <label className={s.modal_btn_add}>
                <EditIcon /> Додати нове
                <input
                  type='file'
                  onChange={handleAdd}
                  accept='.png, .jpg, .jpeg, .webp'
                />
              </label>
              <button type='submit' onClick={handleDelete}>
                <EditIcon /> Видалити
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
