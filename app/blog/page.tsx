import { getIntlayer } from "intlayer";
import type { Metadata } from "next";

import { PostSummary } from "@/components/post-summary/post-summary";
import { getPostsList } from "@/content/utils/get-posts/get-posts";
import {
  OG_IMAGE_HEIGHT,
  OG_IMAGE_TYPE,
  OG_IMAGE_WIDTH,
} from "@/utils/opengraph-image/opengraph-image";

export default async function BlogPage() {
  const content = getIntlayer("blog-page");
  const posts = await getPostsList();

  return (
    <div className="space-y-18">
      <h1 className="text-hero-foreground light:font-bold text-5xl font-semibold">
        {content.heading}
      </h1>

      <div className="typeset space-y-15">
        {posts.map(({ slug, title, description, date }) => (
          <PostSummary key={slug} slug={slug} title={title} description={description} date={date} />
        ))}
      </div>
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const content = getIntlayer("blog-page");

  return {
    title: content.heading,
    description: content.description,
    openGraph: {
      siteName: "Forwebmotion",
      url: "/blog",
      title: content.heading,
      description: content.description,
      type: "website",
      images: [
        {
          url: `/blog/opengraph-image`,
          width: OG_IMAGE_WIDTH,
          height: OG_IMAGE_HEIGHT,
          type: OG_IMAGE_TYPE,
          alt: content.description,
        },
      ],
    },
  };
}
