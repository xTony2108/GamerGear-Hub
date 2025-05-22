import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export const PageLocation = ({ pages }) => {
  return (
    <div className="flex justify-center my-8 font-semibold">
      <Link
        to="/"
        className="text-light dark:text-dark hover:text-primary dark:hover:text-primary transition-all"
      >
        <FontAwesomeIcon
          icon="fa-solid fa-home"
          style={{ marginRight: "8px" }}
        />
        Home
      </Link>
      {pages.length <= 1 ? (
        <span className="text-light dark:text-dark flex items-center">
          <FontAwesomeIcon
            icon="fa-solid fa-caret-right"
            style={{ margin: "0 8px" }}
          />
          {pages[0]}
        </span>
      ) : (
        pages.map((page, i) =>
          i === 0 ? (
            <div className="flex items-center" key={page + i}>
              <FontAwesomeIcon
                icon="fa-solid fa-caret-right"
                style={{ margin: "0 8px", color: "white" }}
              />
              <Link
                to=".."
                className="text-light dark:text-dark hover:text-primary dark:hover:text-primary transition-all"
              >
                {page}
              </Link>
            </div>
          ) : (
            <span
              key={page + i}
              className="text-light dark:text-dark flex items-center"
            >
              <FontAwesomeIcon
                icon="fa-solid fa-caret-right"
                style={{ margin: "0 8px" }}
              />
              {page}
            </span>
          )
        )
      )}
    </div>
  );
};
