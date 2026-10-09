"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export interface AuthState {
  loading: boolean;
  user: { name: string; email: string } | null;
  isAdmin: boolean;
}

/** Who is signed in, for the header. Re-checks whenever Supabase reports a sign-in or sign-out. */
export const useAuthUser = (): AuthState => {
  const [state, setState] = useState<AuthState>({
    loading: true,
    user: null,
    isAdmin: false,
  });

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        const data = await res.json();
        if (active)
          setState({ loading: false, user: data.user, isAdmin: data.isAdmin });
      } catch {
        if (active) setState({ loading: false, user: null, isAdmin: false });
      }
    };

    load();
    const { data } = createClient().auth.onAuthStateChange(() => load());
    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, []);

  return state;
};
