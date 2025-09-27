import { useEffect, type ReactNode } from "react";
import { useRouter } from "@tanstack/react-router";
import { useAuthStore } from "@/utils/store/authStore";
import { useAuthCheck } from "@/utils/hooks/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuthStore();
  const authCheckQuery = useAuthCheck();
  const router = useRouter();

  useEffect(() => {
    if (authCheckQuery.isSuccess && !authCheckQuery?.data?.isAuthenticated) {
      const currentPath = window.location.pathname + window.location.search;
      if (currentPath !== "/login") {
        sessionStorage.setItem("redirectAfterLogin", currentPath);
      }
      router.navigate({ to: "/login" });
    }
  }, [authCheckQuery.isSuccess, authCheckQuery.data, router]);

  if (authCheckQuery.isLoading) {
    return (
      fallback || (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading...</p>
          </div>
        </div>
      )
    );
  }

  if (!isAuthenticated || (authCheckQuery.isSuccess && !authCheckQuery.data.isAuthenticated)) {
    return null;
  }

  return <>{children}</>;
}
