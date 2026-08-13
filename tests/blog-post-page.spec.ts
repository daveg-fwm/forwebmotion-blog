import { expect, test } from "@playwright/test";
import { getIntlayer } from "intlayer";
import type { BlogPosting, WithContext } from "schema-dts";

import { SITE_NAME } from "@/constants/constants";
import { getPostsList } from "@/content/utils/get-posts/get-posts";
import { formatPostDate } from "@/utils/format-post-date/format-post-date";
import { getBlogPostJsonLd } from "@/utils/json-ld/json-ld";

const postPage = getIntlayer("post-page");
const homepage = getIntlayer("homepage");

test.describe("Blog post pages", () => {
  let posts: Awaited<ReturnType<typeof getPostsList>>;

  test.beforeAll(async () => {
    posts = await getPostsList();
  });

  test("each post renders the heading and dates", async ({ page }) => {
    for (const post of posts) {
      await page.goto(`/blog/${post.slug}`);

      await expect(page.getByRole("heading", { level: 1, name: post.title })).toBeVisible();
      await expect(page.getByText(postPage.published)).toBeVisible();
      await expect(page.locator(`time[dateTime="${post.publishedAt}"]`)).toHaveText(
        formatPostDate(post.publishedAt),
      );

      if (post.modifiedAt) {
        await expect(page.getByText(postPage.updated)).toBeVisible();
        await expect(page.locator(`time[dateTime="${post.modifiedAt}"]`)).toHaveText(
          formatPostDate(post.modifiedAt),
        );
      } else {
        await expect(page.getByText(postPage.updated)).not.toBeVisible();
      }
    }
  });

  test("each post renders markdown body content", async ({ page }) => {
    for (const post of posts) {
      await page.goto(`/blog/${post.slug}`);

      const firstHeading = post.body.match(/^## (.+)$/m)?.[1];

      if (firstHeading) {
        await expect(page.getByRole("heading", { level: 2, name: firstHeading })).toBeVisible();
      }
    }
  });

  test("each post has the correct title and meta description", async ({ page }) => {
    for (const post of posts) {
      await page.goto(`/blog/${post.slug}`);

      await expect(page).toHaveTitle(`${post.title} | ${SITE_NAME}`);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute(
        "content",
        post.description,
      );
    }
  });

  test("each post includes blog post JSON-LD", async ({ page }) => {
    for (const post of posts) {
      await page.goto(`/blog/${post.slug}`);

      const jsonLd = page.locator('script[type="application/ld+json"]');
      await expect(jsonLd).toHaveCount(1);

      const data = JSON.parse((await jsonLd.textContent()) ?? "") as WithContext<BlogPosting>;

      expect(data).toEqual(getBlogPostJsonLd(post));
      expect(data.author).toMatchObject({ "@type": "Person", name: homepage.name });
    }
  });

  test("returns 404 for an unknown post", async ({ page }) => {
    const response = await page.goto("/blog/unknown-post");

    expect(response?.status()).toBe(404);
  });
});
