import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-lg font-bold text-primary">
              {SITE_NAME}
            </Link>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Your comprehensive guide to international schools in Singapore.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-semibold text-sm mb-3">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/schools" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  All Schools
                </Link>
              </li>
              <li>
                <Link href="/recommend" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Get Recommendation
                </Link>
              </li>
              <li>
                <Link href="/schools/compare" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Compare Schools
                </Link>
              </li>
            </ul>
          </div>

          {/* Curricula */}
          <div>
            <h4 className="font-semibold text-sm mb-3">Curricula</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/curriculum/ib" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  IB Schools
                </Link>
              </li>
              <li>
                <Link href="/curriculum/igcse" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  IGCSE Schools
                </Link>
              </li>
              <li>
                <Link href="/curriculum/ap" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  AP Schools
                </Link>
              </li>
              <li>
                <Link href="/curriculum/a-levels" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  A-Level Schools
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-sm mb-3">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
