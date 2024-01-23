import { useState } from "react";
import { clsx } from "clsx";

export const Faq = ({ question, answer }) => {
  const [show, setShow] = useState(true);

  const handleHideFaq = () => {
    setShow(!show);
  };
  return (
    <>
      <div className="border-b border-green-400 text-white pb-2 text-xl">
        <button
          onClick={handleHideFaq}
          className="flex justify-between w-full text-green-400"
        >
          <p>Q: {question}</p>
          <span>{clsx(show ? "+" : "-")}</span>
        </button>
        <div className={clsx("block py-6", show && "hidden")}>
          <p>A: {answer}</p>
        </div>
      </div>
    </>
  );
};