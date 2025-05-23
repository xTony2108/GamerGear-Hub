import clsx from "clsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "animate.css";
import { internalMemory } from "../../utility/internalMemory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Navbar = () => {
  const [theme, setTheme] = useState(null);
  const [isSticky, setIsSticky] = useState(false);

  const memoryTheme = internalMemory.get("theme");

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsSticky(scrollTop > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const switchTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    internalMemory.save("theme", newTheme);
    setTheme(newTheme);
  };
  useEffect(() => {
    if (
      memoryTheme === "dark" ||
      (!memoryTheme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.body.classList.add("dark");
      setTheme("dark");
    } else {
      document.body.classList.remove("dark");
      setTheme("light");
    }

    const handleStorageChange = (event) => {
      if (event.key === "theme") {
        const updatedTheme = JSON.parse(event.newValue);

        if (updatedTheme == "dark") {
          document.body.classList.add("dark");
          setTheme("dark");
        } else {
          document.body.classList.remove("dark");
          setTheme("light");
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [theme]);

  return (
    <>
      <nav
        className={clsx(
          "bg-grayBg z-30 w-full overflow-hidden animate__animated sticky dark:border-b dark:border-dark",
          isSticky && "animate__fadeInDown -top-1"
        )}
      >
        <div className="relative flex items-center justify-between max-w-screen-2xl m-auto py-6 gap-8 px-12">
          <div className="flex items-center gap-10">
            <Link to="/" className="text-white font-semibold text-sm">
              Home
            </Link>
            <Link to="/products" className="text-white font-semibold text-sm">
              Prodotti
            </Link>
          </div>
          <label className="relative w-14 h-6 bg-white dark:bg-black inline-block rounded-full z-10 cursor-pointer select-none">
            <input
              type="checkbox"
              className="peer w-0 invisible"
              onChange={switchTheme}
              checked={theme === "light"}
            />
            <span
              className={clsx(
                "absolute rounded-[50%] z-20 w-5 h-5 peer-checked:left-[calc(100%-22px)] transition-all duration-200 left-[2px] top-[2px] bottom-[2px] right-[2px]",
                theme == "light" && "left-[calc(100%-22px)"
              )}
            >
              {theme == "dark" ? (
                <FontAwesomeIcon
                  icon="fa-regular fa-moon"
                  className="text-black z-20 w-5 h-5 dark:text-white"
                />
              ) : (
                <FontAwesomeIcon
                  icon="fa-regular fa-sun"
                  className="text-black z-20 w-5 h-5 dark:text-white"
                />
              )}
            </span>
          </label>
        </div>
      </nav>
    </>
  );
};
