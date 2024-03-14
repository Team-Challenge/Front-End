import { useFormContext } from 'react-hook-form';
import { PhotoUploader, Tooltip } from '@/components/UI';
import { Icon } from '@iconify/react';
import { productAddTips } from '@/constants/productAddTips';
import s from './ProductPhotos.module.scss';

const photosArray = [
  { id: 1, status: 'First' },
  { id: 2, status: 'Second' },
  { id: 3, status: 'Third' },
  { id: 4, status: 'Fourth' },
];

export const ProductPhotos = () => {
  const {
    formState: { errors },
  } = useFormContext();

  const hasPhotoErrors = errors.productPhotoFirst;

  return (
    <div className={s.photos}>
      <div className='product-add_subtitle_wrap'>
        <p className='product-add_subtitle'>
          Фото<span>*</span>
        </p>
        <Tooltip
          text={productAddTips.photos}
          isBase={false}
          className={`product-add_tooltip ${s.photos_tooltip}`}
        >
          <Icon icon='heroicons:light-bulb' />
        </Tooltip>
      </div>

      <p className='product-add_hint'>
        Додайте хоча б одне фото, щоб опублікувати товар.
        <br />
        Натисніть на іконку або перетягніть, щоб завантажити фото. Допустимі
        розміри 130*130
      </p>

      <p className={s.photos_tips}>Це фото буде на обкладинці</p>
      <ul className={s.photos_list}>
        {photosArray.map(({ id, status }) => (
          <li key={id} className={s.photos_item}>
            <PhotoUploader
              id={`productPhoto${status}`}
              required={status === 'First'}
              isPhotoDeleted={status !== 'First'}
            >
              <Icon
                icon='solar:camera-outline'
                className={s.photos_item_icon}
              />
            </PhotoUploader>
          </li>
        ))}
      </ul>

      {hasPhotoErrors && (
        <p className='error-text'>Будь ласка, завантажте фото свого товару</p>
      )}
    </div>
  );
};
