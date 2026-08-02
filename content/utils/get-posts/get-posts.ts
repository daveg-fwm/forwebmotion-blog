import fs from "node:fs";
import path from "node:path";

import { format } from "date-fns";
import { getLocale, getMarkdownMetadata } from "intlayer";

interface GetPostsListProps {
  start?: number;
  end?: number;
}

function getPostFromFile(fileName: string, locale: string) {
  const filePath = path.join(process.cwd(), "content", locale, fileName);
  const content = fs.readFileSync(filePath, "utf-8");

  const metadata: PostMeta = getMarkdownMetadata(content);
  const date = new Date(metadata.updated ?? metadata.created);
  // Strip the frontmatter block from the post body
  const body = content.replace(/^---\s*[\s\S]*?---\s*/, "").trim();

  return {
    ...metadata,
    body,
    description: `<p>${metadata.description}</p>`,
    date: format(date, "MMMM do, yyyy"),
    slug: fileName.replace(/\.content\.mdx$/, ""),
  };
}

export async function getPostsList(range?: GetPostsListProps) {
  const locale = await getLocale();
  const postsDir = path.join(process.cwd(), "content", locale);
  const files = fs.readdirSync(postsDir).filter((file) => file.endsWith(".mdx"));

  const posts = files.map((file) => getPostFromFile(file, locale));

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

export async function getPostBySlug(slug: string) {
  const locale = await getLocale();
  const fileName = `${slug}.content.mdx`;
  const filePath = path.join(process.cwd(), "content", locale, fileName);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  return getPostFromFile(fileName, locale);
}
