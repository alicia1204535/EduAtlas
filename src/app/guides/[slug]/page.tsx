import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getGuideBySlug, loadAllGuides } from "@/lib/guides";
import { SITE_URL } from "@/lib/constants";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { GuideJsonLd } from "@/components/guides/guide-jsonld";
import { TableOfContents } from "@/components/guides/table-of-contents";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const guides = loadAllGuides();
  return guides.map((g) => ({ slug: g.slug }));
}

export const revalidate = 86400;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};

  return {
    title: { absolute: guide.meta.seo.title },
    description: guide.meta.seo.description,
    alternates: { canonical: `${SITE_URL}/guides/${guide.meta.slug}` },
    openGraph: {
      title: guide.meta.seo.title,
      description: guide.meta.seo.description,
      type: "article",
      ...(guide.meta.featuredImage
        ? { images: [{ url: guide.meta.featuredImage }] }
        : {}),
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) notFound();

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <GuideJsonLd meta={guide.meta} content={guide.content} />
      <Breadcrumbs
        items={[
          { label: "Guides", href: "/guides" },
          { label: guide.meta.title },
        ]}
      />

      <div className="flex gap-10">
        {/* Main content */}
        <article className="flex-1 min-w-0 max-w-3xl">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              {guide.meta.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span>{guide.meta.author}</span>
              <span>·</span>
              <time dateTime={guide.meta.publishDate}>
                {new Date(guide.meta.publishDate).toLocaleDateString("en-SG", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span>·</span>
              <span>{guide.meta.readTime} min read</span>
              {guide.meta.category && (
                <>
                  <span>·</span>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs">
                    {guide.meta.category}
                  </span>
                </>
              )}
            </div>
          </header>

          <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-table:text-sm">
            <MDXRemote source={guide.content} />
          </div>
        </article>

        {/* Sidebar ToC */}
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-24">
            <TableOfContents content={guide.content} />
          </div>
        </aside>
      </div>
    </div>
  );
}
