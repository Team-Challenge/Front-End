import { FileDrop } from "@/components/UI/FileDrop";
import { Icon } from "@iconify/react";
import s from './StoreHead.module.scss'
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { changeBanner, deleteBanner, getStoreInfo } from "@/store/storeProfile/storeProfileThunks";


export const StoreHead = () => {
  const dispatch = useAppDispatch()
  const { banner_photo } = useAppSelector(state => state.storeProfile)

  const handleBannerUpload = async (files: Array<File>) => {
    const file = files[0]
    if (!file) return;

    const fileFormat = file.name.split('.').pop()?.toLowerCase();
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

    // todo validate image resolution
    //
    //
    //
    //

    const formData = new FormData()
    formData.append('image', file);
    await dispatch(changeBanner(formData))
    dispatch(getStoreInfo())
  }

  const handleDeleteBanner = async () => {
    await dispatch(deleteBanner())
    dispatch(getStoreInfo())
  }

  return (
    <>
      <div className={s.banner}>
        {banner_photo ?
          <>
            <img className={s.banner_image} src={banner_photo} alt='banner' />
            <div className={s.banner_buttons}>
              {/* <div>
                <Icon icon="solar:camera-outline" />
                <button onClick={handleDeleteBanner}>Завантажити нове фото</button>
              </div> */}

              <div>
                <Icon icon="solar:trash-bin-trash-outline" />
                <button onClick={handleDeleteBanner}>Видалити</button>
              </div>
            </div>
          </> :
          <FileDrop
            className={s.banner_image}
            error={'error text'}
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
