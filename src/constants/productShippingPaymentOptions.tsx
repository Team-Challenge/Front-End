import { Icon } from '@iconify/react';
import novaPostLogo from '@assets/nova-post-logo.svg';
import ukrPostLogo from '@assets/ukr-post-logo.svg';

export const paymentMethods = [
  {
    id: 'cardPayment',
    icon: <Icon icon='solar:card-outline' />,
    title: 'Оплата на карту',
    desc: 'Оплата вартості товару на карту',
  },
  {
    id: 'cashPayment',
    icon: <Icon icon='solar:wallet-outline' />,
    title: 'Оплата при отриманні (Накладений платіж)',
    desc: 'Комісія за тарифами перевізника (Нова Пошта від 40 грн)',
  },
  {
    id: 'securePayment',
    icon: <Icon icon='solar:shield-check-outline' />,
    title: 'Безпечна оплата',
    desc: 'Ви отримає кошти після того як покупець отримає та перевірить товар',
  },
];

export const deliveryMethods = [
  {
    id: 'novaPost',
    icon: novaPostLogo,
    title: 'Нова пошта',
    desc: 'від 50 грн',
  },
  {
    id: 'ukrPost',
    icon: ukrPostLogo,
    title: 'Укрпошта',
    desc: 'Акція! 30 грн (до 15 кг), 70 грн (понад 15 кг)',
  },
];
