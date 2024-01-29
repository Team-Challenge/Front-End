import {
  ringSizeList,
  ringSizeMeasurementSteps,
} from '@/constants/ringsSizeList';
import iconRing from '@assets/icon-ring.svg';
import s from './RingsSizeChart.module.scss';

export const RingsSizeChart = () => {
  return (
    <div>
      <p className={s.rings_subtitle}>
        Для того, щоб визначити розмір каблучки:
      </p>

      <ul className={s.steps_list}>
        {ringSizeMeasurementSteps.map(({ id, step }) => (
          <li key={id} className={s.steps_item}>
            {step}
          </li>
        ))}
      </ul>

      <ul className={s.size_list}>
        {ringSizeList.map(({ id, size, length, styleClass }) => (
          <li className={s.size_item} key={id}>
            <p>{size}</p>
            <img src={iconRing} alt='' className={s[styleClass]} />
            <p>{length} мм</p>
            <span />
          </li>
        ))}
      </ul>
    </div>
  );
};
