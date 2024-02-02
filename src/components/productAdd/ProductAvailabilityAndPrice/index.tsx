import { Controller, useFormContext } from 'react-hook-form';
import { QuantityInput } from '@/components/UI/QuantityInput';
import { Icon } from '@iconify/react';
import s from './ProductAvailabilityAndPrice.module.scss';

export const ProductAvailabilityAndPrice = () => {
  const {
    watch,
    control,
    setValue,
    clearErrors,
    formState: { errors }
  } = useFormContext();

  const productStatus = watch('status');
  const hasError = errors.status;

  return (
    <>
      <div className={s.availability}>
        <p className='product-add_subtitle'>
          Наявність товару<span>*</span>
        </p>
        <p className='product-add_hint'>Виберіть наявність товару iз списку</p>
        <Controller
          name='status'
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <div className={s.availability_statuses}>
              <div className={s.availability_wrap}>
                <label className={s.status}>
                  <input
                    {...field}
                    type='radio'
                    id='available'
                    className={s.status_input}
                    value='available'
                    onChange={() => {
                      setValue('status', 'available');
                      setValue('deadline', null);
                      clearErrors('status');
                    }}
                  />
                  В наявності
                </label>

                {productStatus === 'available' && (
                  <label htmlFor='uniqueItem' className={s.unique}>
                    <input
                      {...field}
                      type='checkbox'
                      id='uniqueItem'
                      className='checkbox-input'
                      onChange={(e) => {
                        setValue('uniqueItem', e.target.checked);
                      }}
                    />
                    <p className={s.unique_text}>В єдиному екземплярі</p>
                    <Icon icon='solar:question-circle-outline' />
                  </label>
                )}
              </div>

              <div className={s.availability_wrap}>
                <label className={s.status}>
                  <input
                    {...field}
                    type='radio'
                    id='toOrder'
                    className={s.status_input}
                    value='toOrder'
                    onChange={() => {
                      setValue('status', 'toOrder');
                      setValue('uniqueItem', false);
                      clearErrors('status');
                    }}
                  />
                  Під замовлення
                </label>
                {productStatus === 'toOrder' && (
                  <div className={s.deadline}>
                    <p className={s.deadline_subtitle}>
                      Вкажіть термін виконання<span>*</span>
                    </p>
                    <QuantityInput
                      field={field}
                      type='text'
                      id='deadline'
                      unit='дні'
                      placeholder='Наприклад: 3-4'
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setValue('deadline', e.target.value);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        />
        {hasError && (
          <p className='error-text'>
            Будь ласка, оберіть статус товару.
          </p>
        )}
      </div>

      <div className={s.price}>
        <p className='product-add_subtitle'>
          Ціна<span>*</span>
        </p>
        <Controller
          name='price'
          control={control}
          rules={{ required: true }}
          defaultValue={null}
          render={({ field }) => (
            <QuantityInput
              field={field}
              type='text'
              id='price'
              unit='грн'
              placeholder='Введіть вартість'
              errorMessage='Будь ласка, введіть вартість товару.'
            />
          )}
        />
      </div>
    </>
  );
};
