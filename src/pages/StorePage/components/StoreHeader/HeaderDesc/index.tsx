import { useState } from 'react';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import { useAppSelector } from '@/hooks/reduxHook';
import s from './HeaderDesc.module.scss';

export const HeaderDesc = ({
  desktopText,
  mobileText,
}: {
  desktopText: number;
  mobileText: number;
}) => {
  const [isShow, setIsShow] = useState(false);
  const { width } = useWindowDimensions();
  const shopDescription = useAppSelector(
    (state) => state.storeProfile.description,
  );

  if (!shopDescription) {
    return null;
  }

  if (shopDescription.trim().length === 0) {
    return null;
  }

  const descMaxLength = width > 479.98 ? desktopText : mobileText;

  const trimmedDesc =
    shopDescription.length < descMaxLength
      ? shopDescription
      : `${shopDescription.slice(0, descMaxLength)}...`;

  const description = isShow ? shopDescription : trimmedDesc;

  return (
    <div className={s.desc_wrapper}>
      <p className={s.header_desc}>{description} </p>
      {shopDescription.length > descMaxLength && (
        <button
          type='button'
          className={s.readMore}
          onClick={() => {
            setIsShow(!isShow);
          }}
        >
          {isShow ? 'приховати' : '...читати більше'}
        </button>
      )}
    </div>
  );
};
