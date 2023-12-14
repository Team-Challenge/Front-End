/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.jpg';
declare module '*.png';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//auth types
export interface LoginFormProps {
  isForgotPassword: () => void;
  isSuccessLogin: () => void;
}

export interface RegistrationFormProps {
  isSuccessRegistration: () => void;
}

export interface PasswordRecoveryFormProps {
  isForgotPassword: () => void;
}

export interface IUserAuth {
  full_name?: string;
  email: string;
  checkbox?: boolean;
  password: string;
  passwordRepeat?: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: SignUpEmailType;
}

//UI types
export interface OrnamentalTitleProps {
  tag: keyof JSX.IntrinsicElements;
  text: string;
  className?: string;
}

export interface ButtonUIProps {
  label: string;
  variant?: string;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'reset' | 'submit';
  disabled?: boolean;
}

export interface ModalProps {
  children: React.ReactNode;
  modalId: string;
  className?: string;
}

export interface ProductItemProps {
  img: string;
  title: string;
  subtitle: string;
  desc: string;
  link?: string; // for btn
}

export interface TextInputProps {
  type: string;
  id: string;
  value?: string;
  placeholder: string;
  required?: boolean;
  isAuth?: boolean;
  isAuthError?: boolean;
  editModeIcon?: boolean;
  onClick?: () => void;
  regex?: RegExp;
  errorMessage?: string;
  minLength?: number;
  minLengthMessage?: string;
  maxLength?: number;
  maxLengthMessage?: string;
  className?: string;
}

export interface PasswordInputProps {
  id: string;
  placeholder: string;
  required: boolean;
  isAuth?: boolean;
  isAuthError?: boolean;
  validate?: any;
  onClick?: () => void;
  isRepeatPassword?: boolean;
  className?: string;
}

export interface FullNameProps {
  value?: string;
  editModeIcon?: boolean;
}

export interface EmailProps {
  required?: boolean;
  onClick?: () => void;
  isAuth?: boolean;
  isAuthError?: boolean;
}

export interface PhoneNumberProps {
  userPhoneNumber?: string;
}

//user info types
export interface UserInfo {
  email: string;
  full_name: string;
  phone_number: string | null;
  profile_picture: null;
}

export interface SettingsFormData {
  current_password?: string;
  new_password?: string;
  new_password_repeat?: string;
  email?: string;
  phoneNumber?: string;
}

export interface CreateNewStoreProps {
  onSubmit: SubmitHandler<FormData>;
}

export interface NewStoreFormData {
  name: string;
}

export interface ChangeFullNameFormData {
  full_name: string;
}

export interface UserPanelEmptyPageProps {
  title: string;
  text: string;
  icon: React.ReactNode;
}

export interface UserProfileMenuProps {
  closeUserMenu: () => void;
}

export interface StoreProfileMenuProps {
  closeStoreMenu: () => void;
}