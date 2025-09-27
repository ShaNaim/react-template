import { createFileRoute } from "@tanstack/react-router";
import { ProtectedRoute } from "@/components/modules/auth/ProtectedRoute";
export const Route = createFileRoute("/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ProtectedRoute>
      <div> Hello "/dashboard/"!</div>
    </ProtectedRoute>
  );
}
