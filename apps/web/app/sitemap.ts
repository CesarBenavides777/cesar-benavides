import { getAllPages } from "@/lib/wp/getAllPages";
import { getAllPosts } from "@/lib/wp/getAllPosts";
import { Page } from "@/types/wp";

import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await getAllPages();
  const posts = await getAllPosts();

  const sitemapItems = [
    ...pages.map((page: Page) => ({
        url: `https://www.cesarbenavides.com/${page.slug}`,
        lastModified: page.modified,
    })),
    ...posts.map((post) => ({
        url: `https://www.cesarbenavides.com/blog/${post.slug}`,
        lastModified: post.modified,
    })),
  ]
  return sitemapItems;
}
