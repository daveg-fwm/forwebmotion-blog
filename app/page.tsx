import { Badge } from "@/components/_base/badge/badge";
import { HomeHero } from "@/components/home-hero/home-hero";
import { PostSummary } from "@/components/post-summary/post-summary";
import { getPostsList } from "@/content/utils/get-posts-list/get-posts-list";

export default async function Homepage() {
  const latestPosts = await getPostsList();

  return (
    <>
      <HomeHero />

      <section className="relative">
        <Badge className="absolute -top-1.5 -left-12.5 -translate-x-full">POSTS</Badge>

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
      </section>
    </>
  );
}
