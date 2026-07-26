import "@/styles/globals.css";

import { getHTMLTextDir } from "intlayer";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { generateStaticParams as generateIntlayerStaticParams } from "next-intlayer";
import { getLocale } from "next-intlayer/server";

import { Header } from "@/components/_layout/header/header";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ContentProvider } from "@/content/content-provider/content-provider";
import { cn } from "@/utils/_base/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const dynamic = "force-static";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: {
      template: "%s | Forwebmotion",
      default: "Forwebmotion",
    },
    // description,
    // keywords,
  };
};

export const generateStaticParams = generateIntlayerStaticParams;

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
        "scrollbar-thin scrollbar-thumb-stone-500 scrollbar-track-stone-800",
        "font-sans",
        inter.variable,
      )}
      suppressHydrationWarning
    >
      <body>
        <ContentProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Header />
            <main
              className="mx-auto w-full max-w-188 py-39 2xl:max-w-198"
              id="main-content"
              role="main"
            >
              {children}
            </main>
          </ThemeProvider>
        </ContentProvider>
      </body>
    </html>
  );
}
