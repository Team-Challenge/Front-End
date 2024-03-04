import s from './StoreHeader.module.scss';
import { Icon } from '@iconify/react';
import defaultStorePic from '@assets/default-store-pic.svg';
import { Rating } from './Rating';
import { useAppSelector } from '@/hooks/reduxHook';
import { Tooltip } from '@/components/UI';
import { Contacts } from './Contacts';
import { HeaderDescr } from './HeaderDescr';

import { useWindowDimensions } from '@/hooks/useWindowDimensions';

export const StoreHeader = () => {
  const name = useAppSelector((state) => state.storeProfile.name);
  const shopPhoto = useAppSelector((state) => state.storeProfile.shop_photo);
  const banner = useAppSelector((state) => state.storeProfile.banner_photo);
  const shopDescription = useAppSelector(
    (state) => state.storeProfile.description,
  );

  const { width } = useWindowDimensions();

  const photoWrapperStyles = banner ? s.photoWrapper_banner : s.photoWrapper;
  const descrStylesBn = banner ? s.header_info_bn : null;
  const descrStyles = shopDescription ? s.header_descr : s.header_info;

  return (
    <div className={s.header}>
      <div className={photoWrapperStyles}>
        <div className={s.header_photo}>
          <img
            src={shopPhoto ? shopPhoto : defaultStorePic}
            alt='header photo'
          />
        </div>
        {width < 767.98 && <Contacts />}
      </div>

      {banner && (
        <div className={s.banner}>
          <img src={banner} alt='banner' />
        </div>
      )}
      <div className={`${descrStylesBn} ${descrStyles}`}>
        <div className={shopDescription ? s.header_data_descr : s.header_data}>
          <div
            className={shopDescription ? s.name_wrapper_descr : s.name_wrapper}
          >
            <p className={s.name}>{name}</p>
            <div className={s.stats_wrapper}>
              <Rating rating={4.3} />
              <p className={s.stats}>
                4.3 <span>(15 відгуків)</span>
              </p>
              <Tooltip
                text='Рейтинг магазину - це середнє значення усіх оцінок за товари. Чим більше товарів з високими оцінками - тим вище рейтинг'
                className={s.tooltip}
                isBase
              >
                <Icon icon='solar:question-circle-outline' />
              </Tooltip>
            </div>
          </div>
          {width > 767.98 && <Contacts />}
        </div>
        {shopDescription && <HeaderDescr />}
      </div>
    </div>
  );
};
