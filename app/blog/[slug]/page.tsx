import { getIntlayer } from "intlayer";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarkdownRenderer } from "next-intlayer/markdown";

import { JsonLd } from "@/components/json-ld/json-ld";
import { PostMarkdown } from "@/components/post-markdown/post-markdown";
import { OG_IMAGE_HEIGHT, OG_IMAGE_TYPE, OG_IMAGE_WIDTH, SITE_NAME } from "@/constants/constants";
import { getPostBySlug, getPostsList } from "@/content/utils/get-posts/get-posts";
import { formatPostDate } from "@/utils/format-post-date/format-post-date";
import { getBlogPostJsonLd } from "@/utils/json-ld/json-ld";

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
      siteName: SITE_NAME,
      url: `/blog/${slug}`,
      title: post.title,
      description: post.description,
      type: "article",
      images: [
        {
          url: `/blog/${slug}/opengraph-image`,
          width: OG_IMAGE_WIDTH,
          height: OG_IMAGE_HEIGHT,
          type: OG_IMAGE_TYPE,
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
    <>
      <JsonLd data={getBlogPostJsonLd(post)} />

      <article className="space-y-18">
        <header className="text-hero-foreground light:font-bold space-y-6 font-semibold">
          <h1 className="text-5xl">
            <MarkdownRenderer>{post.title}</MarkdownRenderer>
          </h1>

          <div className="text-md flex flex-wrap gap-2">
            <dl className="flex gap-x-1">
              <dt className="text-stone-600 dark:text-stone-500">{content.published}</dt>
              <dd>
                <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>.
              </dd>
            </dl>

            {post.modifiedAt && (
              <dl className="flex gap-x-1">
                <dt className="text-stone-600 dark:text-stone-500">{content.updated}</dt>
                <dd>
                  <time dateTime={post.modifiedAt}>{formatPostDate(post.modifiedAt)}</time>.
                </dd>
              </dl>
            )}
          </div>
        </header>

        <div className="typeset">
          <PostMarkdown>{post.body}</PostMarkdown>
        </div>
      </article>
    </>
  );
}
