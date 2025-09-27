import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useLogin } from "@/utils/hooks/useAuth";
import { useAuthStore } from "@/utils/store/authStore";
import { loginSchema, type LoginFormData } from "@/utils/schemas/auth";

export const Route = createFileRoute("/login/")({
  component: LoginPage,
});

function LoginPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const loginMutation = useLogin();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      const redirectPath = sessionStorage.getItem("redirectAfterLogin") || "/";
      sessionStorage.removeItem("redirectAfterLogin");
      router.navigate({ to: redirectPath });
    }
  }, [isAuthenticated, router]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      await loginMutation.mutateAsync(data);
      const redirectPath = sessionStorage.getItem("redirectAfterLogin") || "/dashboard";
      sessionStorage.removeItem("redirectAfterLogin");
      router.navigate({ to: redirectPath });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Login failed:", error);
    }
  };

  const getErrorMessage = (error: unknown): string => {
    if (error && typeof error === "object" && "response" in error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const axiosError = error as any;
      return axiosError.response?.data?.message || "Login failed. Please try again.";
    }
    return "Login failed. Please try again.";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground">Sign in to your account</h2>
          <p className="mt-2 text-sm text-muted-foreground">Welcome back! Please enter your details.</p>
        </div>

        <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {loginMutation.isError && (
                <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20">
                  <p className="text-sm text-destructive">{getErrorMessage(loginMutation.error)}</p>
                </div>
              )}

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter your email" disabled={loginMutation.isPending} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter your password" disabled={loginMutation.isPending} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="remember"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={loginMutation.isPending} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-normal">Remember me</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <button type="button" className="text-sm text-primary hover:text-primary/80" disabled={loginMutation.isPending}>
                  Forgot password?
                </button>
              </div>

              <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
                {loginMutation.isPending ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <button type="button" className="text-primary hover:text-primary/80 font-medium" disabled={loginMutation.isPending}>
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
