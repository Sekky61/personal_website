"use client";
import { CheckmarkIcon } from "@common/svg/CopyIcon";
import { useState } from "react";

export const CopyButton = ({ code }: { code: string }) => {
  const [showCheck, setShowCheck] = useState(false);
  const copyClicked = () => {
    navigator.clipboard.writeText(code);
    setShowCheck(true);
  };
  const mouseLeave = () => {
    setShowCheck(false);
  };

  return (
    <button
      type="button"
      className={`w-12 flex justify-center items-center secondary m-2 p-0.5 duration-100 rounded ${
        showCheck ? "hover:bg-green-400" : "hover:bg-primary-30"
      }`}
      onClick={copyClicked}
      onMouseLeave={mouseLeave}
    >
      {showCheck ? <CheckmarkIcon /> : "Copy"}
    </button>
  );
};
