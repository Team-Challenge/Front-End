import { TextInput } from '@/components/UI';
import { INSTAGRAM_NICKNAME_REGEX } from '@/constants/RegExp';
import { useAppSelector } from '@/hooks/reduxHook';
import { transformInstagramLinkToNickname } from '@/utils/transformInstagramLink';
import s from './StoreSettings.module.scss';

export const StoreSocialMediaLink = () => {
  const storeSocialMediaLink = useAppSelector(
    (state) => state.storeProfile.link,
  );
  const instagramLink =
    storeSocialMediaLink &&
    transformInstagramLinkToNickname(storeSocialMediaLink);

  return (
    <div className={s.form_wrap}>
      <p className={s.form_subtitle}>Посилання на Instagram</p>
      <TextInput
        type='text'
        id='link'
        placeholder='@myshop'
        value={instagramLink}
        required={false}
        regex={INSTAGRAM_NICKNAME_REGEX}
        errorMessage={'Будь ласка, введіть ваш нікнейм'}
        editModeIcon={Boolean(instagramLink)}
      />
    </div>
  );
};
