import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <div className="p-2 flex gap-2 text-lg items-center">
        <h1>My App</h1>
        <nav className="ml-auto flex gap-4">
          <Link
            to="/"
            className="text-primary hover:text-primary/80 transition-colors"
            activeProps={{
              className: "font-semibold",
            }}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-primary hover:text-primary/80 transition-colors"
            activeProps={{
              className: "font-semibold",
            }}
          >
            About
          </Link>
          <Link
            to="/login"
            className="text-primary hover:text-primary/80 transition-colors"
            activeProps={{
              className: "font-semibold",
            }}
          >
            Login
          </Link>
        </nav>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
