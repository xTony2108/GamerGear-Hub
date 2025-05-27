import { getPrice } from "../functions/getPrice";

export const useGetTotalPrice = (products, data) => {
  const total =
    products &&
    products.reduce((acc, p) => acc + Number(getPrice(p)), 0).toFixed(2);

  if (data?.discount) {
    console.log(total * data.discount / 100);

    const totalDiscountCode = total - (total * (data.discount / 100));

    return totalDiscountCode.toFixed(2);
  }

  return total;
};
