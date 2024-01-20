import { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import {
  changeBanner,
  deleteBanner,
  getStoreInfo,
} from '@/store/storeProfile/storeProfileThunks';
import { FileDrop } from '@/components/UI/FileDrop';
import { Icon } from '@iconify/react';
import s from './StoreBanner.module.scss';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import { ChangeEvent } from 'react';
import { openModal } from '@/store/modalSlice';
import { BannerModal } from './BannerModal';

export const StoreBanner = () => {
  const dispatch = useAppDispatch();
  const { banner_photo } = useAppSelector((state) => state.storeProfile);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { width } = useWindowDimensions();
  const [isBurgerOpen, setIsBurgerOpen] = useState(false)

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
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleBannerInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.target.files && handleBannerUpload(e.target.files);
  };

  const handleOpenModal = () => {
    dispatch(openModal('storeBanner'));
  };

  return (
    <>
      <div className={s.banner}>
        <div className={s.banner_image}>
          {banner_photo ? (
            <img src={banner_photo} alt='banner' />
          ) : (
            width >= 991.98 ? <>
              <FileDrop onChange={handleBannerUpload}>
                <div className={s.banner_inner_text}>
                  <p>Завантажити фото банера</p>
                  <Icon icon='solar:camera-outline' />
                </div>
              </FileDrop>
            </>
            :
            <div className={s.banner_border}/>
          )
          }
        </div>

        {width <= 991.98 ?
          <div className={s.banner_dropdown}>
            <Icon icon="solar:menu-dots-outline" onClick={() => setIsBurgerOpen(!isBurgerOpen)} />
            {isBurgerOpen &&
              <div className={s.banner_dropdown_list}>
                <div>
                  <Icon icon='solar:camera-outline' />
                  <button onClick={handleOpenModal}>Завантажити фото банеру</button>
                </div>
                {banner_photo &&
                  <div>
                    <Icon icon='solar:trash-bin-trash-outline' />
                    <button onClick={handleDeleteBanner}>Видалити</button>
                  </div>
                }
              </div>
            }
          </div>
          :
          (banner_photo &&
            <div className={s.banner_buttons}>
              <div>
                <Icon icon='solar:camera-outline' />
                <button onClick={handleUploadClick}>Завантажити нове фото</button>
              </div>
              <div>
                <Icon icon='solar:trash-bin-trash-outline' />
                <button onClick={handleDeleteBanner}>Видалити</button>
              </div>
            </div>
          )
        }

        <BannerModal
          modalId={'storeBanner'}
          handleBannerUpload={handleBannerUpload}
        />

        <input
          type='file'
          ref={fileInputRef}
          onChange={handleBannerInput}
        />
      </div>
    </>
  );
};
