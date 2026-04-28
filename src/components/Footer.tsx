import { Link } from "@tanstack/react-router";
import { Leaf, MapPin, FileText } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        {/* 12-col grid for precise control */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-6">

          {/* Col 1-4: Brand */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="flex items-center gap-2.5 min-h-11">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Leaf className="h- w-" aria-hidden="true" />
              </span>
              <span className="text-sm sm:text-base font-semibold">
                Pune Eco-Club Tracker
              </span>
            </div>
            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-muted-foreground max-w-">
              A Pune district initiative under Mission LIFE to track and promote environmental
              activities in PMC, PCMC and rural taluka schools.
            </p>
          </div>

          {/* Col 5-6: Platform */}
          <div className="md:col-span-2 lg:col-span-2">
            <h3 className="text-xs sm:text-sm font-semibold text-foreground">Platform</h3>
            <ul className="mt-3 sm:mt-4 space-y-1 sm:space-y-2">
              <li>
                <Link
                  to="/objectives"
                  className="min-h-11 flex items-center text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline"
                >
                  Objectives
                </Link>
              </li>
              <li>
                <Link
                  to="/activities"
                  className="min-h-11 flex items-center text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline"
                >
                  Activities
                </Link>
              </li>
              <li>
                <Link
                  to="/divisions"
                  className="min-h-11 flex items-center text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline"
                >
                  Divisions
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 7-9: Resources */}
          <div className="md:col-span-3 lg:col-span-3">
            <h3 className="text-xs sm:text-sm font-semibold text-foreground">Resources</h3>
            <ul className="mt-3 sm:mt-4 space-y-1 sm:space-y-2">
              <li>
                <a
                  href="/pdfs/gr-09-feb-2026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-11 flex items-center gap-2 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline"
                >
                  <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" aria-hidden="true" />
                  <span className="break-words">GR dated 09 Feb 2026</span>
                </a>
              </li>
              <li>
                <a
                  href="/pdfs/activity-guidelines.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-11 flex items-center gap-2 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline"
                >
                  <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" aria-hidden="true" />
                  <span className="break-words">Activity Guidelines</span>
                </a>
              </li>
              <li>
                <a
                  href="/pdfs/Mission-LIFE-Portal.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-11 flex items-center gap-2 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline"
                >
                  <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" aria-hidden="true" />
                  <span className="break-words">Mission LIFE Portal</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 10-12: Contact */}
          <div className="md:col-span-2 lg:col-span-3">
            <h3 className="text-xs sm:text-sm font-semibold text-foreground">Contact</h3>
            <ul className="mt-3 sm:mt-4 space-y-2 sm:space-y-2.5">
              <li className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 mt-0.5 shrink-0" aria-hidden="true" />
                <span className="leading-relaxed break-words">
                  Pune ZP Education Dept.<br />Council Hall, Pune 411001
                </span>
              </li>
              <li className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" aria-hidden="true" />
                <span>Maharashtra, India</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
          <p className="text-center text- sm:text-xs text-muted-foreground">
            <span className="block sm:hidden">© {new Date().getFullYear()} Pune Eco-Club Tracker</span>
            <span className="hidden sm:block">© {new Date().getFullYear()} Pune Eco-Club Activity Tracker. All rights reserved.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}