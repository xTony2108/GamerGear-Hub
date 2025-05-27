import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SearchBar } from "./SearchBar";
import { Link } from "react-router-dom";
import { useGetUserDataQuery } from "../../services/product/userSlice";
import { internalMemory } from "../../utility/internalMemory";
import { useGetTotalPrice } from "../products/hooks/useGetTotalPrice";
import { useGetCartItems } from "../products/hooks/useGetCartItems";
import { useSelector } from "react-redux";

export const Header = () => {
  const token = internalMemory.get("token");

  const cart = useSelector((state) => state.cart.cart);

  const cartItems = useGetCartItems();

  const { data: userInfo } = useGetUserDataQuery(undefined, {
    skip: !token,
  });

  return (
    <>
      <header className="bg-white dark:bg-black relative">
        <div className="flex items-center justify-between max-w-screen-2xl m-auto py-6 relative gap-8 px-12 z-50">
          <div className="flex items-center gap-10 flex-grow relative">
            <div className="min-w-fit">
              <p className="text-2xl text-light dark:text-dark w-full font-bold">
                GamerGear Hub
              </p>
            </div>
            <SearchBar />
          </div>
          <div className="flex items-center gap-10">
            <Link
              to="/login"
              className="flex items-center bg-transparent rounded-full border border-border"
            >
              <div className="bg-primary py-3.5 px-5 rounded-l-full">
                <FontAwesomeIcon
                  icon="fa-regular fa-user"
                  className="text-light dark:text-dark"
                />
              </div>
              <div className="h-full text-light dark:text-dark px-6">
                <span>{userInfo ? userInfo.name : "Profilo"}</span>
              </div>
            </Link>
            <div className="flex items-center bg-transparent rounded-full border border-border">
              <Link to="/cart" className="flex items-center">
                <div className="py-3.5 px-5 rounded-l-full">
                  <FontAwesomeIcon
                    icon="fa-solid fa-cart-shopping"
                    style={{ color: "#fa4f09" }}
                  />
                </div>
                <div className="h-full text-light dark:text-dark pr-5">
                  <span>{useGetTotalPrice(cartItems)}€</span>
                </div>
              </Link>
              <div className="bg-primary py-3.5 px-5 rounded-r-full text-light dark:text-dark">
                {cart && cart.reduce((acc, val) => acc + val.cartQnt, 0)}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
