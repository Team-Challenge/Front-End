import { Icon } from '@iconify/react';

export const storePanelButtonsList = [
  {
    id: 1,
    title: 'Мої товари',
    pathToPage: 'products',
    icon: <Icon icon='solar:layers-minimalistic-outline' />,
  },
  {
    id: 2,
    title: 'Налаштування магазину',
    pathToPage: 'settings',
    icon: <Icon icon='solar:tuning-2-outline' />,
  },
  {
    id: 3,
    title: 'Замовлення',
    pathToPage: 'orders',
    icon: <Icon icon='solar:box-outline' />,
  },
  {
    id: 4,
    title: 'Повідомлення',
    pathToPage: 'messages',
    icon: <Icon icon='solar:letter-linear' />,
  },
  {
    id: 5,
    title: 'Відгуки та рейтинг',
    pathToPage: 'reviews',
    icon: <Icon icon='solar:chat-round-outline' />,
  }
];
