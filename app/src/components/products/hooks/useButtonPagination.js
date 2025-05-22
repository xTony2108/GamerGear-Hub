import { useMemo } from "react";

export const useButtonPagination = (page, setPage, totalPages, ref) => {
  const scrollRef = ref;
  const buttonsPerPage = 10;

  let startIndex =
    page <= 0 || page <= buttonsPerPage
      ? 0
      : Math.floor((page - 1) / buttonsPerPage) * buttonsPerPage;

  const totalButtons = useMemo(
    () =>
      Array.from({ length: totalPages }, (_, index) => index).splice(
        startIndex,
        buttonsPerPage
      ),
    [totalPages, startIndex]
  );

  const handlePrevPage = (amount) => {
    setPage((prevState) => (prevState - amount <= 1 ? 1 : prevState - amount));
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleNextPage = (amount) => {
    setPage((prevState) =>
      prevState + amount >= totalPages ? totalPages : prevState + amount
    );
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handlePageNumber = (pageNumber) => {
    setPage(pageNumber + 1);
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return { totalButtons, handleNextPage, handlePrevPage, handlePageNumber };
};
