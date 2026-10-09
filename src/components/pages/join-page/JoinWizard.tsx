"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { WIZARD_STEPS, type WizardStepId } from "@/constant/joinData";
import type { JoinStatus } from "@/lib/join";
import { getJson } from "./joinApi";
import StepAbout from "./steps/StepAbout";
import StepAccount from "./steps/StepAccount";
import StepConsent from "./steps/StepConsent";
import StepPayment from "./steps/StepPayment";
import StepProof from "./steps/StepProof";
import StepReview from "./steps/StepReview";
import StepSubscribe from "./steps/StepSubscribe";
import StepUniform, { type UniformDetails } from "./steps/StepUniform";
import StepWelcome from "./steps/StepWelcome";
import WizardProgress from "./WizardProgress";

type Loaded = JoinStatus | { signedIn: false };

const ageFrom = (dob: string) => {
  const born = new Date(dob);
  if (!dob || Number.isNaN(born.getTime())) return null;
  const now = new Date();
  let age = now.getFullYear() - born.getFullYear();
  if (now < new Date(now.getFullYear(), born.getMonth(), born.getDate()))
    age -= 1;
  return age;
};

/** Where an applicant should land, from what the server already knows about them. */
const resumeStep = (status: Loaded): WizardStepId => {
  if (!status.signedIn) return "account";
  const { profile, membership, uniformPaid } = status;
  if (membership.status === "active") return "welcome";
  if (!profile.fullName) return "about";
  if (membership.isMinor && membership.consentStatus === "not_submitted")
    return "consent";
  if (membership.proofStatus === "not_submitted") return "subscribe";
  if (!uniformPaid) return "uniform";
  return "review";
};

/** The real Join flow. Every step saves to the server; reloading the page resumes where you stopped. */
const JoinWizard = () => {
  const [status, setStatus] = useState<Loaded | null>(null);
  const [step, setStep] = useState<WizardStepId>("account");
  const [dob, setDob] = useState("");
  const [platform, setPlatform] = useState("");
  const [uniform, setUniform] = useState<UniformDetails | null>(null);

  const refresh = useCallback(async () => {
    const data = await getJson<Loaded>("/api/join/status");
    setStatus(data);
    return data;
  }, []);

  useEffect(() => {
    let cancelled = false;
    getJson<Loaded>("/api/join/status")
      .then((data) => {
        if (cancelled) return;
        setStatus(data);
        if (data.signedIn) {
          setDob(data.profile.dob ?? "");
          setPlatform(data.membership.socialPlatform ?? "");
        }
        setStep(resumeStep(data));
      })
      .catch(() => !cancelled && setStatus({ signedIn: false }));
    return () => {
      cancelled = true;
    };
  }, []);

  const liveAge = ageFrom(dob);
  const minor =
    liveAge !== null
      ? liveAge < 18
      : Boolean(status?.signedIn && status.membership.isMinor);

  // Parental consent only appears for applicants under 18.
  const steps = useMemo(
    () => WIZARD_STEPS.filter((s) => s.id !== "consent" || minor),
    [minor],
  );
  const index = Math.max(
    0,
    steps.findIndex((s) => s.id === step),
  );

  const go = (offset: number) =>
    setStep(steps[Math.min(Math.max(index + offset, 0), steps.length - 1)].id);
  const next = () => go(1);
  const back = () => go(-1);

  /** After a save: reload the server's view, then move on. */
  const saved = async () => {
    await refresh();
    next();
  };

  if (!status) {
    return (
      <section
        id="join-wizard"
        className="rounded-2xl border border-primary-gold/20 bg-white-color p-8 text-center text-sm text-text-grey shadow-sm"
      >
        Loading your registration…
      </section>
    );
  }

  return (
    <section
      id="join-wizard"
      className="scroll-mt-24 rounded-2xl border border-primary-gold/20 bg-white-color p-5 shadow-sm sm:p-8"
    >
      <WizardProgress
        steps={steps}
        current={index}
        status={status.signedIn ? status.membership.status : "started"}
      />
      <div className="mt-8">
        {step === "account" && (
          <StepAccount
            email={status.signedIn ? status.email : null}
            onNext={
              status.signedIn
                ? next
                : () => {
                    throw new Error("Please sign in with Google to continue.");
                  }
            }
          />
        )}

        {status.signedIn && step === "about" && (
          <StepAbout
            status={status}
            dob={dob}
            onDob={setDob}
            minor={minor}
            onSaved={saved}
            onBack={back}
          />
        )}
        {status.signedIn && step === "consent" && (
          <StepConsent
            consentStatus={status.membership.consentStatus}
            onSaved={saved}
            onBack={back}
          />
        )}
        {status.signedIn && step === "subscribe" && (
          <StepSubscribe
            platform={platform}
            onPlatform={setPlatform}
            onNext={next}
            onBack={back}
          />
        )}
        {status.signedIn && step === "proof" && (
          <StepProof
            platform={platform}
            proofStatus={status.membership.proofStatus}
            onSaved={saved}
            onBack={back}
          />
        )}
        {status.signedIn && step === "uniform" && (
          <StepUniform
            details={uniform}
            onSave={(details) => {
              setUniform(details);
              next();
            }}
            onBack={back}
          />
        )}
        {status.signedIn && step === "payment" && uniform && (
          <StepPayment details={uniform} onBack={back} />
        )}
        {status.signedIn && step === "payment" && !uniform && (
          <p className="text-sm text-text-dark">
            Please enter your uniform details first.
          </p>
        )}
        {status.signedIn && step === "review" && (
          <StepReview
            status={status}
            onRefresh={async () => {
              const data = await refresh();
              if (data.signedIn && data.membership.status === "active")
                setStep("welcome");
            }}
          />
        )}
        {status.signedIn && step === "welcome" && (
          <StepWelcome memberId={status.membership.memberId} />
        )}
      </div>
    </section>
  );
};

export default JoinWizard;
