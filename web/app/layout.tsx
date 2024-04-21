import Footer from "@common/components/layout/Footer";
import Header from "@common/components/layout/Header";
import { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import React from "react";

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
            <Header></Header>
            <div className="small-container mt-10 px-4">
              <main>{children}</main>
            </div>
            <Footer></Footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
