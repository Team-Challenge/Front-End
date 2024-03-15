import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import { EmptyContentPage } from '@/components/UI';
import { purchaseStatusList } from '@/constants/statusesList';
import { emptySectionText } from '@/constants/emptySectionText';
import s from './Purchases.module.scss';

export const Purchases = () => {
  const { width } = useWindowDimensions();
  const [activeButtonId, setActiveButtonId] = useState<number>(1);

  const handleButtonClick = (buttonId: number) => {
    setActiveButtonId(buttonId);
  };

  return (
    <section className={s.order}>
      <EmptyContentPage
        title='Ой, тут поки пусто'
        text={emptySectionText.productsUserPanel}
        item={<Icon icon='solar:bag-smile-outline' />}
      />
      {/*
      {width >= 991.98 && <h4 className={s.order_title}>Мої покупки</h4>}
      <div className={s.order_buttons}>
        {purchaseStatusList.map((status) => (
          <button
            key={status.id}
            className={status.id === activeButtonId ? s.active : ''}
            onClick={() => handleButtonClick(status.id)}
          >
            {status.label}
          </button>
        ))}
      </div> */}
    </section>
  );
};
