import { useState } from 'react';
import { BannerModalProps } from '@/types';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import { closeModal } from '@/store/modalSlice';
import { Modal } from '@/components/Modal';
import { OrnamentalTitle } from '@/components/OrnamentalTitle';
import { ButtonUI } from '@/components/UI';
import { FileDrop } from '@/components/UI/FileDrop';
import { Icon } from '@iconify/react';
import s from './StoreBanner.module.scss';

export const BannerModal = ({ handleBannerUpload }: BannerModalProps) => {
  const [files, setFiles] = useState<FileList | null>(null);
  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector((state) => state.modal.storeBanner);

  const handleSave = () => {
    files && handleBannerUpload(files);
    setFiles(null);
    dispatch(closeModal('storeBanner'));
  };

  const handleAddImage = (files: FileList) => {
    setFiles(files);
  };

  return (
    isModalOpen && (
      <Modal modalId='storeBanner' className={s.modal}>
        <OrnamentalTitle tag='h4' text='Фото банера' />
        <FileDrop
          onChange={handleAddImage}
          className={`${s.modal_block} ${files ? s.modal_img : s.modal_text}`}
        >
          {files ? (
            <img src={URL.createObjectURL(files[0])} alt='banner' />
          ) : (
            <>
              <p>Натисніть, щоб завантажити фото</p>
              <Icon icon='solar:camera-outline' />
            </>
          )}
        </FileDrop>
        <p className={s.modal_hint}>Допустимі розміри банера 360х160</p>
        <ButtonUI
          label='Зберегти'
          onClick={handleSave}
          className={s.modal_button}
        />
      </Modal>
    )
  );
};
