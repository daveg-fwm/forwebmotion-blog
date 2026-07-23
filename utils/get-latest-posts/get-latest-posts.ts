import fs from "node:fs";
import path from "node:path";

import { getMarkdownMetadata } from "intlayer";

export function getLatestPosts() {
  const postsDir = path.join(process.cwd(), "content");
  const files = fs.readdirSync(postsDir).filter((file) => file.endsWith(".mdx"));

  const posts = files.map((file) => {
    const filePath = path.join(postsDir, file);
    const content = fs.readFileSync(filePath, "utf-8");
    const metadata = getMarkdownMetadata(content);

    return metadata;
  });

  return posts;
}
