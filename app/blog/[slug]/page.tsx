import { notFound } from "next/navigation";
import { MarkdownRenderer } from "next-intlayer/markdown";

import { getPostBySlug, getPostsList } from "@/content/utils/get-posts/get-posts";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await getPostsList();

  return posts.map(({ slug }) => ({ slug }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="space-y-18">
      <header>
        <h1 className="text-hero-foreground light:font-bold text-5xl font-semibold">
          <MarkdownRenderer>{post.title}</MarkdownRenderer>
        </h1>
      </header>

      <div className="typeset space-y-8">
        <time className="text-sm font-medium" dateTime={post.date}>
          {post.date}
        </time>
        <MarkdownRenderer>{post.body}</MarkdownRenderer>
      </div>
    </article>
  );
}
