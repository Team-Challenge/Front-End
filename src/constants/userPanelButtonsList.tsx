import { Icon } from '@iconify/react';

export const userPanelButtonsList = [
  {
    id: 1,
    title: 'Особисті дані',
    pathToPage: 'profile',
    icon: <Icon icon='solar:user-circle-outline' />,
  },
  {
    id: 2,
    title: 'Мої покупки',
    pathToPage: 'purchases',
    icon: <Icon icon='solar:bag-5-outline' />,
  },
  {
    id: 3,
    title: 'Обрані товари',
    pathToPage: 'wishlist',
    icon: <Icon icon='solar:heart-outline' />,
  },
  {
    id: 4,
    title: 'Повідомлення',
    pathToPage: 'messages',
    icon: <Icon icon='solar:letter-linear' />,
  },
  {
    id: 5,
    title: 'Мій магазин',
    pathToPage: 'store',
    icon: <Icon icon='solar:shop-2-outline' />,
  },
  {
    id: 6,
    title: 'Налаштування',
    pathToPage: 'settings',
    icon: <Icon icon='solar:settings-outline' />,
  },
];
