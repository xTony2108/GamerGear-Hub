import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useState } from "react";

export const FormInput = ({
  type,
  name,
  placeholder,
  value,
  handlerFunc,
  autoComplete,
  text,
  pattern,
  title,
  maxLength,
  addClass,
  checked,
}) => {
  const [showPw, setShowPw] = useState(false);

  const handleShowPw = () => {
    setShowPw(!showPw);
  };

  return (
    <>
      {type !== "checkbox" && type !== "password" && (
        <input
          className={clsx(
            "bg-transparent flex items-center border-b border-border pb-4 focus-within:border-primary outline-none text-light dark:text-dark placeholder:text-light placeholder:dark:text-dark",
            addClass && addClass
          )}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handlerFunc}
          autoComplete={autoComplete}
          pattern={pattern}
          title={title}
          maxLength={maxLength}
          required
        />
      )}
      {type === "checkbox" && (
        <label
          htmlFor={name}
          className="text-light dark:text-dark flex items-center gap-1 select-none"
        >
          <input
            className={clsx(
              "appearance-none w-4 h-4 rounded-full border ",
              checked ? "border-dark bg-primary" : "border-primary bg-dark"
            )}
            type={type}
            id={name}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={handlerFunc}
            autoComplete={autoComplete}
          />
          {text}
        </label>
      )}
      {type === "password" && (
        <div className="w-full bg-transparent flex items-center border-b border-border pb-4 focus-within:border-primary">
          <input
            className={clsx(
              "bg-transparent rounded-md outline-none text-light dark:text-dark placeholder:text-light placeholder:dark:text-dark",
              addClass && addClass
            )}
            type={clsx(!showPw && type, showPw && "text")}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={handlerFunc}
            autoComplete={autoComplete}
            pattern={pattern}
            title={title}
            required
          />
          <button type="button" onClick={handleShowPw}>
            <FontAwesomeIcon
              icon={clsx("fa-solid fa-eye", showPw && "fa-solid fa-eye-slash")}
              size="lg"
              style={{ color: "white", margin: "0px 12px", width: "25px" }}
            />
          </button>
        </div>
      )}
    </>
  );
};
