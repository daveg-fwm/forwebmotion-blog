import "@/styles/globals.css";

import { getHTMLTextDir } from "intlayer";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { generateStaticParams as generateIntlayerStaticParams } from "next-intlayer";
import { getLocale } from "next-intlayer/server";

import { ContentProvider } from "@/content/content-provider/content-provider";
import { cn } from "@/utils/_base/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

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

  return (
    <html
      lang={locale}
      dir={getHTMLTextDir(locale)}
      className={cn("h-full", "antialiased", "font-sans", inter.variable)}
    >
      <body className="flex min-h-full flex-col">
        <ContentProvider>{children}</ContentProvider>
      </body>
    </html>
  );
}
