interface MaterialItem {
  [key: string]: string[];
};

export const createOptionsList = (fieldName: string, materialList: MaterialItem[]) => {
  return materialList
   .flatMap((material) => material[fieldName] || [])
   .map((item) => ({ value: item, label: item }));
}