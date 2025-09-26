import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export const Route = createFileRoute("/login/")({
  component: LoginPage,
});

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password, rememberMe });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground">Sign in to your account</h2>
          <p className="mt-2 text-sm text-muted-foreground">Welcome back! Please enter your details.</p>
        </div>

        <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" name="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input id="remember-me" name="remember-me" type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="h-4 w-4 text-primary focus:ring-primary border-border rounded" />
                <Label htmlFor="remember-me" className="text-sm">
                  Remember me
                </Label>
              </div>

              <button type="button" className="text-sm text-primary hover:text-primary/80">
                Forgot password?
              </button>
            </div>

            <div className="space-y-3">
              <Button type="submit" className="w-full">
                Sign in
              </Button>

              <Button type="button" variant="outline" className="w-full">
                Continue with Google
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <button type="button" className="text-primary hover:text-primary/80 font-medium">
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
