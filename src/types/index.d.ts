/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.jpg';
declare module '*.png';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  buttonText?: string;
}

export interface TextInputProps {
  type: string;
  id: string;
  placeholder: string;
  required?: boolean;
  regex?: RegExp;
  errorMessage?: string;
  minLength?: number;
  minLengthMessage?: string;
  maxLength?: number;
  maxLengthMessage?: string;
  className?: string;
}

export interface SignUpOptionsProps {
  handleSignUpEmail: () => void;
}

export interface IUserAuth {
  full_name?: string;
  email: string;
  checkbox?: boolean;
  password: string;
  passwordRepeat?: string;
}

export interface SignUpEmailProps {
  openModal: () => void;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: SignUpEmailType;
}

export interface AuthHeaderProps {
  text: string;
}

export interface AuthData {
  openModal?: () => void;
  isRegistration?: boolean;
}

export interface AuthButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  variant?: string;
  disabled?: boolean;
}

export interface SettingsFromData {
  current_password?: string;
  new_password?: string;
  new_password_repeat?: string;
  email?: string;
  phoneNumber?: string;
}

export interface UserInfo {
  email: string;
  full_name: string;
  phone_number: string | null;
  profile_picture: null;
}

export interface ChangeFullNameFormData {
  full_name: string;
}

export interface ProductItemProps {
  img: string;
  title: string;
  subtitle: string;
  desc: string;
  link?: string; // for btn
}

export interface ButtonUIProps {
  label: string;
  variant?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export interface PasswordInputProps {
  id: string;
  placeholder: string;
  required: boolean;
  validate?: any;
}

export interface ProfileProps {
  userName: string;
}

export interface SettingsProps {
  userPhone?: string;
}
