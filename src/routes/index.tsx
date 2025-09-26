import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@components/ui/button";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Welcome to Your App</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">This is your home page built with React, TypeScript, Tailwind CSS, shadcn/ui, and TanStack Router!</p>
        <div className="flex gap-4 justify-center">
          <Button size="lg">Get Started</Button>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
}
