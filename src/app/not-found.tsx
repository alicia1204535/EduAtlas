import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <h1 className="text-4xl font-bold tracking-tight mb-4">404 — Page Not Found</h1>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        The page you&apos;re looking for doesn&apos;t exist. It may have been moved or the URL might be incorrect.
      </p>
      <div className="flex gap-4 justify-center">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Go Home
        </Link>
        <Link
          href="/schools"
          className="inline-flex items-center justify-center rounded-md border px-6 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
        >
          Browse Schools
        </Link>
      </div>
    </div>
  );
}
