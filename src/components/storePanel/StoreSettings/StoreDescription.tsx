import { useAppSelector } from '@/hooks/reduxHook';
import { TextArea } from '@/components/UI';
import s from './StoreSettings.module.scss';

export const StoreDescription = () => {
  const storeDesc = useAppSelector((state) => state.storeProfile.description);

  return (
    <div className={s.form_wrap}>
      <p className={s.form_subtitle}>
        Опис (розкажіть більше про себе, ваші цінності, що вас надихає)
      </p>
      <TextArea
        name='description'
        placeholder='Додайте свій опис'
        maxLength={1000}
        defaultValue={storeDesc}
        className={s.form_textarea}
        editModeIcon={Boolean(storeDesc)}
      />
    </div>
  );
};
