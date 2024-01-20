import { FileDropProps } from "@/types";
import s from "./FileDrop.module.scss"
import { useRef, useState } from "react";
import { DragEvent, ChangeEvent } from "react";

export const FileDrop = ({
  children,
  className,
  onChange = (items) => { console.log('Changed Items: ', items) },
  isMulti = false,
}: FileDropProps) => {
  const [isDraggerOver, setIsDraggedOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const onChangeFiles = (files: FileList) => {
    const filesNumber = files.length

    if (!isMulti && filesNumber > 1) {
      alert('Можливо додати лише один файл')
      return;
    }

    onChange(files)
  }

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggedOver(true)
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggedOver(false)
  }

  const handleClick = () => {
    fileInputRef.current?.click();
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggedOver(false)
    onChangeFiles(e.dataTransfer.files)
  }

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.target.files && onChangeFiles(e.target.files)
  }

  return (
    <div
      className={
        `${className}
        ${s.file_drop}
        ${isDraggerOver ? s.file_drop_is_dragged : null}`
      }
      onClick={handleClick}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className={s.file_input_content}>
        {children || <p>Натисніть або перетягніть щоб завантажити файли</p>}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileInput}
        className={s.file_drop_file_input}
      />
    </div >
  );
}
