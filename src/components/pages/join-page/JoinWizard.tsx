"use client";

import { useState } from "react";
import { WIZARD_STEPS } from "@/constant/joinData";
import StepAbout from "./steps/StepAbout";
import StepAccount from "./steps/StepAccount";
import StepConsent from "./steps/StepConsent";
import StepPayment from "./steps/StepPayment";
import StepProof from "./steps/StepProof";
import StepReview from "./steps/StepReview";
import StepSubscribe from "./steps/StepSubscribe";
import StepUniform from "./steps/StepUniform";
import StepWelcome from "./steps/StepWelcome";
import WizardProgress from "./WizardProgress";

const ageFrom = (dob: string) => {
  if (!dob) return null;
  const born = new Date(dob);
  if (Number.isNaN(born.getTime())) return null;
  const now = new Date();
  let age = now.getFullYear() - born.getFullYear();
  if (now < new Date(now.getFullYear(), born.getMonth(), born.getDate()))
    age -= 1;
  return age;
};

/** DESIGN ONLY: walks the Join flow with local state. Nothing is saved, sent or paid. */
const JoinWizard = () => {
  const [index, setIndex] = useState(0);
  const [dob, setDob] = useState("");

  const age = ageFrom(dob);
  const minor = age !== null && age < 18;
  // Parental consent only appears for applicants under 18 (driven by date of birth).
  const steps = WIZARD_STEPS.filter((step) => step.id !== "consent" || minor);
  const current = steps[Math.min(index, steps.length - 1)].id;

  const next = () => setIndex((value) => Math.min(value + 1, steps.length - 1));
  const back = () => setIndex((value) => Math.max(value - 1, 0));

  return (
    <section
      id="join-wizard"
      className="scroll-mt-24 rounded-2xl border border-primary-gold/20 bg-white-color p-5 shadow-sm sm:p-8"
    >
      <WizardProgress
        steps={steps}
        current={Math.min(index, steps.length - 1)}
      />
      <div className="mt-8">
        {current === "account" && <StepAccount onNext={next} />}
        {current === "about" && (
          <StepAbout
            dob={dob}
            onDob={setDob}
            minor={minor}
            onNext={next}
            onBack={back}
          />
        )}
        {current === "consent" && <StepConsent onNext={next} onBack={back} />}
        {current === "subscribe" && (
          <StepSubscribe onNext={next} onBack={back} />
        )}
        {current === "proof" && <StepProof onNext={next} onBack={back} />}
        {current === "uniform" && <StepUniform onNext={next} onBack={back} />}
        {current === "payment" && <StepPayment onNext={next} onBack={back} />}
        {current === "review" && (
          <StepReview minor={minor} onNext={next} onBack={back} />
        )}
        {current === "welcome" && <StepWelcome />}
      </div>
    </section>
  );
};

export default JoinWizard;
