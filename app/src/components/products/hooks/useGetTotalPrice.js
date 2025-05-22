import { getPrice } from "../functions/getPrice";

export const useGetTotalPrice = (products) => {
  const total =
    products &&
    products.reduce((acc, p) => acc + Number(getPrice(p)), 0).toFixed(2);

  return total;
};
