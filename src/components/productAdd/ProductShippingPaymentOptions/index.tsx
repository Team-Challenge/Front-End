import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  deliveryMethods,
  paymentMethods,
} from '@/constants/productShippingPaymentOptions';
import { ToggleSwitch } from '@/components/UI';
import s from './ProductShippingPaymentOptions.module.scss';

export const ProductShippingPaymentOptions = () => {
  const { setValue } = useFormContext();
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<
    string[]
  >([]);
  const [selectedDeliveryMethods, setSelectedDeliveryMethods] = useState<
    string[]
  >([]);

  const handleSelectedPaymentMethod = (id: string) => {
    if (selectedPaymentMethods.includes(id)) {
      setSelectedPaymentMethods(selectedPaymentMethods.filter((c) => c !== id));
    } else if (selectedPaymentMethods.length < 3) {
      setSelectedPaymentMethods([...selectedPaymentMethods, id]);
    }
  };

  const handleSelectedDeliveryMethod = (id: string) => {
    if (selectedDeliveryMethods.includes(id)) {
      setSelectedDeliveryMethods(
        selectedDeliveryMethods.filter((c) => c !== id),
      );
    } else if (selectedDeliveryMethods.length < 3) {
      setSelectedDeliveryMethods([...selectedDeliveryMethods, id]);
    }
  };

  useEffect(() => {
    setValue('paymentMethods', selectedPaymentMethods);
  }, [selectedPaymentMethods]);

  useEffect(() => {
    setValue('deliveryMethods', selectedDeliveryMethods);
  }, [selectedDeliveryMethods]);

  return (
    <>
      <div>
        <p className='product-add_subtitle'>
          Оберіть способи оплати<span>*</span>
        </p>
        <ul className={s.logistics_list}>
          {paymentMethods.map(({ id, icon, title, desc }) => (
            <li key={id} className={s.logistics_item}>
              <i className={s.logistics_icon}>{icon}</i>
              <h6 className={s.logistics_title}>{title}</h6>
              <p className={s.logistics_desc}>{desc}</p>
              <ToggleSwitch
                name='payment'
                id={id}
                className={s.logistics_toggle}
                onChange={() => handleSelectedPaymentMethod(id)}
              />
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className='product-add_subtitle'>
          Оберіть способи доставки<span>*</span>
        </p>
        <ul className={s.logistics_list}>
          {deliveryMethods.map(({ id, icon, title, desc }) => (
            <li key={id} className={s.logistics_item}>
              <img src={icon} alt={title} className={s.logistics_icon} />
              <h6 className={s.logistics_title}>{title}</h6>
              <p className={s.logistics_desc}>{desc}</p>
              <ToggleSwitch
                id={id}
                className={s.logistics_toggle}
                onChange={() => handleSelectedDeliveryMethod(id)}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
