import { RefObject, useEffect, useRef, KeyboardEvent } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { DEADLINE_REGEX, INTEGER_REGEX } from '@/constants/RegExp';
import { Tooltip, QuantityInput } from '@/components/UI';
import { Icon } from '@iconify/react';
import s from './ProductAvailabilityAndPrice.module.scss';

export const ProductAvailabilityAndPrice = () => {
  const inputAvailableRef = useRef<HTMLInputElement>(null);
  const inputToOrderRef = useRef<HTMLInputElement>(null);

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
    if (productStatus === 'В наявності') {
      setValue('deadline', null);
      clearErrors('status');
    }

    if (productStatus === 'Під замовлення') {
      setValue('uniqueItem', false);
      clearErrors('status');
    }
  }, [productStatus]);

  const handleEnterKeyPress = (
    ref: RefObject<HTMLInputElement>,
    e: KeyboardEvent<HTMLLabelElement>,
  ) => {
    if (e.key === 'Enter') {
      ref.current?.click();
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.currentTarget.checked = !event.currentTarget.checked;
    }
  };

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
                <label
                  tabIndex={0}
                  className={s.status}
                  onKeyDown={(e) => handleEnterKeyPress(inputAvailableRef, e)}
                >
                  <input
                    {...field}
                    type='radio'
                    id='available'
                    className={s.status_input}
                    value='В наявності'
                    ref={inputAvailableRef}
                  />
                  В наявності
                </label>
              )}
            />

            {productStatus === 'В наявності' && (
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
                        onKeyDown={handleKeyDown}
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
                <label
                  tabIndex={0}
                  className={s.status}
                  onKeyDown={(e) => handleEnterKeyPress(inputToOrderRef, e)}
                >
                  <input
                    {...field}
                    type='radio'
                    id='toOrder'
                    className={s.status_input}
                    value='Під замовлення'
                    ref={inputToOrderRef}
                  />
                  Під замовлення
                </label>
              )}
            />

            {productStatus === 'Під замовлення' && (
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
            Будь ласка, вкажіть приблизну дату виготовлення товару у форматі 4-5
            робочих днів
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
              maxLength={6}
              placeholder='Введіть вартість'
              errorMessage='Будь ласка, введіть ціле число, що відповідає вартості товару'
            />
          )}
        />
      </div>
    </>
  );
};
