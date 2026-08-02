import { getIntlayer } from "next-intlayer";

import { Badge } from "@/components/_base/badge/badge";
import { Link } from "@/components/_base/link/link";
import { PostSummary } from "@/components/post-summary/post-summary";
import { getPostsList } from "@/content/utils/get-posts/get-posts";

export default async function Homepage() {
  const content = getIntlayer("homepage");
  const latestPosts = await getPostsList({ end: 4 });

  return (
    <>
      <div className="text-hero-foreground mb-18 space-y-7">
        <h1 className="sr-only">{content.heading}</h1>
        <p className="light:font-bold text-5xl font-semibold">{content.name}</p>
        <p className="light:font-medium text-xl leading-normal text-balance">
          {content.description}
        </p>
      </div>

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

        <Link className="mt-20" href="/blog" variant="icon">
          {content.blogLink}
        </Link>
      </section>
    </>
  );
}
