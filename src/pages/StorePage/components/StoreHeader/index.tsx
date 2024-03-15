import defaultStorePic from '@assets/default-store-pic.svg';
import { Icon } from '@iconify/react';
import { useAppSelector } from '@/hooks/reduxHook';
import { Tooltip } from '@/components/UI';
import { Rating } from './Rating';
import { Contacts } from './Contacts';
import { HeaderDesc } from './HeaderDesc';
import s from './StoreHeader.module.scss';

export const StoreHeader = () => {
  const name = useAppSelector((state) => state.storeProfile.name);
  const shopPhoto = useAppSelector((state) => state.storeProfile.shop_photo);
  const banner = useAppSelector((state) => state.storeProfile.banner_photo);
  const shopDescription = useAppSelector(
    (state) => state.storeProfile.description,
  );

  return (
    <div className={s.header}>
      {banner && (
        <div className={s.banner}>
          <img src={banner} alt='banner' />
        </div>
      )}
      <div
        className={`${s.header_photo} ${
          shopDescription.length > 500 ? s.header_photo_center : ''
        }`}
      >
        <img src={shopPhoto || defaultStorePic} alt='shopPhoto' />
      </div>
      <div className={s.header_details}>
        <div className={s.header_info}>
          <p className={s.header_name}>{name}</p>
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
          {shopDescription && <HeaderDesc />}
        </div>
      </div>
      <div className={s.contacts_wrapper}>
        <Contacts hideText={1260} />
      </div>
    </div>
  );
};
