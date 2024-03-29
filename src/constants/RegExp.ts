export const FULL_NAME_REGEX =
  /^(?!.*--)(?!.*``)(?!.*'')[A-Za-zА-Яа-яІіЇїЄє '`-]{2,30}(?:\s[A-Za-zА-Яа-яІіЇїЄє '`-]{2,30})$/u;
export const EMAIL_REGEX =
  /^(?!.*--)(?!.*__)(?!.*\.\.)(?!.*-$)(?!.*\.$)(?!.*^\..*$)(?!.*\.$)(?!.*^-)[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/g;
export const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/;
export const PHONE_NUMBER_REGEX = /^\+380\d{9}$/;
export const PARCEL_NUMBER_REGEX = /^[a-zA-Z0-9]{10,}/;
export const INSTAGRAM_NICKNAME_REGEX =
  /^(?!.*\.\.)(?!.*\.$)@{0,1}[a-zA-Z0-9.,_]{2,30}$/;

export const INTEGER_REGEX = /^\d+$/;
export const DEADLINE_REGEX = /^[1-9][0-9]{0,2}-(?!0$)[1-9][0-9]{0,2}$/;
export const PARAMETERS_REGEX = /^\d+(?:,\d+|\.\d+)*$/;
