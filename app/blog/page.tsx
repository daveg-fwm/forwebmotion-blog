import { PostSummary } from "@/components/post-summary/post-summary";
import { getPostsList } from "@/content/utils/get-posts/get-posts";

export default async function BlogPage() {
  const posts = await getPostsList();

  return (
    <article className="space-y-18">
      <h1 className="text-hero-foreground light:font-bold text-5xl font-semibold">Blog</h1>

      <div className="typeset space-y-15">
        {posts.map(({ slug, title, description, date }) => (
          <PostSummary key={slug} slug={slug} title={title} description={description} date={date} />
        ))}
      </div>
    </article>
  );
}
