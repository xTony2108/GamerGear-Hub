export const getDiscount = (product) => {
  const price = product.offers.isActive
    ? (product.price * (1 - product.offers.discountPercentage / 100)).toFixed(2)
    : product.price;

  return price;
};
