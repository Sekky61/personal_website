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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto_flex.className} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class">
          <div className="min-h-screen grid grid-rows-layout">
            <Header />
            <div className="small-container relative md:mt-10 p-8 surface-cont-low md:rounded-xl">
              <main>{children}</main>
            </div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
