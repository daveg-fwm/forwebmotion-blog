import { MarkdownRenderer } from "next-intlayer/markdown";

import { getPostsList } from "@/content/utils/get-posts-list/get-posts-list";

export default async function Homepage() {
  const latestPosts = await getPostsList();

  return (
    <div className="typeset space-y-4">
      {Object.values(latestPosts).map(({ key, title, description, date }) => (
        <div key={key}>
          <MarkdownRenderer>{title}</MarkdownRenderer>
          <MarkdownRenderer>{description}</MarkdownRenderer>
          <time dateTime={date}>{date}</time>
        </div>
      ))}
    </div>
  );
}
