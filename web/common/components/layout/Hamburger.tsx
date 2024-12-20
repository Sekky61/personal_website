"use client";

import { linksToDisplay } from "@common/static";
import { useState } from "react";
import { ThemeSwitch } from "../ThemeSwitch";

export const Hamburger = () => {
  // State for opening menu
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const links = linksToDisplay.map((link) => {
    return (
      <li key={link.href} className="font-bold">
        <a href={link.href}>{link.label}</a>
      </li>
    );
  });

  return (
    <>
      <button
        type="button"
        className="w-[48px] h-[48px] p-[12px] relative group"
        onClick={openModal}
      >
        <span className="material-symbols-outlined">menu</span>
      </button>
      <input
        className="hidden"
        type="checkbox"
        name="displayDropdown"
        id="hamburger-checkbox"
      />
      {open && (
        <div className="fixed z-50 inset-0 md:hidden">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-xs">
            <div className="fixed w-full top-4 right-4 bg-neutral-99 dark:bg-neutral-10 rounded-lg max-w-xs shadow-lg p-6 pt-8">
              <button
                type="button"
                onClick={closeModal}
                className="absolute top-4 right-4"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
              <ul className="space-y-6">{links}</ul>
              <div className="pt-4 mt-4 border-t border-neutral-10 dark:border-neutral-99 flex items-center gap-2">
                <span className="block pt-[2px]">Switch theme</span>
                <ThemeSwitch />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
