export const copyToClipboard = async (data: string) => {
    try {
      await navigator.clipboard.writeText(data);
      console.log('success');

    } catch (err) {
      console.error('Failed to copy!', err);
  }
  };