import { Link } from "@tanstack/react-router";
import { Leaf, MapPin, FileText } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
        {/* 12-col grid for precise control */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-6">

          {/* Col 1-4: Brand */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Leaf className="h-4.5 w-4.5" aria-hidden="true" />
              </span>
              <span className="text-base font-semibold">
                Pune Eco-Club Tracker
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground max-w-sm">
              A Pune district initiative under Mission LIFE to track and promote environmental
              activities in PMC, PCMC and rural taluka schools.
            </p>
          </div>

          {/* Col 5-6: Platform */}
          <div className="md:col-span-2 lg:col-span-2">
            <h3 className="text-sm font-semibold text-foreground">Platform</h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  to="/objectives"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline"
                >
                  Objectives
                </Link>
              </li>
              <li>
                <Link
                  to="/activities"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline"
                >
                  Activities
                </Link>
              </li>
              <li>
                <Link
                  to="/division"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline"
                >
                  Division
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 7-9: Resources */}
          <div className="md:col-span-3 lg:col-span-3">
            <h3 className="text-sm font-semibold text-foreground">Resources</h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href="/pdfs/gr-09-feb-2026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <FileText className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>GR dated 09 Feb 2026</span>
                </a>
              </li>
              <li>
                <a
                  href="/pdfs/activity-guidelines.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline"
                >
                  <FileText className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Activity Guidelines</span>
                </a>
              </li>
              <li>
                <a
                  href="/pdfs/Mission-LIFE-Portal.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline"
                >
                  <FileText className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Mission LIFE Portal</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 10-12: Contact */}
          <div className="md:col-span-2 lg:col-span-3">
            <h3 className="text-sm font-semibold text-foreground">Contact</h3>
            <ul className="mt-4 space-y-2.5">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
                <span className="leading-relaxed">
                  Pune ZP Education Dept.<br />Council Hall, Pune 411001
                </span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Maharashtra, India</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} Pune Eco-Club Activity Tracker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}