// Root Layout (routes/__root.tsx)
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useAuthStore } from "@/utils/store/authStore";
import { useEffect } from "react";
import { TopNavigation } from "@/components/modules/navigation/TopNavigation";
import { Footer } from "@/components/modules/navigation/Footer";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const { isAuthenticated, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div className="min-h-screen flex flex-col">
      {isAuthenticated && <TopNavigation />}

      {/* Main content area that grows to fill available space */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer that sticks to bottom */}
      {isAuthenticated && <Footer />}

      <TanStackRouterDevtools />
    </div>
  );
}
