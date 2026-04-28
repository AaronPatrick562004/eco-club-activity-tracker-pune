import { Link } from "@tanstack/react-router";
import { Leaf, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

type HeaderProps = {
  subtitle?: string;
  activePath?: string;
};

export function Header({
  subtitle = "Mission LIFE • Pune",
  activePath = ""
}: HeaderProps) {
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    if (navOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [navOpen]);

  const navLinkClass = (path: string) =>
    `text-base transition-colors duration-200 ${
      activePath === path
     ? "text-primary font-semibold"
        : "text-foreground hover:text-primary"
    }`;

  const mobileNavLinkClass = (path: string) =>
    `min-h-11 flex items-center rounded-md px-3 py-2 transition-colors duration-200 text-base ${
      activePath === path
     ? "bg-secondary text-primary font-semibold"
        : "text-foreground hover:bg-secondary active:bg-secondary/80"
    }`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-border bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 min-h-11 shrink-0">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Leaf className="h-5 w-5" />
          </span>
          <div className="leading-tight">
            <div className="text-base font-semibold text-foreground truncate">
              Eco-Club Activity Tracker
            </div>
            <div className="text-xs text-muted-foreground truncate">
              {subtitle}
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/objectives" className={navLinkClass("/objectives")}>Objectives</Link>
          <Link to="/activities" className={navLinkClass("/activities")}>Activities</Link>
          <Link to="/divisions" className={navLinkClass("/divisions")}>Divisions</Link>
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Link
            to="/login"
            search={{ activity: undefined, returnTo: undefined }}
            className="h-10 rounded-md bg-primary px-4 text-base font-medium text-primary-foreground hover:opacity-90 active:scale-95 transition-all duration-200 min-w-24 flex items-center justify-center"
          >
            Login
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          aria-expanded={navOpen}
          className="md:hidden flex h-11 w-11 items-center justify-center active:scale-95 transition-transform duration-200"
          onClick={() => setNavOpen((v) =>!v)}
        >
          {navOpen? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        className={`md:hidden fixed inset-0 top-16 z-40 transition-opacity duration-300 ${
          navOpen? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setNavOpen(false)}
        />
        <div
          className={`absolute top-0 left-0 right-0 border-t border-border bg-white max-h-[calc(100vh-4rem)] overflow-y-auto transition-transform duration-300 ease-out ${
            navOpen? "translate-y-0" : "-translate-y-4"
          }`}
        >
          <nav className="flex flex-col p-4 gap-1">
            <Link to="/objectives" onClick={() => setNavOpen(false)} className={mobileNavLinkClass("/objectives")}>
              Objectives
            </Link>
            <Link to="/activities" onClick={() => setNavOpen(false)} className={mobileNavLinkClass("/activities")}>
              Activities
            </Link>
            <Link to="/divisions" onClick={() => setNavOpen(false)} className={mobileNavLinkClass("/divisions")}>
              Divisions
            </Link>
            <div className="mt-3 pt-3 border-t border-border">
              <Link
                to="/login"
                search={{ activity: undefined, returnTo: undefined }}
                onClick={() => setNavOpen(false)}
                className="h-11 rounded-md bg-primary text-base font-medium text-primary-foreground flex items-center justify-center w-full active:scale-[0.98] transition-transform duration-200"
              >
                Login
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}