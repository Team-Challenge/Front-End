import s from './Toast.module.scss';

type Props = {
  message: string;
  toastType?: string;
  isShow: boolean;
  handleShowMessage: (type: boolean) => void;
};

export const Toast = ({
  message = 'Помилка повідомлення!',
  toastType = 'success',
  isShow = false,
  handleShowMessage,
}: Props) => {
  let typeStyle = 'success';
  let timerId: number;

  switch (toastType) {
    case 'info':
      typeStyle = s.toast_info;
      break;
    case 'success':
      typeStyle = s.toast_success;
      break;
    case 'warning':
      typeStyle = s.toast_warning;
      break;
    case 'error':
      typeStyle = s.toast_error;
      break;

    default:
      console.log('error');
      break;
  }

  if (isShow) {
    timerId = window.setTimeout(() => {
      handleShowMessage(false);
    }, 3000);
  }

  return (
    isShow && (
      <div
        role='button'
        tabIndex={0}
        className={`${s.toast} ${typeStyle}`}
        onClick={() => {
          handleShowMessage(false);
          clearInterval(timerId);
        }}
        onKeyDown={() => {}}
      >
        <div className={s.toast_contentWrapper}>
          <p className={s.toast_message}>{message}</p>
        </div>
      </div>
    )
  );
};
