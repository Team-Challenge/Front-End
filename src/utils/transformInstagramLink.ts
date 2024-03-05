export const transformNicknameToInstagramLink = (nickname: string) => {
  return nickname.startsWith('@')
    ? `https://www.instagram.com/${nickname.substring(1)}`
    : `https://www.instagram.com/${nickname}`;
};

export const transformInstagramLinkToNickname = (link: string) => {
  const regex = /https:\/\/www\.instagram\.com\/([^/?]+)\/?/i;
  const match = link.match(regex);
  return match && `@${match[1]}`;
};
