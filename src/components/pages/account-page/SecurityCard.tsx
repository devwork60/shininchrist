"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthIcons from "@/components/icons/AuthIcons";
import CardDescSm from "@/components/pages/typography/CardDescSm";

export interface DeviceRow {
  id: string;
  device: string;
  ip: string;
  lastActive: string;
}

const SecurityCard = ({ sessions }: { sessions: DeviceRow[] }) => {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);

  const logOutEverywhere = async () => {
    setBusy(true);
    setError(false);
    const res = await fetch("/api/auth/signout-all", { method: "POST" });
    if (!res.ok) {
      setBusy(false);
      setError(true);
      return;
    }
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="rounded-xl border border-primary-green/10 bg-white-color p-6">
      <h2 className="font-heading text-xl font-semibold text-primary-green">
        Security and devices
      </h2>
      <CardDescSm className="mt-1">
        These devices are signed in to your account. If you do not recognize
        one, log out of all devices.
      </CardDescSm>

      <ul className="mt-5 divide-y divide-primary-green/10">
        {sessions.map(({ id, device, ip, lastActive }) => (
          <li
            key={id}
            className="grid grid-cols-[auto_1fr_auto] items-center gap-3 py-3"
          >
            <AuthIcons
              name={/iOS|Android/.test(device) ? "phone" : "device"}
              className="h-7 w-7 text-primary-green [&>svg]:h-full [&>svg]:w-full"
            />
            <div>
              <p className="text-sm font-semibold text-text-dark">{device}</p>
              {ip && <CardDescSm className="!text-xs">{ip}</CardDescSm>}
            </div>
            <CardDescSm className="!text-xs">{lastActive}</CardDescSm>
          </li>
        ))}
      </ul>

      {error && (
        <p role="alert" className="mt-3 text-sm text-red-700">
          Something went wrong. Please try again.
        </p>
      )}

      {confirming ? (
        <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-semibold text-red-800">
            Log out of all devices?
          </p>
          <CardDescSm className="mt-1 !text-red-800/80">
            You will be signed out everywhere, including this device, and will
            need to sign in again.
          </CardDescSm>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={logOutEverywhere}
              disabled={busy}
              className="rounded-md bg-red-700 px-4 py-2.5 text-sm font-semibold text-white-color hover:bg-red-800 disabled:opacity-60"
            >
              {busy ? "Logging out…" : "Yes, log out everywhere"}
            </button>
            <button
              type="button"
              onClick={() => setConfirming(false)}
              className="rounded-md border border-primary-green/30 px-4 py-2.5 text-sm font-semibold text-text-dark hover:bg-cream"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setConfirming(true)}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-md border border-primary-green px-4 py-3 text-sm font-semibold text-primary-green transition-colors hover:bg-primary-green hover:text-white-color sm:w-auto"
        >
          <AuthIcons
            name="logout"
            className="h-5 w-5 [&>svg]:h-full [&>svg]:w-full"
          />
          Log out of all devices
        </button>
      )}
    </div>
  );
};

export default SecurityCard;
