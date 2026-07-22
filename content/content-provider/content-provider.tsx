"use client";

import { MarkdownProvider } from "next-intlayer/markdown";

interface ContentProviderProps {
  children: React.ReactNode;
}

export function ContentProvider({ children }: ContentProviderProps) {
  return (
    <MarkdownProvider
      components={{
        h1: (props) => <h1 className="text-2xl" {...props} />,
      }}
    >
      {children}
    </MarkdownProvider>
  );
}
