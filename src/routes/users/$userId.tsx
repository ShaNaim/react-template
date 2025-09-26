// src/routes/users/$userId.tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/users/$userId")({
  // Data loader with type-safe params
  loader: async ({ params }) => {
    // params.userId is automatically typed as string
    const user = await fetch(`/api/users/${params.userId}`).then((res) => res.json());
    return { user };
  },
  component: UserDetailPage,
});

function UserDetailPage() {
  // Get typed params and loader data
  const { userId } = Route.useParams();
  const { user } = Route.useLoaderData();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">User Profile</h1>
      <p className="text-gray-600 mb-2">User ID: {userId}</p>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>
      </div>
    </div>
  );
}
