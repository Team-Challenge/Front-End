import { DragEvent, ChangeEvent, useRef, useState, KeyboardEvent } from 'react';
import { useFormContext } from 'react-hook-form';
import { PhotoUploaderProps } from '@/types';
import { checkFileFormat } from '@/utils/checkFileFormat';
import { checkFileSize } from '@/utils/checkFileSize';
import { Icon } from '@iconify/react';
import s from './PhotoUploader.module.scss';

export const PhotoUploader = ({
  id,
  required,
  children,
  className,
  isPhotoDeleted,
}: PhotoUploaderProps) => {
  const { register, setValue, clearErrors } = useFormContext();
  const [previewImage, setPreviewImage] = useState<File | null>(null);
  const hiddenFileInput = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (file: File) => {
    const isFileSizeValid = checkFileSize(file, 5);
    const isFileFormatValid = checkFileFormat(file);

    if (isFileSizeValid && isFileFormatValid && file) {
      setPreviewImage(file);
      setValue(id as string, file);
      clearErrors(id);
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleFileChange(file as File);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event?.target?.files?.[0];
    handleFileChange(file as File);
  };

  const openFileInput = () => {
    hiddenFileInput?.current?.click();
  };

  const handleEnterKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      openFileInput();
    }
  };

  const preventDefault = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDeletePhoto = () => {
    setPreviewImage(null);
    setValue(id as string, null);
  };

  return (
    <>
      <div
        onDragEnter={preventDefault}
        onDragOver={preventDefault}
        onDragLeave={preventDefault}
        onDrop={handleDrop}
        onClick={openFileInput}
        onKeyDown={(event) => handleEnterKey(event)}
        tabIndex={0}
        className={`${className} ${s.uploader} ${
          previewImage ? s.uploader_inactive : s.uploader_active
        }`}
      >
        <input
          {...register(id as string, { required: required })}
          ref={hiddenFileInput}
          type='file'
          accept='image/*'
          onChange={handleInputChange}
          className={s.uploader_input}
        />
        {previewImage ? (
          <img
            src={URL.createObjectURL(previewImage)}
            alt='product'
            className={s.uploader_photo}
          />
        ) : (
          <>
            {children || <p>Натисніть або перетягніть щоб завантажити файли</p>}
          </>
        )}
      </div>
      {isPhotoDeleted && (
        <button
          type='button'
          className={s.button_delete}
          onClick={handleDeletePhoto}
        >
          <Icon icon='iconamoon:close-light' />
        </button>
      )}
    </>
  );
};
