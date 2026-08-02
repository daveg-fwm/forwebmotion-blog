import { MarkdownRenderer } from "next-intlayer/markdown";

import { Link } from "@/components/_base/link/link";

interface PostSummaryProps {
  title: string;
  description: string;
  date: string;
  slug: string;
}

export function PostSummary({ title, description, date, slug }: PostSummaryProps) {
  return (
    <article>
      <Link href={`/blog/${slug}`} className="text-xl">
        <MarkdownRenderer>{title}</MarkdownRenderer>
      </Link>
      <MarkdownRenderer>{description}</MarkdownRenderer>
      <time className="mt-8 block text-sm font-medium" dateTime={date}>
        {date}
      </time>
    </article>
  );
}
