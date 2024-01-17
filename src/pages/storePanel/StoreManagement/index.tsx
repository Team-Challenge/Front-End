import { StoreSettings } from '@/components/storePanel/StoreSettings';
import { useAppSelector } from '@/hooks/reduxHook';
import { ProfilePhoto } from '@/components/ProfilePhoto';
import defaultStorePic from '@assets/default-store-pic.svg';
import s from './StoreManagement.module.scss';

export const StoreManagement = () => {
  const storePhoto = useAppSelector((state) => state.storeProfile.shop_photo);

  return (
    <section className={s.settings}>
      <ProfilePhoto
        isStore
        defaultPhoto={defaultStorePic}
        modalId='storePhoto'
        profilePhoto={storePhoto}
      />
      <h4 className={s.settings_title}>Налаштування магазину</h4>
      <StoreSettings />
    </section>
  );
};
