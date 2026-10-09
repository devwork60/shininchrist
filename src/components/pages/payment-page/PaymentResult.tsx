"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ButtonSm from "@/components/button/ButtonSm";
import CardDescSm from "@/components/pages/typography/CardDescSm";

type View = "checking" | "confirmed" | "pending" | "failed" | "unknown";

const MAX_TRIES = 6;

/** Paystack sends the visitor back here with ?reference=... We ask OUR server, which asks Paystack. */
const PaymentResult = () => {
  const reference = useSearchParams().get("reference") ?? "";
  const [view, setView] = useState<View>(reference ? "checking" : "unknown");
  const [purpose, setPurpose] = useState("");

  useEffect(() => {
    if (!reference) return;
    let cancelled = false;

    const check = async (attempt: number) => {
      try {
        const res = await fetch(
          `/api/payments/verify?reference=${encodeURIComponent(reference)}`,
          {
            cache: "no-store",
          },
        );
        const data = await res.json();
        if (cancelled) return;
        if (data.state === "confirmed") {
          setPurpose(data.purpose);
          setView("confirmed");
        } else if (data.state === "failed") {
          setView("failed");
        } else if (data.state === "pending" && attempt < MAX_TRIES) {
          // The webhook may still be on its way; look again in a few seconds.
          setTimeout(() => check(attempt + 1), 3000);
        } else {
          setView(data.state === "unknown" ? "unknown" : "pending");
        }
      } catch {
        if (!cancelled) setView("pending");
      }
    };

    check(1);
    return () => {
      cancelled = true;
    };
  }, [reference]);

  const copy: Record<View, { title: string; text: string }> = {
    checking: {
      title: "Confirming your payment…",
      text: "Please wait a moment. Do not close this page.",
    },
    confirmed: {
      title: "Thank you! Your payment is confirmed.",
      text:
        purpose === "uniform"
          ? "Your uniform payment has been received. ShininChrist will complete the remaining checks before activating your account."
          : "Your gift has been received. A confirmation will be sent to your email. May God bless you.",
    },
    pending: {
      title: "We are still confirming your payment.",
      text: "If you were charged, it will be confirmed shortly and you will get an email. You do not need to pay again.",
    },
    failed: {
      title: "The payment was not completed.",
      text: "You have not been charged. You can go back and try again.",
    },
    unknown: {
      title: "We could not find this payment.",
      text: "Please contact us if you need help.",
    },
  };

  const { title, text } = copy[view];

  return (
    <div
      role="status"
      className="rounded-2xl border border-primary-gold/30 bg-white-color p-8 text-center shadow-sm sm:p-12"
    >
      <h1 className="font-heading text-3xl font-semibold text-primary-green">
        {title}
      </h1>
      <CardDescSm className="mx-auto mt-4 max-w-md !text-base !text-text-dark">
        {text}
      </CardDescSm>
      {view !== "checking" && (
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonSm
            url={purpose === "uniform" ? "/join" : "/"}
            text={
              purpose === "uniform" ? "Continue registration" : "Back to Home"
            }
            bgColor="var(--primary-green)"
            textColor="var(--white-color)"
            shape="rounded"
          />
          {view === "failed" && (
            <Link
              href="/give/financially"
              className="text-sm font-semibold text-primary-gold hover:underline"
            >
              Try again
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentResult;
