import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useAuthStore } from "@/utils/store/authStore";
import { useLogout } from "@/utils/hooks/useAuth";
import { useEffect } from "react";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const { isAuthenticated, checkAuth } = useAuthStore();
  const logoutMutation = useLogout();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      window.location.href = "/login";
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      window.location.href = "/login";
    }
  };
  return (
    <>
      <div className="p-2 flex gap-2 text-lg items-center">
        <h1>My App</h1>
        <nav className="ml-auto flex gap-4 items-center">
          {isAuthenticated ? (
            <>
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
              <button onClick={handleLogout} disabled={logoutMutation.isPending} className="text-primary hover:text-primary/80 transition-colors disabled:opacity-50">
                {logoutMutation.isPending ? "Logging out..." : "Logout"}
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-primary hover:text-primary/80 transition-colors"
              activeProps={{
                className: "font-semibold",
              }}
            >
              Login
            </Link>
          )}
        </nav>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
