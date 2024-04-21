import { ThemeProvider } from "next-themes";
import type { ReactElement, ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

// This way, Per-page layouts are achieved
export function Layout({ children }: { children: ReactElement }) {
  return (
    <>
      <ThemeProvider attribute="class">{children}</ThemeProvider>
    </>
  );
}

export function BasicLayout({ children }: { children: ReactElement }) {
  return (
    <Layout>
      <div className="min-h-screen grid grid-rows-layout">
        <Header />
        <div className="small-container mt-10 px-4">
          <main>{children}</main>
        </div>
        <Footer />
      </div>
    </Layout>
  );
}

export function BlogPostLayout({ children }: { children: ReactNode }) {
  return (
    <Layout>
      <div className="min-h-screen grid grid-rows-layout">
        <Header />
        {children}
        <Footer />
      </div>
    </Layout>
  );
}
