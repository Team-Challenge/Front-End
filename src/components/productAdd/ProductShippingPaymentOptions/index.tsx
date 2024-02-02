import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
  deliveryMethods,
  paymentMethods,
} from '@/constants/productShippingPaymentOptions';
import { ToggleSwitch } from '@/components/UI';
import s from './ProductShippingPaymentOptions.module.scss';

export const ProductShippingPaymentOptions = () => {
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<
    string[]
  >([]);
  const [selectedDeliveryMethods, setSelectedDeliveryMethods] = useState<
    string[]
  >([]);

  const {
    control,
    setValue,
    clearErrors,
    formState: { errors },
  } = useFormContext();

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
      <div className={s.payment}>
        <p className='product-add_subtitle'>
          Оберіть способи оплати<span>*</span>
        </p>
        <ul className={s.list}>
          {paymentMethods.map(({ id, icon, title, desc }) => (
            <li key={id} className={s.item}>
              <i className={s.item_icon}>{icon}</i>
              <h6 className={s.item_title}>{title}</h6>
              <p className={s.item_desc}>{desc}</p>
              <Controller
                name='paymentMethods'
                control={control}
                rules={{
                  required:
                    selectedPaymentMethods.length > 0
                      ? false
                      : 'Будь ласка, оберіть принаймні один варіант оплати.',
                }}
                render={({ field }) => (
                  <ToggleSwitch
                    field={field}
                    id={id}
                    className={s.item_toggle}
                    onChange={() => {
                      handleSelectedPaymentMethod(id);
                      clearErrors('paymentMethods');
                    }}
                  />
                )}
              />
            </li>
          ))}
        </ul>

        {errors.paymentMethods && (
          <p className='error-text'>
            {errors.paymentMethods.message as string}
          </p>
        )}
      </div>

      <div className={s.delivery}>
        <p className='product-add_subtitle'>
          Оберіть способи доставки<span>*</span>
        </p>
        <ul className={s.list}>
          {deliveryMethods.map(({ id, icon, title, desc }) => (
            <li key={id} className={s.item}>
              <img src={icon} alt={title} className={s.item_icon} />
              <h6 className={s.item_title}>{title}</h6>
              <p className={s.item_desc}>{desc}</p>
              <Controller
                name='deliveryMethods'
                control={control}
                rules={{
                  required:
                    selectedDeliveryMethods.length > 0
                      ? false
                      : 'Будь ласка, оберіть принаймні один варіант доставки.',
                }}
                render={({ field }) => (
                  <ToggleSwitch
                    field={field}
                    id={id}
                    className={s.item_toggle}
                    onChange={() => {
                      handleSelectedDeliveryMethod(id);
                      clearErrors('deliveryMethods');
                    }}
                  />
                )}
              />
            </li>
          ))}
        </ul>

        {errors.deliveryMethods && (
          <p className='error-text'>
            {errors.deliveryMethods.message as string}
          </p>
        )}
      </div>
    </>
  );
};
