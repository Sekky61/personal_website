import { MDXProvider } from "@mdx-js/react";
import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { useState } from "react";
import { cn } from "#/lib/utils";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { mdxComponents } from "../components/post/blockRendering";
import ThemeProvider from "../components/ThemeProvider";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";
import { APP_DATA } from "../lib/metadata/app-data";
import appCss from "../styles.css?url";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: APP_DATA.appName,
      },
      {
        name: "description",
        content: APP_DATA.appDescription,
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFoundPage,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="background body-large [overflow-wrap:anywhere]">
        <ThemeProvider>
          <div className="min-h-screen grid grid-rows-layout">
            <Header />
            <div className="small-container relative px-4 py-8 md:mt-10 md:px-8">
              <MDXProvider components={mdxComponents}>
                <main>{children}</main>
              </MDXProvider>
            </div>
            <Footer />
          </div>
        </ThemeProvider>
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}

function NotFoundPage() {
  const [isNotWordVisible, setIsNotWordVisible] = useState(true);
  return (
    <section className="p-8">
      <h1 className="display-medium mb-4">
        <span>Page</span>{" "}
        <button
          type="button"
          className={cn(
            "hover:underline",
            !isNotWordVisible && "translate-y-16 opacity-0",
          )}
          style={{
            transition:
              "translate 250ms cubic-bezier(0, 0, 0.2, 1), opacity 250ms cubic-bezier(0, 0, 0.2, 1)",
          }}
          onClick={() => setIsNotWordVisible(false)}
        >
          not
        </button>{" "}
        <span>found</span>
      </h1>
      <p className="mb-0">
        Nothing here{isNotWordVisible ? "" : "... Wait, can you do that?"}
      </p>
    </section>
  );
}
