export const FULL_NAME_REGEX = /^[a-zA-Z\xC0-\uFFFF]+([ \-']{0,1}[a-zA-Z\xC0-\uFFFF]+){1,4}\s[a-zA-Z\xC0-\uFFFF]+([ \-']{0,1}[a-zA-Z\xC0-\uFFFF]+){0,2}$/u;
export const EMAIL_REGEX = /^[\p{L}\p{N}_.-]+@([\p{L}\p{N}-]+\.)+[\p{L}\p{N}-]{2,}$/gu;
export const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/;
export const PHONE_NUMBER_REGEX = /^\+380\d{9}$/;