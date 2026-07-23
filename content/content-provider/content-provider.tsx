"use client";

import { MarkdownProvider } from "next-intlayer/markdown";

interface ContentProviderProps {
  children: React.ReactNode;
}

const components = {};

export function ContentProvider({ children }: ContentProviderProps) {
  return <MarkdownProvider components={components}>{children}</MarkdownProvider>;
}
