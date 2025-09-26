import { Button } from "@components/ui/button";

function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">React + TypeScript + Tailwind + shadcn/ui</h1>

      <div className="flex gap-4">
        <Button variant="default" size="lg">
          Default Button
        </Button>
        <Button variant="secondary" size="lg">
          Secondary Button
        </Button>
        <Button variant="outline" size="lg">
          Outline Button
        </Button>
      </div>

      <p className="text-muted-foreground text-center max-w-md">Your complete setup is working! You can now start building your application with React, TypeScript, Tailwind CSS, and shadcn/ui components.</p>
    </div>
  );
}

export default App;
