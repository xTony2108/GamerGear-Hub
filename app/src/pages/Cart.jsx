import { useDispatch } from "react-redux";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { Navbar } from "../components/layout/Navbar";
import { PageHeading } from "../components/layout/PageHeading";
import { PageLocation } from "../components/layout/PageLocation";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProductQuantity } from "../components/buttons/ProductQuantity";
import { Buttons } from "../components/buttons/Buttons";
import {
  addToCart,
  removeFromCart,
  removeQnt,
  showMaxQnt,
} from "../features/cart/cartSlice";
import { FormInput } from "../components/auth/FormInput";
import { getPrice } from "../components/products/functions/getPrice";
import { useGetTotalPrice } from "../components/products/hooks/useGetTotalPrice";
import { useGetCartItems } from "../components/products/hooks/useGetCartItems";
import { useEffect, useState } from "react";
import { useAxios } from "../hooks/useAxios";
import { toast } from "react-toastify";
import { notifyError, notifySuccess } from "../utility/toastifyNotification";

export const Cart = () => {
  const cartItems = useGetCartItems();

  const [discountCode, setDiscountCode] = useState("");
  const [discountResponse, setDiscountResponse] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  const { data, update, error } = useAxios("api/discounts", 
    {
      method: "POST", 
      headers: { "Content-Type": "application/json" },
      data: {discountCode}
    });
  

  const dispatch = useDispatch();

  const removeQuantity = (product) => {
    dispatch(removeQnt({ id: product.id }));
  };

  const showQuantity = (e, product) => {
    dispatch(showMaxQnt({ id: product.id, cartQnt: Number(e.target.value) }));
  };

  const addQuantity = (product) => {
    dispatch(
      addToCart({ id: product.id, cartQnt: 1, qnt: Number(product.qnt) })
    );
  };

  const handleDiscountSubmit = async () => {
    toast.dismiss();
    await update();
  }

  const handleRemoveDiscount = async () => {
    toast.dismiss();
    notifySuccess("Codice sconto rimosso");
    setDiscountResponse(null);
    setDiscountCode("");
  }

  useEffect(() => {      
      if (data) {        
        notifySuccess(data?.message);
        setDiscountResponse(data);
      } else {
        notifyError(error?.response?.data?.message);
      }

  }, [data, error]);

  useEffect(() => {      
    setTotalPrice(useGetTotalPrice(cartItems, discountResponse))

  }, [cartItems, discountResponse]);

  return (
    <>
      <Header />
      <Navbar />
      <div className="bg-white dark:bg-black min-h-fullWithoutBars">
        <div className="min-h-fullWithoutBars max-w-screen-2xl m-auto flex flex-col items-center py-20 px-6">
          <PageHeading page={"Carrello"} />
          <PageLocation pages={["Carrello"]} />
          {cartItems && cartItems.length > 0 ? (
            <div className="w-full border border-border rounded-lg bg-lightBg dark:bg-grayBg">
              {cartItems.map((product) => {
                return (
                  <div className="flex flex-col p-4" key={product._id}>
                    <div className="flex items-center gap-8 py-4">
                      <img
                        src={product.frontImage}
                        alt={product.name}
                        className="max-w-56 aspect-square object-contain"
                      />
                      <Link
                        to={`/products/${product.name}`}
                        className="text-primary font-semibold text-lg"
                      >
                        {product.name}
                      </Link>
                    </div>
                    <div className="p-4 text-end text-light dark:text-dark flex items-center justify-between">
                      <div className="flex items-center gap-12">
                        <ProductQuantity
                          add={() => addQuantity(product)}
                          remove={() => removeQuantity(product)}
                          quantity={product.cartQnt}
                          show={(e) => showQuantity(e, product)}
                        />
                        <button
                          className="flex items-center gap-3 hover:text-primary"
                          onClick={() =>
                            dispatch(removeFromCart({ id: product.id }))
                          }
                        >
                          <FontAwesomeIcon icon="fa-solid fa-trash-can" />
                          Rimuovi
                        </button>
                      </div>
                      <span className="text-primary font-semibold text-xl">
                        {getPrice(product)} €
                      </span>
                    </div>
                  </div>
                );
              })}
              
              <div className="flex justify-end py-8 pr-8 border-t border-border">
                <span className="text-light dark:text-dark text-lg font-semibold pr-2">
                  Totale:
                </span>
                
                <span className="font-semibold text-xl text-primary">
                  {totalPrice} €
                </span>
              </div>
              <div className="flex justify-end py-8 pr-4 gap-8">
                <div className="flex items-center gap-4">
                  {
                    discountResponse && 
                    <>
                      <span className="text-light dark:text-dark text-lg font-semibold pr-2">
                        Codice sconto:
                      </span>
                      <span className="font-semibold text-xl text-discount mr-4">
                        - {discountResponse.discount}%
                      </span>
                      <Buttons type="button" text="Rimuovi codice" onClick={handleRemoveDiscount} />
                    </>
                  }
                  {!discountResponse &&
                  <>
                  <FormInput
                    type="text"
                    name="discount"
                    placeholder="Codice sconto"
                    autoComplete="discount"
                    addClass="text-sm w-56"
                    value={discountCode}
                    handlerFunc={(e) => setDiscountCode(e.target.value)}
                  />
                  <Buttons type="button" text="Applica codice" onClick={handleDiscountSubmit} />
                  </>
                  }
                </div>
                
                <Buttons
                  type="button"
                  text="Procedi all'acquisto"
                  orange={true}
                />
              </div>
            </div>
          ) : (
            <div className="min-h-fullWithoutBars w-full border border-border rounded-lg flex justify-center items-center p-20">
              <span className="text-light dark:text-dark text-2xl font-bold">
                Nessun articolo nel carrello
              </span>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
