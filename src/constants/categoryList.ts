import head from '@/assets/category-icons/head.svg';
import ears from '@/assets/category-icons/ears.svg';
import neck from '@/assets/category-icons/neck.svg';
import hands from '@/assets/category-icons/hands.svg';
import accessories from '@/assets/category-icons/accessories.svg';
import sets from '@/assets/category-icons/sets.svg';

export const categoryList = [
  {
    id: 1,
    label: 'На голову',
    icon: head,
    subcategories: ['Заколки', 'Обручі', 'Резинки', 'Хустинки'],
  },
  {
    id: 2,
    label: 'На вуха',
    icon: ears,
    subcategories: ['Сережки', 'Моносережки'],
  },
  {
    id: 3,
    label: 'На шию',
    icon: neck,
    subcategories: [
      'Зґарди',
      'Шелести',
      'Ґердани',
      'Силянки',
      'Кризи',
      'Чокери',
      'Намиста',
      'Дукачі',
      'Кулони та підвіски',
    ],
  },
  {
    id: 4,
    label: 'На руки',
    icon: hands,
    subcategories: ['Браслети', 'Каблучки'],
  },
  {
    id: 5,
    label: 'Аксесуари',
    icon: accessories,
    subcategories: ['Котильйони', 'Брошки', 'Сумки'],
  },
  {
    id: 6,
    label: 'Набори',
    icon: sets,
  },
];
