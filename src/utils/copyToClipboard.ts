export const copyToClipboard = async (data: string) => {
  if (data) {
    await navigator.clipboard.writeText(data);
    return data;
  }

  throw Error('Failed to copy!');
};
