import fs from "node:fs";
import path from "node:path";

import { getLocale, getMarkdownMetadata } from "intlayer";

interface GetPostsListProps {
  start?: number;
  end?: number;
}

export async function getPostsList(range?: GetPostsListProps) {
  const locale = await getLocale();

  const postsDir = path.join(process.cwd(), "content", locale);
  const files = fs.readdirSync(postsDir).filter((file) => file.endsWith(".mdx"));

  const posts = files.map((file) => {
    const filePath = path.join(postsDir, file);
    const content = fs.readFileSync(filePath, "utf-8");

    const metadata: PostMeta = getMarkdownMetadata(content);

    return {
      ...metadata,
      description: `<p>${metadata.description}</p>`,
      date: metadata.updated ?? metadata.created,
      slug: file.replace(/\.content.mdx$/, ""),
    };
  });

  const sortedByMostRecent = posts.sort((a, b) => {
    const dateA = new Date(a.updated ?? a.created);
    const dateB = new Date(b.updated ?? b.created);

    return dateB.getTime() - dateA.getTime();
  });

  const postsInRange = range
    ? sortedByMostRecent.slice(range.start, range.end)
    : sortedByMostRecent;

  return postsInRange;
}
