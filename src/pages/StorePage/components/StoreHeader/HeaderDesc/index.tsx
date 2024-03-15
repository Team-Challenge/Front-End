import { useState } from 'react';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import { useAppSelector } from '@/hooks/reduxHook';
import s from './HeaderDesc.module.scss';

export const HeaderDesc = () => {
  const [isShow, setIsShow] = useState(false);
  const { width } = useWindowDimensions();
  const shopDescription = useAppSelector(
    (state) => state.storeProfile.description,
  );

  const trimmedDesc =
    shopDescription.length < 100
      ? shopDescription
      : `${shopDescription.slice(0, 100)}...`;

  console.log(trimmedDesc);

  const mobileDesc = isShow ? shopDescription : trimmedDesc;

  return shopDescription.trim().length ? (
    <p className={s.header_desc}>
      {width > 479.98 && shopDescription}
      {width < 479.98 && (
        <>
          {mobileDesc}
          {trimmedDesc.length > 76 && (
            <button
              type='button'
              className={s.readMore}
              onClick={() => {
                setIsShow(!isShow);
              }}
            >
              {isShow ? 'приховати' : 'читати більше'}
            </button>
          )}
        </>
      )}
    </p>
  ) : null;
};
