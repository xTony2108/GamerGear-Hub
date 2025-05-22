export const getPrice = (product) => {
  const price = product.offers.isActive
    ? (
        product.price *
        (1 - product.offers.discountPercentage / 100) *
        product.cartQnt
      ).toFixed(2)
    : product.price * product.cartQnt;

  return price;
};
