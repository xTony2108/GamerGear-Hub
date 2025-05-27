import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetAllProductsQuery } from "../../services/product/productSlice";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getDiscount } from "../products/functions/getDiscount";
import clsx from "clsx";

export const SearchBar = () => {
  const inputRef = useRef(null);
  const resultsRef = useRef(null);

  const { data: products = [] } = useGetAllProductsQuery();

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
      setIsVisible(!!query);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toUpperCase().includes(debouncedQuery.toUpperCase())
    );
  }, [products, debouncedQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        resultsRef.current &&
        !resultsRef.current.contains(event.target)
      ) {
        setQuery("");
        setDebouncedQuery("");
        setIsVisible(false);
      }
    };

    const handleScroll = () => {
      setQuery("");
      setDebouncedQuery("");
      setIsVisible(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className="flex items-center h-14 rounded-full border border-border w-3/5 relative z-50"
        ref={inputRef}
      >
        <FontAwesomeIcon
          icon="fa-solid fa-magnifying-glass"
          size="lg"
          style={{ padding: "0 16px", color: "#fa4f09" }}
        />
        <input
          type="search"
          aria-label="Cerca prodotti"
          className="h-full appearance-none bg-transparent outline-none text-black dark:text-white w-full pr-4"
          placeholder="Cerca"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          name="search"
        />
      </div>
      <>
        <div
          className={clsx(
            "flex flex-col bg-dark dark:bg-light z-50 absolute top-full border rounded-xl mt-2 py-4 px-6 w-full max-h-96 overflow-y-scroll custom-scroll shadow-sm shadow-black dark:shadow-white transition-all duration-300 ease-out transform",
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2 pointer-events-none"
          )}
          ref={resultsRef}
        >
          {filteredProducts && filteredProducts.length > 0 ? (
            filteredProducts.map((product) => {
              return (
                <Link
                  to={`../products/${encodeURIComponent(
                    product.name.replaceAll(" ", "_")
                  )}`}
                  key={product._id}
                >
                  <div className="flex justify-between items-center gap-6">
                    <div className="max-w-28 mb-6">
                      <img
                        className="aspect-square object-contain"
                        src={product.frontImage}
                        alt={product.name}
                      />
                    </div>
                    <span className="font-semibold text-primary flex-1">
                      {product.name}
                    </span>
                    <span className="font-semibold text-primary">
                      {getDiscount(product)}
                    </span>
                  </div>
                </Link>
              );
            })
          ) : (
            <span className="font-semibold text-primary flex-1 self-center py-12">
              Nessun prodotto trovato
            </span>
          )}
        </div>
      </>
    </>
  );
};
