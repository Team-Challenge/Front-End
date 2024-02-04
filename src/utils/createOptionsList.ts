import { MultiDataMapping } from '@/types';

export const createOptionsList = (
  fieldName: string,
  materialList: MultiDataMapping[],
) => {
  return materialList
    .flatMap((material) => material[fieldName] || [])
    .map((item) => ({ value: item, label: item }));
};
