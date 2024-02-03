import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import { PhotoUploader, Tooltip } from '@/components/UI';
import { Icon } from '@iconify/react';
import s from './ProductPhotos.module.scss';

export const ProductPhotos = () => {
  const { width } = useWindowDimensions();

  return (
    <div className={s.photos}>
      <div className='product-add_subtitle_wrap'>
        <p className='product-add_subtitle'>
          Фото<span>*</span>
        </p>
        <Tooltip
          text='Використовуйте природне світло та уникайте спалаху. Під час фотографування акцентуйте увагу на тому, як виглядають прикраси під час носіння. Оберіть світлий та нейтральний фон для кращого візуального враження. Збільште кількість деталей та варіюйте кути зйомки, щоб забезпечити повноцінний огляд прикрас.'
          className={`product-add_tooltip ${s.photos_tooltip}`}
        >
          <Icon icon='heroicons:light-bulb' />
        </Tooltip>
      </div>

      <p className='product-add_hint'>
        Натисніть на іконку або перетягніть, щоб завантажити фото. Допустимі
        розміри 130*130
      </p>

      {width <= 1027 && (
        <p className={s.photos_tips}>Це фото буде на обкладинці</p>
      )}
      <ul className={s.photos_list}>
        {[1, 2, 3, 4].map((item) => (
          <li key={item} className={s.photos_item}>
            <PhotoUploader>
              <Icon icon='solar:camera-outline' />
            </PhotoUploader>
            {width >= 1028 && item === 1 && (
              <p className={s.photos_tips}>Це фото буде на обкладинці</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
