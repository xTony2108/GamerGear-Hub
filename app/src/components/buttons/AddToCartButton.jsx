import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAddToCart } from "../products/hooks/useAddToCart";

export const AddToCartButton = ({ product }) => {
  const { handleAddToCart } = useAddToCart();

  return (
    <button
      className="text-light dark:text-dark font-semibold py-6 relative z-20 w-full"
      onClick={() => handleAddToCart(product)}
    >
      <FontAwesomeIcon
        icon="fa-solid fa-cart-shopping"
        className="text-primary mr-2 addToCartIconLight dark:addToCartIcon"
      />
      Aggiungi al carrello
    </button>
  );
};
