"use client";

import { useState } from "react";
import clsx from "clsx";
import AuthIcons from "@/components/icons/AuthIcons";
import { createClient } from "@/lib/supabase/client";

interface GoogleSignInButtonProps {
  text?: string;
  /** Where to land after sign-in. Must be a path on this site. */
  next?: string;
  className?: string;
}

/** Starts Google sign-in with Supabase. Google returns to /api/auth/callback, which creates the session. */
const GoogleSignInButton = ({
  text = "Continue with Google",
  next = "/account",
  className,
}: GoogleSignInButtonProps) => {
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);

  const signIn = async () => {
    setBusy(true);
    setFailed(false);
    const { error } = await createClient().auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });
    if (error) {
      setBusy(false);
      setFailed(true);
    }
  };

  return (
    <div className="grid gap-2">
      <button
        type="button"
        onClick={signIn}
        disabled={busy}
        className={clsx(
          "flex w-full items-center justify-center gap-3 rounded-lg border border-primary-green/30 bg-white-color px-5 py-3.5 text-base font-semibold text-text-dark shadow-sm transition-colors hover:border-primary-gold hover:bg-cream disabled:cursor-wait disabled:opacity-70",
          className,
        )}
      >
        <AuthIcons
          name="google"
          className="h-6 w-6 [&>svg]:h-full [&>svg]:w-full"
        />
        {busy ? "Opening Google…" : text}
      </button>
      {failed && (
        <p role="alert" className="text-sm text-red-700">
          Could not start Google sign-in. Please try again.
        </p>
      )}
    </div>
  );
};

export default GoogleSignInButton;
