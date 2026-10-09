"use client";

import { useState, type FormEvent } from "react";
import MainHeading from "@/components/pages/typography/MainHeading";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import { INVITE_FORM, INVITE_SECTIONS } from "@/constant/inviteMercyData";
import InviteFormField from "./InviteFormField";

const InviteForm = () => {
  const [submitted, setSubmitted] = useState(false);

  // TODO: send the invitation to the backend / email provider once it exists.
  // For now the form only validates in the browser and shows the confirmation.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="invite-form"
      className="scroll-mt-24 rounded-xl border border-primary-green/10 bg-white-color p-5 shadow-lg lg:p-7"
    >
      <MainHeading className="!text-[28px] !text-primary-green lg:!text-[34px] lg:!leading-tight">
        {INVITE_FORM.title}
      </MainHeading>
      <CardDescSm className="mt-1">{INVITE_FORM.intro}</CardDescSm>

      {submitted ? (
        <p
          role="status"
          className="mt-6 rounded-lg border border-primary-gold/40 bg-cream p-5 font-heading text-lg text-primary-green"
        >
          {INVITE_FORM.success}
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-5 grid gap-5">
          {INVITE_SECTIONS.map(({ title, fields }) => (
            <fieldset key={title} className="grid gap-4">
              <legend className="mb-4 w-full rounded-sm bg-primary-green/10 px-3 py-1.5 font-heading text-base font-semibold text-primary-green">
                {title}
              </legend>
              <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-6">
                {fields.map((field) => (
                  <InviteFormField key={field.id} {...field} />
                ))}
              </div>
              {fields.some((field) => field.type === "file") && (
                <CardDescSm className="!text-xs">
                  {INVITE_FORM.fileHint}
                </CardDescSm>
              )}
            </fieldset>
          ))}

          <button
            type="submit"
            className="rounded-md bg-primary-green px-5 py-3 text-sm font-semibold text-white-color transition-colors hover:bg-primary-green-deep"
          >
            {INVITE_FORM.submit}
          </button>
          <CardDescSm className="text-center !text-xs">
            {INVITE_FORM.note}
          </CardDescSm>
        </form>
      )}
    </section>
  );
};

export default InviteForm;
