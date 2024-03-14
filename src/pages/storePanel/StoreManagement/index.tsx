import defaultStorePic from '@assets/default-store-pic.svg';
import { useAppSelector } from '@/hooks/reduxHook';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import { ProfilePhoto } from '@/components/ProfilePhoto';
import { StoreBanner } from '../components/StoreBanner';
import { StoreSettings } from '../components/StoreSettings';
import s from './StoreManagement.module.scss';

export const StoreManagement = () => {
  const { width } = useWindowDimensions();
  const storePhoto = useAppSelector((state) => state.storeProfile.shop_photo);

  return (
    <section className={s.settings}>
      <StoreBanner />
      <ProfilePhoto
        isStore
        defaultPhoto={defaultStorePic}
        modalId='storePhoto'
        profilePhoto={storePhoto}
        className={s.settings_photo}
      />
      {width >= 991.98 && (
        <h4 className={s.settings_title}>Налаштування магазину</h4>
      )}
      <StoreSettings />
    </section>
  );
};
