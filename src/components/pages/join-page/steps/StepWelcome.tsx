import ButtonSm from "@/components/button/ButtonSm";
import { JOIN_WELCOME } from "@/constant/joinData";

const StepWelcome = ({ memberId }: { memberId: string | null }) => (
  <div className="grid gap-5 text-center">
    <h2 className="font-heading text-3xl font-semibold text-primary-green">
      {JOIN_WELCOME.title}
    </h2>
    <p className="text-base text-text-dark">
      Your account is now active. {JOIN_WELCOME.text}
    </p>
    {memberId && (
      <div className="mx-auto rounded-lg border border-primary-gold/50 bg-primary-gold/10 px-8 py-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-text-grey">
          Your Member ID
        </p>
        <p className="mt-1 font-heading text-2xl font-semibold text-card-heading">
          {memberId}
        </p>
      </div>
    )}
    <p className="text-sm text-text-dark">
      From now on you can log in with Google (Single Sign-On) to enter the
      member area.
    </p>
    <div className="flex justify-center">
      <ButtonSm
        url="/account"
        text="Enter the member area"
        bgColor="var(--primary-green)"
        textColor="var(--white-color)"
        shape="rounded"
      />
    </div>
  </div>
);

export default StepWelcome;
