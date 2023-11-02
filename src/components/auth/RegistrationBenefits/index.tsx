import { benefitsOfRegistration } from '@/constants';
import s from './RegistrationBenefits.module.scss';

export const RegistrationBenefits = () => {
  return (
    <div className={s.benefits}>
      <h1 className={s.title}>Benefits of Website Registration</h1>
      {benefitsOfRegistration.map((benefit) => (
        <div key={benefit.id} className={s.item}>
          <h3 className={s.item_title}>{benefit.title}</h3>
          <p className={s.item_text}>{benefit.description}</p>
        </div>
      ))}
    </div>
  );
};
