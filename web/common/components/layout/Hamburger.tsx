"use client";

import { useState } from "react";
import { linksToDisplay } from "@common/static";
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

	const burger = (
		<div className="relative flex overflow-hidden items-center justify-center rounded-lg w-8 h-8">
			<div className="flex flex-col justify-between w-5 h-5 overflow-hidden">
				<div className=" dark:bg-white bg-primary-10 h-[2px] w-5 origin-left"></div>
				<div className="dark:bg-white bg-primary-10 h-[2px] w-5 rounded"></div>
				<div className="dark:bg-white bg-primary-10 h-[2px] w-5 origin-left"></div>
			</div>
		</div>
	);

	return (
		<>
			<button className="w-8 h-8 relative group" onClick={openModal}>
				{burger}
			</button>
			<input
				className="hidden"
				type="checkbox"
				name="displayDropdown"
				id="hamburger-checkbox"
			/>
			{open && (
				<div className="fixed z-50 inset-0 md:hidden">
					<div className="absolute inset-0 bg-black/20 backdrop-blur-sm">
						<div className="fixed w-full top-4 right-4 bg-neutral-99 dark:bg-neutral-10 rounded-lg max-w-xs shadow-lg p-6 pt-8">
							<button onClick={closeModal} className="absolute top-4 right-4">
								<svg
									className="w-6 h-6 text-neutral-500"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M6 18L18 6M6 6l12 12"
									></path>
								</svg>
							</button>
							<ul className="space-y-6">{links}</ul>
							<div className="pt-4 mt-4 border-t border-neutral-10 dark:border-neutral-99 flex items-center gap-2">
								<span className="block pt-[2px]">Switch theme</span>
								<ThemeSwitch></ThemeSwitch>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
