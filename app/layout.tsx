import "@/styles/globals.css";

import { getHTMLTextDir, getIntlayer } from "intlayer";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {
  generateStaticParams as generateIntlayerStaticParams,
  IntlayerClientProvider,
} from "next-intlayer";
import { getLocale } from "next-intlayer/server";

import { ContentProvider } from "@/content/content-provider/content-provider";
import { cn } from "@/utils/_base/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
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
        <IntlayerClientProvider defaultLocale={locale}>
          <ContentProvider>{children}</ContentProvider>
        </IntlayerClientProvider>
      </body>
    </html>
  );
}
