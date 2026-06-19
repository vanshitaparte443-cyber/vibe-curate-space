import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { useAuthStore } from "@/lib/auth-store";
import { useLocation } from "@tanstack/react-router";

/* ---------------------------
   ERROR + NOT FOUND
---------------------------- */
function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Page not found
        </p>

        <Link
          to="/"
          className="mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
    reportLovableError(error, {
      boundary: "tanstack_root_error_component",
    });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold text-foreground">
          Something went wrong
        </h1>

        <div className="mt-6 flex gap-2 justify-center">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-md bg-primary px-4 py-2 text-white"
          >
            Try again
          </button>

          <Link to="/" className="rounded-md border px-4 py-2">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------
   ROOT ROUTE
---------------------------- */
export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        title: "MuseBoard — Collect Ideas. Curate Aesthetics.",
      },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

/* ---------------------------
   HTML SHELL
---------------------------- */
function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

/* ---------------------------
   APP WRAPPER
---------------------------- */
function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const { initAuth, user, loading } = useAuthStore();
  const router = useRouter();
  const location = useLocation();

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  useEffect(() => {
    if (loading) return;

    const path = location.pathname;
    const isAuthPage = path === "/login" || path === "/signup";

    // 🚨 NOT LOGGED IN → send to signup
    if (!user && !isAuthPage) {
      router.navigate({ to: "/signup", replace: true });
    }

    // 🚨 LOGGED IN → block auth pages
    if (user && isAuthPage) {
      router.navigate({ to: "/", replace: true });
    }
  }, [user, loading, location.pathname]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-muted-foreground">
        Loading MuseBoard...
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}