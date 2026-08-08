import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getIntlayer } from "next-intlayer";
import { MarkdownRenderer } from "next-intlayer/markdown";

import { PostMarkdown } from "@/components/post-markdown/post-markdown";
import { getPostBySlug, getPostsList } from "@/content/utils/get-posts/get-posts";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      images: [
        {
          url: `/blog/${slug}/opengraph-image`,
          width: 1200,
          height: 630,
          type: "image/png",
          alt: post.title,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const posts = await getPostsList();

  return posts.map(({ slug }) => ({ slug }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const content = getIntlayer("post-page");
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="space-y-18">
      <header className="text-hero-foreground light:font-bold space-y-6 font-semibold">
        <h1 className="text-5xl">
          <MarkdownRenderer>{post.title}</MarkdownRenderer>
        </h1>

        <div className="text-md flex flex-wrap gap-2">
          <dl className="flex gap-x-1">
            <dt className="text-stone-600 dark:text-stone-500">{content.published}</dt>
            <dd>
              <time dateTime={post.created}>{post.created}</time>.
            </dd>
          </dl>

          {post.updated && (
            <dl className="flex gap-x-1">
              <dt className="text-stone-600 dark:text-stone-500">{content.updated}</dt>
              <dd>
                <time dateTime={post.updated}>{post.updated}</time>.
              </dd>
            </dl>
          )}
        </div>
      </header>

      <div className="typeset">
        <PostMarkdown>{post.body}</PostMarkdown>
      </div>
    </article>
  );
}
