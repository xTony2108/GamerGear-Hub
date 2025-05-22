import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../features/cart/cartSlice";
import {
  notifyError,
  notifySuccess,
} from "../../../utility/toastifyNotification";
import { toast } from "react-toastify";

export const useAddToCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const handleAddToCart = (product) => {
    toast.dismiss();

    const isAvailable = product.qnt > 0;

    const findProduct = cart.find((item) => item.id === product._id);

    if (
      isAvailable &&
      (!findProduct || findProduct.cartQnt < findProduct.qnt)
    ) {
      dispatch(
        addToCart({
          id: product._id,
          cartQnt: product.cartQnt ? product.cartQnt : 1,
          qnt: Number(product.qnt),
        })
      );
      notifySuccess("Prodotto aggiunto al carrello");
    } else if (!isAvailable) {
      notifyError("Il prodotto selezionato non è disponibile");
    } else {
      notifyError("Hai raggiunto la quantità massima per questo prodotto");
    }
  };

  return { handleAddToCart };
};
