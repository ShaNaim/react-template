import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AuthAPI, type LoginCredentials, type ApiError } from "@/utils/services/api/auth";
import { useAuthStore } from "@/utils/store/authStore";

export function useLogin() {
  const queryClient = useQueryClient();
  const { setUser, setAuthenticated } = useAuthStore();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useMutation<any, AxiosError<ApiError>, LoginCredentials>({
    mutationFn: async (credentials: LoginCredentials) => {
      await AuthAPI.getCsrfCookie();
      return AuthAPI.login(credentials);
    },
    onSuccess: (data) => {
      setUser(data.user);
      setAuthenticated(true);

      queryClient.setQueryData(["user"], data.user);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error: AxiosError<ApiError>) => {
      console.error("Login error:", error);
      setAuthenticated(false);
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const { logout } = useAuthStore();

  return useMutation({
    mutationFn: AuthAPI.logout,
    onSuccess: () => {
      queryClient.clear();

      logout();
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.error("Logout error:", error);

      queryClient.clear();
      logout();
    },
  });
}

export function useUser() {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ["user"],
    queryFn: AuthAPI.getUser,
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 5,

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    retry: (failureCount, error: any) => {
      if (error?.response?.status === 401) {
        return false;
      }
      return failureCount < 2;
    },
  });
}

export function useAuthCheck() {
  const { checkAuth } = useAuthStore();
  return useQuery({
    queryKey: ["auth-check"],
    queryFn: async () => {
      const isValid = await checkAuth();
      return { isAuthenticated: isValid };
    },
    staleTime: 1000 * 60 * 2,
    retry: false,
  });
}
