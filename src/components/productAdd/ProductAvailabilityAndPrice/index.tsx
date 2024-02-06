import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { DEADLINE_REGEX, INTEGER_REGEX } from '@/constants/RegExp';
import { Tooltip, QuantityInput } from '@/components/UI';
import { Icon } from '@iconify/react';
import s from './ProductAvailabilityAndPrice.module.scss';

export const ProductAvailabilityAndPrice = () => {
  const {
    watch,
    control,
    setValue,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const productStatus = watch('status');
  const hasStatusError = errors.status;
  const hasDeadlineError = errors.deadline;

  useEffect(() => {
    if (productStatus === 'available') {
      setValue('deadline', null);
      clearErrors('status');
    }

    if (productStatus === 'toOrder') {
      setValue('uniqueItem', false);
      clearErrors('status');
    }
  }, [productStatus]);

  return (
    <>
      <div className={s.availability}>
        <p className='product-add_subtitle'>
          Наявність товару<span>*</span>
        </p>
        <p className='product-add_hint'>Виберіть наявність товару iз списку</p>
        <div className={s.availability_statuses}>
          <div className={s.availability_wrap}>
            <Controller
              name='status'
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <label className={s.status}>
                  <input
                    {...field}
                    type='radio'
                    id='available'
                    className={s.status_input}
                    value='available'
                  />
                  В наявності
                </label>
              )}
            />

            {productStatus === 'available' && (
              <Controller
                name='uniqueItem'
                control={control}
                rules={{
                  required: false,
                }}
                render={({ field }) => (
                  <div className={s.unique}>
                    <label htmlFor='uniqueItem' className={s.unique_label}>
                      <input
                        {...field}
                        type='checkbox'
                        id='uniqueItem'
                        className='checkbox-input'
                      />
                      <p className={s.unique_text}>В єдиному екземплярі</p>
                    </label>
                    <Tooltip
                      isBase
                      text='Вказаний товар є лише в єдиному екземплярі'
                      className={s.unique_tooltip}
                    >
                      <Icon icon='solar:question-circle-outline' />
                    </Tooltip>
                  </div>
                )}
              />
            )}
          </div>

          <div className={s.availability_wrap}>
            <Controller
              name='status'
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <label className={s.status}>
                  <input
                    {...field}
                    type='radio'
                    id='toOrder'
                    className={s.status_input}
                    value='toOrder'
                  />
                  Під замовлення
                </label>
              )}
            />

            {productStatus === 'toOrder' && (
              <Controller
                name='deadline'
                control={control}
                rules={{
                  required: true,
                  pattern: DEADLINE_REGEX,
                }}
                render={({ field }) => (
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
                    />
                  </div>
                )}
              />
            )}
          </div>
        </div>

        {hasStatusError && (
          <p className='error-text'>Будь ласка, оберіть статус товару</p>
        )}

        {hasDeadlineError && (
          <p className='error-text'>
            Будь ласка, вкажіть приблизну дату виготовлення товару
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
          rules={{ required: true, pattern: INTEGER_REGEX }}
          defaultValue={null}
          render={({ field }) => (
            <QuantityInput
              field={field}
              type='text'
              id='price'
              unit='грн'
              placeholder='Введіть вартість'
              errorMessage='Будь ласка, введіть ціле число, що відповідає вартості товару'
            />
          )}
        />
      </div>
    </>
  );
};
