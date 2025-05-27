import { useDispatch } from "react-redux";
import { internalMemory } from "../utility/internalMemory";
import { useEffect, useRef } from "react";
import { useGetUserDataQuery } from "../services/product/userSlice";
import { Flip, toast } from "react-toastify";
import { logout } from "../features/auth/authSlice";

export const useSessionGuard = () => {
  const dispatch = useDispatch();
  const sessionHandled = useRef(false);

  const token = internalMemory.get("token");

  const { error } = useGetUserDataQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (!sessionHandled.current && error && error.status === 401) {
      sessionHandled.current = true;
      dispatch(logout());
      toast.error("Sessione scaduta, effettua il login", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Flip,
      });
    }
    if (!error) {
      sessionHandled.current = false;
    }
  }, [error, dispatch]);
};
