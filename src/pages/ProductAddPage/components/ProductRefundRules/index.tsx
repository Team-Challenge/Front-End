import { Controller, useFormContext } from 'react-hook-form';
import { productAddTips } from '@/constants/productAddTips';
import { refundsRulesList } from '@/constants/refundsRulesList';
import { ToggleSwitch, Tooltip } from '@/components/UI';
import { Icon } from '@iconify/react';
import s from './ProductRefundRules.module.scss';

export const ProductRefundRules = () => {
  const { control } = useFormContext();

  return (
    <div>
      <div className='product-add_subtitle_wrap'>
        <p className='product-add_subtitle'>Повернення та обмін</p>
        <Tooltip
          text={productAddTips.refunds}
          isBase={false}
          className={`product-add_tooltip ${s.refunds_tooltip}`}
        >
          <Icon icon='heroicons:light-bulb' />
        </Tooltip>
      </div>

      <div className={s.refunds}>
        <Icon icon='solar:undo-left-round-outline' />
        <p className={s.refunds_subtitle}>Умови повернення та обміну</p>
        <ul className={s.refunds_list}>
          {refundsRulesList.map(({ id, item }) => (
            <li key={id} className={s.refunds_item}>
              {item}
            </li>
          ))}
        </ul>
        <div className={s.refunds_accept}>
          <p>Прийняти умови</p>
          <Controller
            name='refunds'
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <ToggleSwitch
                field={field}
                id='refunds'
                onChange={(e) => field.onChange(e?.target.checked)}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};
