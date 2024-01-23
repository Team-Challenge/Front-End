export const FULL_NAME_REGEX =
  /^(?!.*--)(?!.*``)(?!.*'')[A-Za-zА-Яа-яІіЇїЄє '`-]{2,30}$/u;
export const EMAIL_REGEX =
  /^(?!.*--)(?!.*__)(?!.*\.\.)(?!.*-$)(?!.*\.$)(?!.*^\..*$)(?!.*\.$)(?!.*^-)[\w\.-]+@([\w-]+\.)+[\w-]{2,4}$/g;
export const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/;
export const PHONE_NUMBER_REGEX = /^\+380\d{9}$/;
export const INSTAGRAM_NICKNAME_REGEX =
  /^(?!.*\.\.)(?!.*\.$)@{0,1}[a-zA-Z0-9.,_]{2,30}$/;
