import { compileMarkdown } from "next-intlayer/markdown";

import { PreCodeBlock } from "@/components/_base/pre-code-block/pre-code-block";

interface PostMarkdownProps {
  children: string;
}

export function PostMarkdown({ children }: PostMarkdownProps) {
  return compileMarkdown(children, {
    components: {
      pre: PreCodeBlock,
    },
  });
}
