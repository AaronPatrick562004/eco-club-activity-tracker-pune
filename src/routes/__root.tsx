import { Outlet, Link, createRootRoute } from "@tanstack/react-router";
import appCss from "../index.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Pune Eco-Club Activity Tracker | PMC & PCMC Schools" },
      { name: "description", content: "Digital platform to monitor Eco-Club activities across Pune & PCMC schools, segregated by Prabhag (ward)." },
      { name: "author", content: "Pune District Education Department" },
      { property: "og:title", content: "Pune Eco-Club Activity Tracker" },
      { property: "og:description", content: "Track Eco-Club activities across Pune district schools by Prabhag." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "icon",
        type: "image/svg+xml",
        href: "/leaf.svg",
      },
      {
        rel: "apple-touch-icon",
        href: "/leaf.svg",
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootComponent() {
  return <Outlet />;
}