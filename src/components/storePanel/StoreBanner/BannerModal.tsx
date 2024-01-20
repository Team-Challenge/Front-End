import { Modal } from "@/components/Modal";
import { OrnamentalTitle } from "@/components/OrnamentalTitle";
import { FileDrop } from "@/components/UI/FileDrop";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import s from './StoreBanner.module.scss';
import { Icon } from "@iconify/react";
import { ButtonUI } from "@/components/UI";
import { useState } from "react";
import { closeModal } from "@/store/modalSlice";

interface BannerModalProps {
  handleBannerUpload: (files: FileList) => Promise<void>
}

export const BannerModal = ({ handleBannerUpload }: BannerModalProps) => {
  const [files, setFiles] = useState<FileList | null>(null)
  const dispatch = useAppDispatch()
  const isModalOpen = useAppSelector((state) =>
    state.modal.storeBanner
  );

  const handleSave = () => {
    files && handleBannerUpload(files)
    setFiles(null)
    dispatch(closeModal('storeBanner'))
  }

  const handleAddImage = (files: FileList) => {
    setFiles(files);
  }

  return (
    <>
      {isModalOpen &&
        <Modal modalId={'storeBanner'} className={s.modal}>
          <OrnamentalTitle
            tag='h4'
            text={'Фото банера'}
            className={s.modal_title}
          />
          <FileDrop onChange={handleAddImage} className={s.modal_file_drop}>
            {files ? <>
              <img src={URL.createObjectURL(files[0])} alt='banner' className={s.modal_image} />
            </> : <>
              <div className={s.modal_inner_text}>
                <p>Натисніть, щоб завантажити фото</p>
                <Icon icon='solar:camera-outline' />
              </div>
            </>}
          </FileDrop>
          <p>Допустимі розміри банера 360х160</p>
          <ButtonUI
            label='Зберегти'
            onClick={handleSave}
            className={s.modal_button}
          />
        </Modal>
      }
    </>
  )
}