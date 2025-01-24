import Footer from "@common/components/layout/Footer";
import Header from "@common/components/layout/Header";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import type React from "react";

import "../styles/globals.css";
import { roboto_flex, sedgwick_ave } from "./fonts";
import { ToolMenu } from "@common/components/ToolMenu";

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

const used_icons = ["check", "close", "contrast", "dark_mode", "content_copy", "light_mode", "menu", "settings"];

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
    <html lang="en" className={`${roboto_flex.variable} ${sedgwick_ave.variable}`} suppressHydrationWarning>
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
          <ToolMenu className="hidden md:block fixed bottom-0 right-0 m-4" />
        </ThemeProvider>
      </body>
    </html>
  );
}
