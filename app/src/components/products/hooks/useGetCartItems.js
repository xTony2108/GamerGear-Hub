import { useSelector } from "react-redux";
import { useGetAllProductsQuery } from "../../../services/product/productSlice";
import { useMemo } from "react";

export const useGetCartItems = () => {
  const cart = useSelector((state) => state.cart.cart);

  const { data: products } = useGetAllProductsQuery();

  const cartItems = useMemo(() => {
    if (!products) return [];

    return cart.map((item) => {
      const product = products.find((p) => p._id === item.id);
      return {
        ...item,
        ...product,
      };
    });
  }, [products, cart]);

  return cartItems;
};
