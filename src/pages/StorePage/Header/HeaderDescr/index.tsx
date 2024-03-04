import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import { useState } from 'react';
import { useAppSelector } from '@/hooks/reduxHook';
import s from './HeaderDescr.module.scss';

export const HeaderDescr = () => {
  const [isShow, setIsShow] = useState(false);
  const { width } = useWindowDimensions();
  const shopDescription = useAppSelector(
    (state) => state.storeProfile.description,
  );

  return (
    <p className={`${s.header_rev} ${isShow ? s.header_revActive : null}`}>
      {shopDescription}
      {width < 479.98 && (
        <button
          type='button'
          className={`${s.readMore} ${isShow ? s.readMore_active : null}`}
          onClick={() => {
            setIsShow(!isShow);
          }}
        >
          {isShow ? 'приховати' : '...читати більше'}
        </button>
      )}
    </p>
  );
};
