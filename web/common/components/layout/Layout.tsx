import { ReactElement, ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Head from "next/head";
import { ThemeProvider } from "next-themes";

// This way, Per-page layouts are achieved
export function Layout({ children }: { children: ReactElement }) {
	return (
		<>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
				/>
			</Head>
			<ThemeProvider attribute="class">{children}</ThemeProvider>
		</>
	);
}

export function BasicLayout({ children }: { children: ReactElement }) {
	return (
		<Layout>
			<div className="min-h-screen grid grid-rows-layout">
				<Header></Header>
				<div className="small-container mt-10 px-4">
					<main>{children}</main>
				</div>
				<Footer></Footer>
			</div>
		</Layout>
	);
}

export function BlogPostLayout({ children }: { children: ReactNode }) {
	return (
		<Layout>
			<div className="min-h-screen grid grid-rows-layout">
				<Header></Header>
				{children}
				<Footer></Footer>
			</div>
		</Layout>
	);
}
