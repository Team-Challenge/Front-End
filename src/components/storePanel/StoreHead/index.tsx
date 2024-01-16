import { FileDrop } from "@/components/UI/FileDrop";
import { Icon } from "@iconify/react";
import s from './StoreHead.module.scss'
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { changeBanner, deleteBanner, getStoreInfo } from "@/store/storeProfile/storeProfileThunks";
import { useRef } from "react";


export const StoreHead = () => {
  const dispatch = useAppDispatch()
  const { banner_photo } = useAppSelector(state => state.storeProfile)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleBannerUpload = async (files: FileList) => {
    const file = files[0]
    if (!file) return;

    const allowedFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    const fileSize = file.size / 1024 / 1024;

    if (!allowedFormats?.includes(file.type || '')) {
      alert('Дозволені формати файлів: png, jpg, jpeg, webp')
      return;
    }

    if (fileSize > 3) {
      alert('Файл повинен бути менше 3 MB');
      return;
    }

    const formData = new FormData()
    formData.append('image', file);
    await dispatch(changeBanner(formData))
    dispatch(getStoreInfo())
  }

  const handleDeleteBanner = async () => {
    await dispatch(deleteBanner())
    dispatch(getStoreInfo())
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleBannerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    e.target.files && handleBannerUpload(e.target.files)
  }

  return (
    <>
      <div className={s.banner}>
        {banner_photo ?
          <>
            <img className={s.banner_image} src={banner_photo} alt='banner' />
            <div className={s.banner_buttons}>
              <div>
                <Icon icon="solar:camera-outline" />
                <button onClick={handleUploadClick}>Завантажити нове фото</button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleBannerInput}
                />
              </div>

              <div>
                <Icon icon="solar:trash-bin-trash-outline" />
                <button onClick={handleDeleteBanner}>Видалити</button>
              </div>
            </div>
          </> :
          <FileDrop
            className={s.banner_image}
            onChange={handleBannerUpload}
          >
            <div className={s.banner_inner_text}>
              <p>Завантажити фото банера</p>
              <Icon icon="solar:camera-outline" />
            </div>
          </FileDrop>
        }
      </div>
    </>
  );
}
