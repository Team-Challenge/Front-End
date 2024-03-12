/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.jpg';
declare module '*.png';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface MultiDataMapping {
  [key: string]: string[];
}

export interface BooleanState {
  [key: string]: boolean;
}

// auth types
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

// UI types
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
  isLink?: boolean;
  path?: string;
}

export interface FileDropProps {
  children?: ReactNode;
  className?: string;
  onChange?: (any) => void;
  isMulti?: boolean;
}

export interface PhotoUploaderProps {
  id: string;
  required?: boolean;
  children?: ReactNode;
  className?: string;
  isPhotoDeleted?: boolean;
}

export interface ModalProps {
  children: ReactNode;
  modalId: string;
  className?: string;
}

export interface ProductItemProps {
  img: string;
  title: string;
  subtitle: string;
  desc: string;
  link?: string;
}

export interface TextInputProps {
  type: string;
  id: string;
  value?: string;
  placeholder: string;
  required?: boolean;
  isServerValidation?: boolean;
  isServerError?: boolean;
  editModeIcon?: boolean;
  onClick?: () => void;
  onInput?: (event) => void;
  regex?: RegExp;
  errorMessage?: string;
  minLength?: number;
  minLengthMessage?: string;
  maxLength?: number;
  maxLengthMessage?: string;
  className?: string;
  shouldApplyErrorStyles?: boolean;
  shouldApplySuccessStyles?: boolean;
}

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  name?: string;
  required?: boolean;
  defaultValue?: string;
  placeholder?: string;
  cols?: number;
  rows?: number;
  maxLength?: number;
  className?: string;
  editModeIcon?: boolean;
  errorMessage?: string;
  shouldApplyErrorStyles?: boolean;
  shouldApplySuccessStyles?: boolean;
}

export interface PasswordInputProps {
  id: string;
  placeholder: string;
  required: boolean;
  isServerValidation?: boolean;
  isServerError?: boolean;
  validate?: any;
  onClick?: () => void;
  isRepeatPassword?: boolean;
  className?: string;
}

export interface SelectInputProps {
  field: {
    onChange: (value: string) => void;
    onBlur: () => void;
    value: string;
    ref: React.Ref<any>;
  };
  options: SelectProps<any>['options'];
  placeholder: string;
  isSearchable?: boolean;
  className?: string;
  isDisabled?: boolean;
  mode?: 'multiple' | 'tags';
  maxCount?: number;
}

export interface TooltipProps {
  text: string;
  children: ReactNode;
  className?: string;
  isBase?: boolean;
}

export interface QuantityInputProps {
  type: string;
  id: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  unit: string;
  maxLength?: number;
  errorMessage?: string;
  label?: string;
  field?: any;
  fieldState?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ToggleSwitchProps {
  id: string;
  name?: string;
  className?: string;
  field?: any;
  value?: boolean;
  onChange?: (e?: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface FullNameProps {
  value?: string;
  editModeIcon?: boolean;
}

export interface EmailProps {
  required?: boolean;
  onClick?: () => void;
  isServerValidation?: boolean;
  isServerError?: boolean;
}

export interface PhoneNumberProps {
  phoneNumber?: string;
}

export interface DataChangeNotificationModalProps {
  isSuccessfulChange: boolean;
  modalId: string;
}

export interface ProfilePhotoProps {
  defaultPhoto: string;
  modalId: string;
  profilePhoto: string;
  isUser?: boolean;
  isStore?: boolean;
  className?: string;
}

export interface ButtonsBarProps {
  buttonsList: Array<{
    id: number;
    label: string;
  }>;
  className?: string;
  onStatusChange?: (arg0: string) => void;
}

export interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  className?: string;
}

export interface PaginationHookProps<T> {
  currentPage: number;
  changePage: (pageNumber: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  pageData: () => T[];
}

// user info types
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
  phone_number?: string;
  city?: string;
  post?: string;
  branches?: string;
  address?: string;
}

export interface UserSettingsFormProps {
  changeDataResult: (arg0: boolean) => void;
}

export interface PostDeliveryInfo {
  city_name: string;
  branches: {
    branch_name?: string;
    branch_number?: string;
    address: string;
  }[];
}

export interface CreateNewStoreFormData {
  name: string;
  phone_number: string;
}

export interface StoreSettingsFormProps {
  name: string;
  phone_number: string;
  link: string;
  description: string;
}

export interface ChangeFullNameFormData {
  full_name: string;
}

export interface EmptyContentPageProps {
  title: string;
  text: string;
  item: ReactNode;
}

export interface UserProfileMenuProps {
  closeUserMenu: () => void;
}

export interface StoreProfileMenuProps {
  closeStoreMenu: () => void;
}

export interface BannerModalProps {
  handleBannerUpload: (files: FileList) => Promise<void>;
}

export interface ProductCharacteristic {
  parameters?: Array<{
    length: string;
    width: string;
    weight: string;
    size: null | string;
  }>;
  coating?: string[];
  colors?: string[];
  deadline?: string;
  decorative_elements?: string[];
  metals?: string[];
  other?: string[];
  stones?: string[];
  textiles?: string[];
  care_instructions?: string;
}

export interface ProductAddForm {
  productName: string;
  description?: string;
  productPhotoFirst: File;
  productPhotoSecond: File;
  productPhotoThird: File;
  productPhotoFourth: File;
  category: number;
  subcategory: string;
  status: string;
  uniqueItem?: boolean;
  deadline?: string;
  price: string;
  colors?: string[];
  parameters?: Array<{
    length: string;
    width: string;
    weight: string;
    size: null | string;
  }>;
  metals?: string[];
  coating?: string[];
  decorativeElements?: string[];
  stones?: string[];
  textiles?: string[];
  other?: string[];
  careInstructions?: string;
  paymentMethods: {
    cardPayment: boolean;
    cashPayment: boolean;
    securePayment: boolean;
  };
  deliveryMethods: {
    novaPost: boolean;
    ukrPost: boolean;
  };
  refunds?: boolean;
}

export interface ProductCardProps {
  photos: Array<{
    id: number;
    main: boolean;
    product_photo: string;
    timestamp: string;
  }>;
  productName: string;
  status: string;
  price: string;
  isUnique?: boolean;
  storeName?: string;
}

// store panel types
export interface ProductStoreItemProps {
  photos: Array<{
    id: number;
    main: boolean;
    product_photo: string;
    timestamp: string;
  }>;
  title: string;
  date: string;
  code: number;
  price: string;
  categoryId: number;
  status: string;
  onClick?: () => void;
}

export interface OrderItemProps {
  orderNumber: string;
  date: string;
  status: string;
  price: string;
  updateDate: string;
}

export interface OrderProductItemProps {
  img: string;
  productTitle: string;
  productCode: string;
  quantity: string;
  productPrice: string;
}

export interface ReviewItemProps {
  productPhoto: string;
  productName: string;
  rating: number;
  feedback: string;
  userPhoto: string;
  userName: string;
  date: string;
}

export interface RatingItemProps {
  rating: number;
  percent: number;
  numberOfReviews: number;
}

export interface ToastProps {
  message: string;
  toastType?: string;
  isShow: boolean;
  handleShowMessage: (type: boolean) => void;
}
