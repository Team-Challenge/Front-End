export const checkFileFormat = (file: File) => {
  const allowedExtensions = ['png', 'jpg', 'jpeg', 'webp'];

  const fileExtension = file.name.split('.').pop()?.toLowerCase();

  if (!allowedExtensions.includes(fileExtension || '')) {
    alert(`Дозволені формати файлів: ${allowedExtensions.join(', ')}`);
    return false;
  }

  return true;
};