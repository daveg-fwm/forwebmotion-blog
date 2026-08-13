import { expect, test } from "@playwright/test";
import { getIntlayer } from "intlayer";
import type { Graph } from "schema-dts";

import { SITE_NAME } from "@/constants/constants";
import { getPostsList } from "@/content/utils/get-posts/get-posts";
import { getHomepageJsonLd } from "@/utils/json-ld/json-ld";

const homepage = getIntlayer("homepage");

test.describe("Homepage", () => {
  let latestPosts: Awaited<ReturnType<typeof getPostsList>>;

  test.beforeAll(async () => {
    latestPosts = await getPostsList({ end: 4 });
  });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders the hero section", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: homepage.heading,
      }),
    ).toBeVisible();

    await expect(page.getByText(homepage.name, { exact: true })).toBeVisible();
    await expect(page.getByText(homepage.description)).toBeVisible();
  });

  test("lists the latest posts", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 2, name: homepage.postsBadge })).toBeVisible();

    const posts = page.getByRole("article");
    await expect(posts).toHaveCount(latestPosts.length);

    for (const [index, post] of latestPosts.entries()) {
      await expect(posts.nth(index).getByRole("link")).toHaveAttribute(
        "href",
        `/blog/${post.slug}`,
      );
      await expect(posts.nth(index).getByRole("link")).toHaveText(post.title);
    }
  });

  test("links to the blog index", async ({ page }) => {
    const blogLink = page.getByRole("link", { name: homepage.blogLink });
    await expect(blogLink).toHaveAttribute("href", "/blog");
    await blogLink.click();
    await expect(page).toHaveURL("/blog");
  });

  test("has the site title and meta description", async ({ page }) => {
    await expect(page).toHaveTitle(SITE_NAME);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      homepage.heading,
    );
  });

  test("includes homepage JSON-LD", async ({ page }) => {
    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toHaveCount(1);

    const data = JSON.parse((await jsonLd.textContent()) ?? "") as Graph;

    expect(data).toEqual(
      getHomepageJsonLd({
        description: homepage.heading,
        posts: latestPosts,
      }),
    );
  });
});
