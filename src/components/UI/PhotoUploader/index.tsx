import { DragEvent, ChangeEvent, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { PhotoUploaderProps } from '@/types';
import { checkFileFormat } from '@/utils/checkFileFormat';
import { checkFileSize } from '@/utils/checkFileSize';
import s from './PhotoUploader.module.scss';

export const PhotoUploader = ({
  children,
  className,
  id,
  required,
}: PhotoUploaderProps) => {
  const { register, setValue } = useFormContext();
  const [previewImage, setPreviewImage] = useState<File | null>(null);
  const hiddenFileInput = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (file: File) => {
    const isFileSizeValid = checkFileSize(file, 5);
    const isFileFormatValid = checkFileFormat(file);

    if (isFileSizeValid && isFileFormatValid && file) {
      setPreviewImage(file);
      setValue(id as string, file);
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

  const preventDefault = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div
      onDragEnter={preventDefault}
      onDragOver={preventDefault}
      onDragLeave={preventDefault}
      onDrop={handleDrop}
      onClick={openFileInput}
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
          alt='photo'
          className={s.uploader_photo}
        />
      ) : (
        <>
          {children || <p>Натисніть або перетягніть щоб завантажити файли</p>}
        </>
      )}
    </div>
  );
};
