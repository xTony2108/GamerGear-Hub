import { useEffect, useState } from "react";
import { useAxios } from "../../hooks/useAxios";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { notifyError, notifySuccess } from "../../utility/toastifyNotification";
import { FormInput } from "./FormInput";
import { FormButton } from "../buttons/FormButton";
import { validateInput } from "../../utility/userValidation";
import { isFormCompiled } from "../../utility/formValidation";
import loginImage from "../../assets/images/login-register/login.jpg";

export const RegisterForm = () => {
  const [register, setRegister] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    // country: "",
    // address: "",
    // zipCode: "",
    // phone: "+39 ",
    // civic: "",
  });

  const { data, error, loading, update } = useAxios("/api/users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: register,
  });

  const handleRegisterInputChange = (event) => {
    const { name, value } = event.target;

    //switch per rimuovere caratteri non numerici

    let validatedValue;

    switch (name) {
      case "zipCode":
        validatedValue = value.replace(/[^\d]/g, "");
        break;
      case "civic":
        validatedValue = value.replace(/[^\d]/g, "");
        break;
      default:
        validatedValue = value;
    }

    setRegister((prevState) => {
      return {
        ...prevState,
        [name]: validatedValue,
      };
    });
  };

  const [page, setPage] = useState(1);

  const handleNextPage = () => {
    toast.dismiss();

    if (!isFormCompiled(register, page)) {
      setPage((prevState) => (page < 2 ? (prevState += 1) : prevState));
    } else {
      validateInput(register, page);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();
    await update();
  };

  //gestione registrazione che, una volta avvenuta, renderizza l'utente alla pagina di login

  useEffect(() => {
    if (!loading) {
      if (data) {
        Navigate("/login");
        setTimeout(() => {
          notifySuccess(data?.message);
        }, 1);
      } else {
        notifyError(error?.response?.data?.message);
      }
    }
  }, [error, data, loading]);

  return (
    <div className="flex flex-col bg-lightBg dark:bg-light rounded-xl border border-border max-w-screen-2xl m-auto w-full p-16">
      <div className="flex gap-6">
        <div className="flex-1 basis-4/6">
          <img src={loginImage} alt="" className="rounded-lg" />
        </div>
        <div className="flex flex-col justify-between flex-1 basis-2/6">
          <form>
            <div className="flex flex-col items-center gap-12">
              <span className="text-light dark:text-dark text-4xl font-bold w-full block font-prosto text-center">
                Benvenuto
              </span>
              <FormInput
                type="text"
                name="name"
                placeholder="Nome"
                value={register.name}
                handlerFunc={handleRegisterInputChange}
                autoComplete="name"
                addClass="w-full"
              />
              <FormInput
                type="email"
                name="email"
                placeholder="Email"
                value={register.email}
                handlerFunc={handleRegisterInputChange}
                autoComplete="email"
                addClass="w-full"
              />
              <FormInput
                type="password"
                name="password"
                placeholder="Password"
                value={register.password}
                handlerFunc={handleRegisterInputChange}
                autoComplete="new-password"
                addClass="w-full"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
              />
              <FormInput
                type="password"
                name="confirmPassword"
                placeholder="Conferma password"
                value={register.confirmPassword}
                handlerFunc={handleRegisterInputChange}
                autoComplete="new-password"
                addClass="w-full"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
              />
              <FormButton
                text="Registrati"
                isButton={true}
                handler={handleRegisterSubmit}
              />
            </div>
          </form>
          <span className="text-light dark:text-dark text-center block">
            Sei già registrato?
          </span>
          <FormButton text="Login" isButton={false} path="/login" />
        </div>
      </div>
    </div>
  );
};
