import { useEffect, useState } from "react";
import { FormInput } from "./FormInput";
import { useNavigate } from "react-router-dom";
import { FormButton } from "../buttons/FormButton";
import { toast } from "react-toastify";
import { useAxios } from "../../hooks/useAxios";
import { notifyError, notifySuccess } from "../../utility/toastifyNotification";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth/authSlice";
import loginImage from "../../assets/images/login-register/login.jpg";
import { emptyApiSlice } from "../../services/emptyApiSlice";

export const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  //chiamata login

  const {
    data: loginData,
    error: loginError,
    loading: loginLoading,
    update: loginUpdate,
  } = useAxios("/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: loginForm,
  });

  const handleLoginInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    setLoginForm((prevState) => {
      return { ...prevState, [name]: type === "checkbox" ? checked : value };
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();
    await loginUpdate();
  };

  //gestione login che, una volta avvenuto, renderizza l'utente alla pagina dei prodotti

  useEffect(() => {
    if (!loginLoading) {
      if (loginData) {
        const { id, token } = loginData.user;
        dispatch(login({ id, token }));

        dispatch(emptyApiSlice.util.invalidateTags(["User"]));

        setTimeout(() => {
          notifySuccess(loginData?.message);
        }, 1);
      } else {
        notifyError(loginError?.response?.data?.message);
      }
    }
  }, [loginError, loginData, loginLoading]);

  return (
    <>
      <div className="flex flex-col bg-white dark:bg-black rounded-xl border border-border max-w-screen-2xl m-auto w-full p-16">
        <div className="flex gap-6">
          <div className="flex-1 basis-4/6">
            <img src={loginImage} alt="" className="rounded-lg" />
          </div>
          <div className="flex flex-col justify-between flex-1 basis-2/6">
            <form>
              <div className="flex flex-col items-center gap-12">
                <span className="text-light dark:text-dark text-4xl font-bold w-full block font-prosto text-center">
                  Bentornato
                </span>
                <FormInput
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={loginForm.email}
                  handlerFunc={handleLoginInputChange}
                  autoComplete="email"
                  addClass="w-full"
                />
                <FormInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={loginForm.password}
                  handlerFunc={handleLoginInputChange}
                  autoComplete="new-password"
                  addClass="w-full"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                />
                <FormInput
                  type="checkbox"
                  name="remember"
                  checked={loginForm.remember}
                  handlerFunc={handleLoginInputChange}
                  text="Resta connesso"
                />
                <FormButton
                  text="Login"
                  isButton={true}
                  marginTop="4"
                  handler={handleLoginSubmit}
                />
              </div>
            </form>
            <span className="text-light dark:text-dark text-center block">
              Non sei registrato?
            </span>
            <FormButton text="Registrati" isButton={false} path="/register" />
          </div>
        </div>
      </div>
    </>
  );
};
