import Footer from "@common/components/layout/Footer";
import Header from "@common/components/layout/Header";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import type React from "react";

import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Majer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class">
          <div className="min-h-screen grid grid-rows-layout">
            <Header />
            <div className="small-container md:mt-10 p-8 surface-cont-low md:rounded-xl">
              <main>{children}</main>
            </div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
