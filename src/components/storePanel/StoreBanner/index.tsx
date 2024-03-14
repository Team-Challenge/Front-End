import { ChangeEvent, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import { useClickOutside } from '@/hooks/useClickOutside';
import {
  changeBanner,
  deleteBanner,
  getStoreInfo,
} from '@/store/storeProfile/storeProfileThunks';
import { openModal } from '@/store/modalSlice';
import { FileDrop } from '@/components/UI/FileDrop';
import { Icon } from '@iconify/react';
import { BannerModal } from './BannerModal';
import s from './StoreBanner.module.scss';

export const StoreBanner = () => {
  const { width } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const storeBanner = useAppSelector(
    (state) => state.storeProfile.banner_photo,
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dropdownRef = useRef<HTMLInputElement | null>(null);

  const handleBannerUpload = async (files: FileList) => {
    const file = files[0];
    if (!file) return;

    const allowedFormats = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
    ];
    const fileSize = file.size / 1024 / 1024;

    if (!allowedFormats?.includes(file.type || '')) {
      alert('Дозволені формати файлів: png, jpg, jpeg, webp');
      return;
    }

    if (fileSize > 5) {
      alert('Файл повинен бути менше 5 MB');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    await dispatch(changeBanner(formData));
    dispatch(getStoreInfo());
  };

  const handleDeleteBanner = async () => {
    await dispatch(deleteBanner());
    dispatch(getStoreInfo());
    setIsDropdownOpen(false);
  };

  const handleBannerInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.target.files && handleBannerUpload(e.target.files);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleOpenModal = () => {
    dispatch(openModal('storeBanner'));
    setIsDropdownOpen(false);
  };

  const handleCloseDropdown = () => {
    setIsDropdownOpen(false);
  };

  useClickOutside(dropdownRef, handleCloseDropdown);

  return (
    <div className={s.banner}>
      <div className={s.banner_image}>
        {storeBanner && <img src={storeBanner} alt='banner' />}

        {!storeBanner && width >= 991.98 ? (
          <FileDrop onChange={handleBannerUpload}>
            <div className={s.banner_text}>
              <p>Завантажити фото банера</p>
              <Icon icon='solar:camera-outline' />
            </div>
          </FileDrop>
        ) : (
          <div className={s.banner_border} />
        )}
      </div>

      {width <= 991.98 ? (
        <div ref={dropdownRef} className={s.dropdown}>
          <button
            type='button'
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={s.dropdown_button}
          >
            <Icon icon='solar:menu-dots-outline' />
          </button>
          {isDropdownOpen && (
            <div className={s.dropdown_buttons}>
              <button
                type='button'
                onClick={handleOpenModal}
                className={s.dropdown_button_add}
              >
                <Icon icon='solar:camera-outline' />
                Завантажити нове фото
              </button>
              {storeBanner && (
                <button
                  type='button'
                  onClick={handleDeleteBanner}
                  className={s.dropdown_button_delete}
                >
                  <Icon icon='solar:trash-bin-trash-outline' />
                  Видалити
                </button>
              )}
            </div>
          )}
        </div>
      ) : (
        storeBanner && (
          <div className={s.banner_buttons}>
            <button type='button' onClick={handleUploadClick}>
              <Icon icon='solar:camera-outline' />
              Завантажити нове фото
              <input
                type='file'
                ref={fileInputRef}
                onChange={handleBannerInput}
              />
            </button>
            <button type='button' onClick={handleDeleteBanner}>
              <Icon icon='solar:trash-bin-trash-outline' />
              Видалити
            </button>
          </div>
        )
      )}

      {width <= 991.98 && (
        <BannerModal handleBannerUpload={handleBannerUpload} />
      )}
    </div>
  );
};
