"use client";
import { CheckmarkIcon, CopyIcon } from "@common/svg/CopyIcon";
import { useState } from "react";

export const CopyButton = ({ code }: any) => {
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
      className={`absolute top-0 right-0 m-2 p-0.5 duration-100 bg-white/5 rounded-sm ${
        showCheck ? "hover:bg-green-400" : "hover:bg-primary-40"
      }`}
      onClick={copyClicked}
      onMouseLeave={mouseLeave}
    >
      {showCheck ? <CheckmarkIcon /> : <CopyIcon />}
    </button>
  );
};
