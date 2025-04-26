// app/layout.tsx
import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning className="h-full" lang="en">
      <head />
      <body
        className={clsx(
          "h-full bg-background font-sans antialiased ",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="flex flex-col h-screen">
            <Navbar />
            <main className="flex-1 min-h-0 flex items-center justify-center px-6">
              {children}
            </main>
            <footer className="h-12 flex items-center justify-center">
              <Link
                isExternal
                className="flex items-center gap-1 text-current"
                href="https://edtech1985.com.br/projetos"
                title="Github de Edson Costa"
              >
                <span className="text-default-600">Developed by</span>
                <p className="text-secondary" color="secondary">
                  {" "}
                  Edson Costa
                </p>
              </Link>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
