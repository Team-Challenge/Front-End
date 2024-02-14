export const checkFileSize = (file: File, maxSize: number) => {
  const fileSize = file.size / 1024 / 1024;

  if (fileSize > maxSize) {
    alert(`Файл повинен бути менше ${maxSize} MB`);
    return false;
  }

  return true;
};
