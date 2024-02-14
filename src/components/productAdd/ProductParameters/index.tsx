import { Fragment, useState } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { PARAMETERS_REGEX } from '@/constants/RegExp';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import { QuantityInput } from '@/components/UI/QuantityInput';
import { SelectInput } from '@/components/UI/SelectInput';
import { ringSizeList } from '@/constants/ringsSizeList';
import { RingsSizeChart } from '../RingsSizeChart';
import { Icon } from '@iconify/react';
import s from './ProductParameters.module.scss';

export const ProductParameters = () => {
  const { width } = useWindowDimensions();
  const [isOpenRingsChart, setIsOpenRingsChart] = useState<boolean>(false);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const { control, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'parameters',
  });

  if (fields.length === 0) {
    append({ length: null, width: null, weight: null, size: null });
  }

  const addParametersField = () => {
    append({ length: null, width: null, weight: null, size: null });
  };

  const selectedSubcategory = watch('subcategory');

  const ringSizeOptions = ringSizeList.map(({ size }) => ({
    value: size,
    label: size,
  }));

  const handleOpenRingSizeChart = (itemId: string) => {
    if (activeItemId === itemId) {
      setIsOpenRingsChart(false);
      setActiveItemId(null);
    } else {
      setIsOpenRingsChart(true);
      setActiveItemId(itemId);
    }
  };

  return (
    <div className={s.parameters}>
      <p className='product-add_subtitle'>Параметри виробу</p>
      <div className={s.parameters_wrap}>
        {fields.map((item, index) => (
          <Fragment key={item.id}>
            <div className={s.parameters_row}>
              <div className={s.parameters_inputs}>
                {selectedSubcategory === 'Каблучки' ? (
                  <Controller
                    name={`parameters[${index}].size`}
                    control={control}
                    rules={{
                      required: false,
                    }}
                    render={({ field }) => (
                      <>
                        <div className={s.parameters_rings}>
                          <div className={s.parameters_rings_header}>
                            <p>Розмір колечка</p>
                            {width <= 800 && (
                              <button
                                type='button'
                                className={`${s.parameters_rings_button} ${
                                  isOpenRingsChart && activeItemId === item.id
                                    ? s.open
                                    : s.close
                                }`}
                                onClick={() => handleOpenRingSizeChart(item.id)}
                              >
                                Розмірна таблиця
                                <Icon icon='solar:alt-arrow-up-bold' />
                              </button>
                            )}
                          </div>
                          <SelectInput
                            field={field}
                            options={ringSizeOptions}
                            placeholder='Оберіть розмір'
                          />
                          {width >= 801 && (
                            <button
                              type='button'
                              className={`${s.parameters_rings_button} ${
                                isOpenRingsChart && activeItemId === item.id
                                  ? s.open
                                  : s.close
                              }`}
                              onClick={() => handleOpenRingSizeChart(item.id)}
                            >
                              Розмірна таблиця
                              <Icon icon='solar:alt-arrow-up-bold' />
                            </button>
                          )}
                        </div>
                        {isOpenRingsChart &&
                          activeItemId === item.id &&
                          width <= 800 && <RingsSizeChart />}
                      </>
                    )}
                  />
                ) : (
                  <Controller
                    name={`parameters[${index}].length`}
                    control={control}
                    rules={{
                      required: false,
                      pattern: {
                        value: PARAMETERS_REGEX,
                        message: 'Введіть довжину товару',
                      },
                    }}
                    defaultValue={null}
                    render={({ field, fieldState }) => (
                      <QuantityInput
                        field={field}
                        fieldState={fieldState}
                        type='text'
                        id='length'
                        unit='см'
                        placeholder='Введіть довжину'
                        label='Довжина'
                        errorMessage='Введіть довжину товару'
                      />
                    )}
                  />
                )}
                <Controller
                  name={`parameters[${index}].width`}
                  control={control}
                  rules={{
                    required: false,
                    pattern: {
                      value: PARAMETERS_REGEX,
                      message: 'Введіть ширину товару',
                    },
                  }}
                  defaultValue={null}
                  render={({ field, fieldState }) => (
                    <QuantityInput
                      field={field}
                      fieldState={fieldState}
                      type='text'
                      id='width'
                      unit='см'
                      placeholder='Введіть ширину'
                      label='Ширина'
                      errorMessage='Введіть ширину товару'
                    />
                  )}
                />
                <Controller
                  name={`parameters[${index}].weight`}
                  control={control}
                  rules={{
                    required: false,
                    pattern: {
                      value: PARAMETERS_REGEX,
                      message: 'Введіть вагу товару',
                    },
                  }}
                  defaultValue={null}
                  render={({ field, fieldState }) => (
                    <QuantityInput
                      field={field}
                      fieldState={fieldState}
                      type='text'
                      id='weight'
                      unit='грам'
                      placeholder='Введіть вагу'
                      label='Вага виробу'
                      errorMessage='Введіть вагу товару'
                    />
                  )}
                />
              </div>

              <div className={s.parameters_buttons}>
                <button
                  type='button'
                  onClick={addParametersField}
                  className={s.button_add}
                >
                  <Icon icon='iconamoon:sign-plus' />
                  Додати розмір
                </button>

                {index > 0 && (
                  <button
                    type='button'
                    onClick={() => remove(index)}
                    className={s.button_remove}
                  >
                    <Icon icon='solar:trash-bin-minimalistic-outline' />
                  </button>
                )}
              </div>
            </div>
            {isOpenRingsChart && activeItemId === item.id && width >= 801 && (
              <RingsSizeChart />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};
