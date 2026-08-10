import { getIntlayer } from "intlayer";
import type { Metadata } from "next";

import { Badge } from "@/components/_base/badge/badge";
import { Link } from "@/components/_base/link/link";
import { JsonLd } from "@/components/json-ld/json-ld";
import { PostSummary } from "@/components/post-summary/post-summary";
import { OG_IMAGE_HEIGHT, OG_IMAGE_TYPE, OG_IMAGE_WIDTH, SITE_NAME } from "@/constants/constants";
import { getPostsList } from "@/content/utils/get-posts/get-posts";
import { getHomepageJsonLd } from "@/utils/json-ld/json-ld";

export async function generateMetadata(): Promise<Metadata> {
  const content = getIntlayer("homepage");

  return {
    description: content.heading,
    openGraph: {
      siteName: SITE_NAME,
      url: "/",
      description: content.heading,
      type: "website",
      images: [
        {
          url: `/opengraph-image`,
          width: OG_IMAGE_WIDTH,
          height: OG_IMAGE_HEIGHT,
          type: OG_IMAGE_TYPE,
          alt: content.heading,
        },
      ],
    },
  };
}

export default async function Homepage() {
  const content = getIntlayer("homepage");
  const latestPosts = await getPostsList({ end: 4 });

  return (
    <>
      <JsonLd
        data={getHomepageJsonLd({
          description: content.heading,
          posts: latestPosts,
        })}
      />

      <div className="text-hero-foreground mb-18 space-y-7">
        <h1 className="sr-only">{content.heading}</h1>
        <p className="light:font-bold text-5xl font-semibold">{content.name}</p>
        <p className="light:font-medium text-xl leading-normal text-balance">
          {content.description}
        </p>
      </div>

      <section className="relative">
        <Badge
          render={
            <h2 className="max-xl:mb-10 xl:absolute xl:-top-1.5 xl:-left-12.5 xl:-translate-x-full" />
          }
        >
          {content.postsBadge}
        </Badge>

        <div className="typeset space-y-15">
          {Object.values(latestPosts).map(
            ({ slug, title, description, publishedAt, modifiedAt }) => (
              <PostSummary
                key={slug}
                slug={slug}
                title={title}
                description={description}
                date={modifiedAt ?? publishedAt}
              />
            ),
          )}
        </div>

        <Link className="mt-20" href="/blog" variant="icon">
          {content.blogLink}
        </Link>
      </section>
    </>
  );
}
