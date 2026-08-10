import { formatISO, parseISO } from "date-fns";
import type { Blog, BlogPosting, Graph, Person, WithContext } from "schema-dts";

import { SITE_NAME, SITE_URL } from "@/constants/constants";

interface PostJsonLdData {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  modifiedAt?: string;
}

const author: Person = {
  "@type": "Person",
  name: "Dave Green",
  url: SITE_URL,
  sameAs: ["https://github.com/daveg-fwm/", "https://www.linkedin.com/in/daveg-fwm/"],
};

function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).href;
}

function toIsoDateTime(date: string) {
  return formatISO(parseISO(date));
}

function toBlogPosting(post: PostJsonLdData): BlogPosting {
  return {
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: toIsoDateTime(post.publishedAt),
    ...(post.modifiedAt ? { dateModified: toIsoDateTime(post.modifiedAt) } : undefined),
    url: absoluteUrl(`/blog/${post.slug}`),
  };
}

export function getHomepageJsonLd({
  description,
  posts,
}: {
  description: string;
  posts: PostJsonLdData[];
}): Graph {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
        description,
        author,
      },
      {
        "@type": "ItemList",
        itemListElement: posts.map((post, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: absoluteUrl(`/blog/${post.slug}`),
        })),
      },
    ],
  };
}

export function getBlogJsonLd({
  name,
  description,
  posts,
}: {
  name: string;
  description: string;
  posts: PostJsonLdData[];
}): WithContext<Blog> {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name,
    description,
    url: absoluteUrl("/blog"),
    author,
    blogPost: posts.map(toBlogPosting),
  };
}

export function getBlogPostJsonLd(post: PostJsonLdData): WithContext<BlogPosting> {
  const url = absoluteUrl(`/blog/${post.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: toIsoDateTime(post.publishedAt),
    ...(post.modifiedAt ? { dateModified: toIsoDateTime(post.modifiedAt) } : undefined),
    url,
    mainEntityOfPage: url,
    author,
    image: absoluteUrl(`/blog/${post.slug}/opengraph-image`),
    isPartOf: {
      "@type": "Blog",
      name: "Blog",
      url: absoluteUrl("/blog"),
    },
  };
}
