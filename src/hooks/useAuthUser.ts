"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export interface AuthState {
  loading: boolean;
  user: { name: string; email: string } | null;
  isAdmin: boolean;
}

/** Who is signed in, for the header. Checks via server route /api/auth/me and listens to auth state changes if available. */
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

    const client = createClient();
    const subscription = client
      ? client.auth.onAuthStateChange(() => load()).data.subscription
      : null;

    return () => {
      active = false;
      subscription?.unsubscribe();
    };
  }, []);

  return state;
};
