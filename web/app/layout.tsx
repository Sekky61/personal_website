import Footer from "@common/components/layout/Footer";
import Header from "@common/components/layout/Header";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Roboto_Flex } from "next/font/google";
import type React from "react";

import "../styles/globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Majer",
    default: "Majer",
  },
  authors: [{ name: "Michal Majer" }],
  keywords: ['"Michal Majer"', "blog", "programming", "web development"],
  description:
    "Personal blog of Michal Majer, focused on programming and web development.",
  creator: "Michal Majer",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Majer",
    title: "Majer's blog",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
};

const roboto_flex = Roboto_Flex({
  subsets: ["latin-ext"],
  display: "swap",
  axes: ["slnt", "wdth"],
  variable: "--font-roboto-flex",
});

const used_icons = ["close", "dark_mode", "light_mode", "menu"];

const googleSymbolsParams = () => {
  used_icons.sort();
  return `family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=${used_icons.join(",")}`;
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto_flex.className} suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href={`https://fonts.googleapis.com/css2?${googleSymbolsParams()}`}
        />
      </head>
      <body className="background body-large">
        <ThemeProvider attribute="class">
          <div className="min-h-screen grid grid-rows-layout">
            <Header />
            <div className="small-container relative md:mt-10 p-8">
              <main>{children}</main>
            </div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
