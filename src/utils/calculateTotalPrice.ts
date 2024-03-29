interface Product {
  [key: string]: string | number;
}

export const calculateTotalPrice = (products: Product[]): number => {
  const totalAmount: number = products
    .map(({ quantity, price }) => +quantity * +price)
    .reduce((acc, curr) => acc + curr, 0);

  return totalAmount;
};
