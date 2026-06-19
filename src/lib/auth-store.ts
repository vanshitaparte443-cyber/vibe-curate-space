import { supabase } from "./supabase";
import { create } from "zustand";

type User = {
  id: string;
  email?: string;
} | null;

type AuthState = {
  user: User;
  loading: boolean;

  initAuth: () => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set, get) => {
  let subscription: any = null;

  return {
    user: null,
    loading: true,

    initAuth: async () => {
      set({ loading: true });

      // get current session once
      const { data } = await supabase.auth.getSession();

      set({
        user: data.session?.user ?? null,
        loading: false,
      });

      // cleanup old listener
      subscription?.unsubscribe?.();

      // listen for changes
      const { data: listener } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          set({
            user: session?.user ?? null,
            loading: false,
          });
        }
      );

      subscription = listener.subscription;
    },

    logout: async () => {
      await supabase.auth.signOut();
      set({ user: null });
    },
  };
});