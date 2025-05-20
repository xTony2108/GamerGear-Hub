import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../features/cart/cartSlice";
import { notifyError, notifySuccess } from "../../../utility/toastifyNotification";
import { toast } from "react-toastify";

export const useAddToCart = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.cart);

    const handleAddToCart = (product) => {
        toast.dismiss();
        
        const price = product.offers.isActive
            ? (product.price * (1 - product.offers.discountPercentage / 100)).toFixed(2)
            : product.price;

        const isAvailable = product.qnt > 0;

        const findProduct = cart.find(item => item.id === product._id);
        
        if (isAvailable && (!findProduct || (findProduct.cartQnt < findProduct.qnt))) {

            dispatch(
                addToCart({
                    img: product.frontImage,
                    name: product.name,
                    id: product._id,
                    price,
                    qnt: product.qnt,
                    cartQnt: product.cartQnt ? product.cartQnt : 1
                })
            );
            notifySuccess("Prodotto aggiunto al carrello");
        } else if(!isAvailable) {
            notifyError("Il prodotto selezionato non è disponibile");
        }
        else {
            notifyError("Hai raggiunto la quantità massima per questo prodotto");
        }
    };

    return { handleAddToCart };
};
