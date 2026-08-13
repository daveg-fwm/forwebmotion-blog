import { expect, test } from "@playwright/test";
import { getIntlayer } from "intlayer";
import type { Blog, WithContext } from "schema-dts";

import { SITE_NAME } from "@/constants/constants";
import { getPostsList } from "@/content/utils/get-posts/get-posts";
import { formatPostDate } from "@/utils/format-post-date/format-post-date";
import { getBlogJsonLd } from "@/utils/json-ld/json-ld";

const blogPage = getIntlayer("blog-page");

test.describe("Blog page", () => {
  let posts: Awaited<ReturnType<typeof getPostsList>>;

  test.beforeAll(async () => {
    posts = await getPostsList();
  });

  test.beforeEach(async ({ page }) => {
    await page.goto("/blog");
  });

  test("renders the page heading", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1, name: blogPage.heading })).toBeVisible();
  });

  test("lists all posts", async ({ page }) => {
    const articles = page.getByRole("article");
    await expect(articles).toHaveCount(posts.length);

    for (const [index, post] of posts.entries()) {
      const article = articles.nth(index);

      await expect(article.getByRole("link")).toHaveAttribute("href", `/blog/${post.slug}`);
      await expect(article.getByRole("link")).toHaveText(post.title);
      await expect(article.getByText(post.description)).toBeVisible();
      await expect(article.locator("time")).toHaveAttribute(
        "dateTime",
        post.modifiedAt ?? post.publishedAt,
      );
      await expect(article.locator("time")).toHaveText(
        formatPostDate(post.modifiedAt ?? post.publishedAt),
      );
    }
  });

  test("has the page title and meta description", async ({ page }) => {
    await expect(page).toHaveTitle(`${blogPage.heading} | ${SITE_NAME}`);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      blogPage.description,
    );
  });

  test("includes blog JSON-LD", async ({ page }) => {
    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toHaveCount(1);

    const data = JSON.parse((await jsonLd.textContent()) ?? "") as WithContext<Blog>;

    expect(data).toEqual(
      getBlogJsonLd({
        name: blogPage.heading,
        description: blogPage.description,
        posts,
      }),
    );
  });
});
