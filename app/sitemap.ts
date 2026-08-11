import type { MetadataRoute } from "next";

import { getPostsList } from "@/content/utils/get-posts/get-posts";
import { absoluteUrl } from "@/utils/absolute-url/absolute-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPostsList();

  const latestPostDate = posts[0]
    ? new Date(posts[0].modifiedAt ?? posts[0].publishedAt)
    : undefined;

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: latestPostDate,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/blog"),
      lastModified: latestPostDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.modifiedAt ?? post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...postPages];
}
