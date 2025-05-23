import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export const ShareLinks = () => {
  return (
    <div className="flex items-center gap-4 border-b border-border mb-4 pb-6 font-prosto w-2/3">
      <span className="text-light dark:text-dark text-lg leading-none">
        Condividi:
      </span>
      <Link
        to="../"
        className="text-primary dark:hover:text-white hover:text-black transition-all leading-none text-base ml-2"
      >
        <FontAwesomeIcon icon="fa-brands fa-facebook-f" />
      </Link>
      <Link
        to="../"
        className="text-primary dark:hover:text-white hover:text-black transition-all leading-none text-base ml-2"
      >
        <FontAwesomeIcon icon="fa-brands fa-x-twitter" />
      </Link>
      <Link
        to="../"
        className="text-primary dark:hover:text-white hover:text-black transition-all leading-none text-base ml-2"
      >
        <FontAwesomeIcon icon="fa-brands fa-instagram" />
      </Link>
      <Link
        to="../"
        className="text-primary dark:hover:text-white hover:text-black transition-all leading-none text-base ml-2"
      >
        <FontAwesomeIcon icon="fa-brands fa-linkedin-in" />
      </Link>
      <Link
        to="../"
        className="text-primary dark:hover:text-white hover:text-black transition-all leading-none text-base ml-2"
      >
        <FontAwesomeIcon icon="fa-brands fa-pinterest-p" />
      </Link>
    </div>
  );
};
