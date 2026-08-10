import "@/styles/globals.css";

import { getHTMLTextDir } from "intlayer";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { generateStaticParams as generateIntlayerStaticParams } from "next-intlayer";
import { getLocale } from "next-intlayer/server";

import { Footer } from "@/components/_layout/footer/footer";
import { Header } from "@/components/_layout/header/header";
import { ThemeProvider } from "@/components/_layout/theme/theme-provider";
import { SITE_NAME, SITE_URL } from "@/constants/constants";
import { cn } from "@/utils/_base/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: {
      template: `%s | ${SITE_NAME}`,
      default: SITE_NAME,
    },
    metadataBase: new URL(SITE_URL),
  };
};

/**
 * Combine generateStaticParams from Intlayer with "force-static"
 * to ensure that pages are pre-built.
 */
export const generateStaticParams = generateIntlayerStaticParams;
export const dynamic = "force-static";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  /**
   * Reason for "suppressHydrationWarning":
   * next/themes can only assign a class and inline style client-side
   */
  return (
    <html
      lang={locale}
      dir={getHTMLTextDir(locale)}
      className={cn(
        "h-full",
        "antialiased",
        "scrollbar-thin scrollbar-thumb-stone-400 scrollbar-track-stone-600",
        "font-sans",
        inter.variable,
      )}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main
            className="mx-auto w-full max-w-196 px-4 pt-18 pb-26 xl:py-39 2xl:max-w-206"
            id="main-content"
            role="main"
          >
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
