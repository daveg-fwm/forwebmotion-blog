import { IconArrowNarrowRight } from "@tabler/icons-react";
import { getIntlayer } from "next-intlayer";

import { Badge } from "@/components/_base/badge/badge";
import { Link } from "@/components/_base/link/link";
import { HomeHero } from "@/components/home-hero/home-hero";
import { PostSummary } from "@/components/post-summary/post-summary";
import { getPostsList } from "@/content/utils/get-posts-list/get-posts-list";

export default async function Homepage() {
  const content = getIntlayer("homepage");
  const latestPosts = await getPostsList();

  return (
    <>
      <HomeHero />

      <section className="relative">
        <Badge className="max-xl:mb-10 xl:absolute xl:-top-1.5 xl:-left-12.5 xl:-translate-x-full">
          {content.postsBadge}
        </Badge>

        <div className="typeset space-y-15">
          {Object.values(latestPosts).map(({ slug, title, description, date }) => (
            <PostSummary
              key={slug}
              slug={slug}
              title={title}
              description={description}
              date={date}
            />
          ))}
        </div>

        <Link className="mt-20" href="/posts" variant="icon">
          {content.postsLink}
          <IconArrowNarrowRight />
        </Link>
      </section>
    </>
  );
}
