export const transformNicknameToInstagramLink = (nickname: string) => {
  return nickname.startsWith('@')
  ? `https://www.instagram.com/${nickname.substring(1)}`
  : `https://www.instagram.com/${nickname}`;
}

export const transformInstagramLinkToNickname = (link: string) => {
  const username = link.match(/instagram.com\/([a-zA-Z0-9_]+)/);
  return `@${username}`;
};