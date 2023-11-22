import {
  Profile,
  Order,
  Messages,
  FavoriteProducts,
  Settings,
  Store,
} from '@/components/userPanel';
import user from '@assets/icons/user.svg';
import message from '@assets/icons/message.svg';
import settings from '@assets/icons/settings.svg';
import favorite from '@assets/icons/favorite.svg';
import order from '@assets/icons/shopping-bag.svg';

export const buttonsUserPanel = [
  {
    id: '1',
    label: 'Профіль',
    content: <Profile />,
    icon: user,
  },
  { id: '2', label: 'Мої покупки', content: <Order />, icon: order },
  { id: '3', label: 'Повідомлення', content: <Messages />, icon: message },
  {
    id: '4',
    label: 'Обрані товари',
    content: <FavoriteProducts />,
    icon: favorite,
  },
  { id: '5', label: 'Мій магазин', content: <Store /> },
  {
    id: '6',
    label: 'Налаштування',
    content: <Settings />,
    icon: settings,
  },
];
