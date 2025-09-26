import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="prose prose-lg mx-auto">
        <h1>About Us</h1>
        <p>This application demonstrates the power of modern React development with a fully type-safe routing system using TanStack Router.</p>
        <h2>Technologies Used:</h2>
        <ul>
          <li>React 18+ with TypeScript</li>
          <li>Vite for blazing fast development</li>
          <li>TanStack Router for type-safe routing</li>
          <li>Tailwind CSS for styling</li>
          <li>shadcn/ui for beautiful components</li>
        </ul>
      </div>
    </div>
  );
}
