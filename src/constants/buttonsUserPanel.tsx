import { Icon } from '@iconify/react';
import {
  Profile,
  Order,
  Messages,
  FavoriteProducts,
  Settings,
} from '@/components/userPanel';

export const buttonsUserPanel = [
  {
    id: '1',
    label: 'Профіль',
    content: <Profile />,
    icon: <Icon icon='solar:user-outline' />,
  },
  {
    id: '2',
    label: 'Мої покупки',
    content: <Order />,
    icon: <Icon icon='solar:bag-5-outline' />,
  },
  {
    id: '3',
    label: 'Повідомлення',
    content: <Messages />,
    icon: <Icon icon='solar:letter-linear' />,
  },
  {
    id: '4',
    label: 'Обрані товари',
    content: <FavoriteProducts />,
    icon: <Icon icon='solar:heart-outline' />,
  },
  {
    id: '5',
    label: 'Налаштування',
    content: <Settings />,
    icon: <Icon icon='solar:settings-outline' />,
  },
];
