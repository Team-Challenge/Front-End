import s from './Toast.module.scss';

type Props = {
  message: string;
  toastType?: string;
  isShow: boolean;
  handleShowMessage: Function;
};

export const Toast = ({
  message = 'Помилка повідомлення!',
  toastType = 'success',
  isShow = false,
  handleShowMessage,
}: Props) => {
  let typeStyle = null;
  let timerId: any = null;

  switch (toastType) {
    case 'info':
      typeStyle = s.info;
      break;
    case 'success':
      typeStyle = s.success;
      break;
    case 'warning':
      typeStyle = s.warning;
      break;
    case 'error':
      typeStyle = s.error;
      break;

    default:
      console.log('error');
      break;
  }

  if (isShow) {
    timerId = setTimeout(() => {
      handleShowMessage(false);
    }, 3000);
  }

  return (
    isShow && (
      <div
        className={`${s.toast} ${typeStyle}`}
        onClick={() => {
          handleShowMessage(false);
          clearInterval(timerId);
        }}
      >
        <div className={s.toast_contentWrapper}>
          <p className={s.toast_message}>{message}</p>
        </div>
      </div>
    )
  );
};
