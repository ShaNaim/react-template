import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { AuthAPI, type User } from "@/utils/services/api/auth";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;

  setUser: (user: User) => void;
  setAuthenticated: (isAuth: boolean) => void;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      setUser: (user: User) => {
        set({ user, isAuthenticated: true });
      },

      setAuthenticated: (isAuth: boolean) => {
        set({ isAuthenticated: isAuth });
        if (!isAuth) {
          set({ user: null });
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      checkAuth: async (): Promise<boolean> => {
        const currentState = get();
        if (currentState.user && currentState.isAuthenticated) {
          return true;
        }

        try {
          const user = await AuthAPI.getUser();
          set({ user, isAuthenticated: true });
          return true;
        } catch (error) {
          console.log(error);
          set({ user: null, isAuthenticated: false });
          return false;
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

if (typeof window !== "undefined") {
  window.addEventListener("auth:unauthorized", () => {
    useAuthStore.getState().logout();
  });
}
