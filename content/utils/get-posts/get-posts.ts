import fs from "node:fs";
import path from "node:path";

import { format } from "date-fns";
import { getLocale, getMarkdownMetadata } from "intlayer";

interface GetPostsListProps {
  start?: number;
  end?: number;
}

function formatDate(date: string) {
  const newDate = new Date(date);
  return format(newDate, "MMMM do, yyyy");
}

function getPostsFolder(locale: string) {
  return path.join(process.cwd(), "content", locale, "posts");
}

function getPostFromFile(fileName: string, locale: string) {
  const filePath = getPostsFolder(locale) + `/${fileName}`;
  const content = fs.readFileSync(filePath, "utf-8");

  const metadata: PostMeta = getMarkdownMetadata(content);
  // Strip the frontmatter block from the post body
  const body = content.replace(/^---\s*[\s\S]*?---\s*/, "").trim();
  const date = metadata.updated ?? metadata.created;
  const sortDate = new Date(date).getTime();

  return {
    ...metadata,
    body,
    slug: fileName.replace(/\.content\.mdx$/, ""),
    sortDate,
    date: formatDate(date),
    publishedAt: metadata.created,
    created: formatDate(metadata.created),
    ...(metadata.updated
      ? { updated: formatDate(metadata.updated), modifiedAt: metadata.updated }
      : undefined),
  };
}

export async function getPostsList(range?: GetPostsListProps) {
  const locale = await getLocale();
  const postsDir = getPostsFolder(locale);
  const files = fs.readdirSync(postsDir).filter((file) => file.endsWith(".mdx"));

  const posts = files.map((file) => getPostFromFile(file, locale));

  const sortedByMostRecent = posts.toSorted((a, b) => b.sortDate - a.sortDate);

  const postsInRange = range
    ? sortedByMostRecent.slice(range.start, range.end)
    : sortedByMostRecent;

  return postsInRange;
}

export async function getPostBySlug(slug: string) {
  const locale = await getLocale();
  const fileName = `${slug}.content.mdx`;
  const filePath = getPostsFolder(locale) + `/${fileName}`;

  if (!fs.existsSync(filePath)) {
    return null;
  }

  return getPostFromFile(fileName, locale);
}
