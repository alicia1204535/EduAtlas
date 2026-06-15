import { cache } from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { GuideMeta } from "./types";

const GUIDES_DIR = path.join(process.cwd(), "src/content/guides");

export const loadAllGuides = cache((): GuideMeta[] => {
  if (!fs.existsSync(GUIDES_DIR)) return [];
  const files = fs.readdirSync(GUIDES_DIR).filter((f) => f.endsWith(".mdx"));
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(GUIDES_DIR, file), "utf-8");
      const { data } = matter(raw);
      return {
        slug: file.replace(".mdx", ""),
        title: data.title || "",
        excerpt: data.excerpt || "",
        author: data.author || "EduAtlas",
        publishDate: data.publishDate || "",
        updatedDate: data.updatedDate,
        featuredImage: data.featuredImage || "",
        readTime: data.readTime || 5,
        category: data.category || "General",
        tags: data.tags || [],
        seo: data.seo || { title: data.title, description: data.excerpt },
      } as GuideMeta;
    })
    .sort(
      (a, b) =>
        new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );
});

export const getGuideBySlug = cache(
  (slug: string): { meta: GuideMeta; content: string } | null => {
    const filePath = path.join(GUIDES_DIR, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) return null;
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    return {
      meta: { slug, ...data } as GuideMeta,
      content,
    };
  }
);
