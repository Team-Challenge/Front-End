import { FileDropProps } from "@/types";
import s from "./FileDrop.module.scss"
import { ChangeEvent, useRef, useState } from "react";

export const FileDrop = ({
  children,
  onChange = (items) => { console.log('Changed Items: ', items) },
  isMulti = false,
  allowedFormats
}: FileDropProps) => {
  const [isDraggerOver, setIsDraggedOver] = useState(false)
  const [files, setFiles] = useState()
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const onChangeFiles = (files: FileList) => {
    setError(null)
    let localError = null

    if (!isMulti && files.length > 1) {
      localError = 'Можливо додати лише один файл'
    }

    Object.values(files).forEach((file) => {
      if (!isValidType(file)) {
        localError = 'Невірний тип файлів'
      }
    })

    !localError ? onChange(files) : setError(localError)
    localError = null
  }

  const isValidType = (file: any) => {
    return !allowedFormats?.length || allowedFormats?.some(format => file.name.toLowerCase().endsWith(`${format}`)) ||
      allowedFormats?.includes(file.type)
  }

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggedOver(true)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggedOver(false)
  }

  const handleClick = () => {
    fileInputRef.current?.click();
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggedOver(false)
    onChangeFiles(e.dataTransfer.files)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.target.files && onChangeFiles(e.target.files)
  }

  return (
    <div
      className={
        `${s.file_drop}
        ${isDraggerOver ? s.file_drop_is_dragged : null}`
      }
      onClick={handleClick}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className={s.file_input_content}>
        {children || 'Натисніть щоб завантажити файли'}
        <div>{error}</div>
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
