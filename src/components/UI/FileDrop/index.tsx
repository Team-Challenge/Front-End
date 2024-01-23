import { DragEvent, ChangeEvent, useRef } from 'react';
import { FileDropProps } from '@/types';
import s from './FileDrop.module.scss';

export const FileDrop = ({
  children,
  className,
  onChange = () => {},
  isMulti = false,
}: FileDropProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onChangeFiles = (files: FileList) => {
    const filesNumber = files.length;

    if (!isMulti && filesNumber > 1) {
      alert('Можливо додати лише один файл');
      return;
    }

    onChange(files);
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onChangeFiles(e.dataTransfer.files);
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.target.files && onChangeFiles(e.target.files);
  };

  return (
    <div
      className={`${className} ${s.dropzone}`}
      onClick={handleClick}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {children || <p>Натисніть або перетягніть щоб завантажити файли</p>}
      <input
        ref={fileInputRef}
        type='file'
        onChange={handleFileInput}
        className={s.dropzone_input}
      />
    </div>
  );
};
