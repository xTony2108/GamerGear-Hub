import clsx from "clsx";
import { Link } from "react-router-dom";

export const Buttons = ({
  text,
  orange,
  route,
  addClass,
  onClick,
  type = "link",
  icon,
}) => {
  {
    return type === "link" ? (
      orange ? (
        <Link
          to={route}
          className="relative bg-primary p-4 text-dark font-semibold rounded-full w-fit text-sm buttonFillWhite overflow-hidden will-change-transform select-none"
        >
          {text}
        </Link>
      ) : (
        <Link
          to={route}
          className="relative bg-dark p-4 text-primary font-semibold rounded-full w-fit text-sm buttonFillOrange overflow-hidden will-change-transform select-none"
        >
          {text}
        </Link>
      )
    ) : orange ? (
      <button
        className={clsx(
          "relative bg-primary  p-4 text-light dark:text-dark font-semibold rounded-full text-sm buttonFillBlack dark:buttonFillWhite overflow-hidden will-change-transform",
          addClass && addClass
        )}
        onClick={onClick}
      >
        {icon && icon}
        {text}
      </button>
    ) : (
      <button
        className={clsx(
          "relative bg-light dark:bg-dark dark:text-light p-4 text-primary font-semibold rounded-full text-sm buttonFillOrange overflow-hidden will-change-transform",
          addClass && addClass
        )}
        onClick={onClick}
      >
        {icon && icon}
        {text}
      </button>
    );
  }
};
